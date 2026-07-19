"use client";

import { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import ChatBubble from "@/components/ai/ChatBubble";
import TypingIndicator from "@/components/ai/TypingIndicator";
import SuggestedPrompts from "@/components/ai/SuggestedPrompts";
import { ChatMessage } from "@/types/ai.types";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hi, I am your planning assistant. Tell me your budget and guest count to get started.",
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const token = localStorage.getItem("pmw_token") || "";
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
      const res = await fetch(`${API_BASE}/ai/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // Optionally pass sessionId if you want to maintain context on backend
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      
      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      setIsThinking(false);
      const assistantMessageId = crypto.randomUUID();
      
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
        },
      ]);

      if (reader) {
        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunkText = decoder.decode(value, { stream: true });
            const lines = chunkText.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ") && line !== "data: [DONE]") {
                try {
                  const data = JSON.parse(line.replace("data: ", ""));
                  if (data.chunk) {
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessageId
                          ? { ...msg, content: msg.content + data.chunk }
                          : msg
                      )
                    );
                  }
                  if (data.error) {
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessageId
                          ? { ...msg, content: msg.content + "\n\n**Error:** " + data.error }
                          : msg
                      )
                    );
                  }
                } catch (e) {
                  console.error("Error parsing stream chunk:", e);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, I am having trouble connecting to the server.",
        },
      ]);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-ivory rounded-2xl border border-gold-200/40 overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3.5 bg-plum-700">
        <div className="w-7 h-7 rounded-full bg-gold-600 flex items-center justify-center">
          <Sparkles size={14} className="text-plum-700" />
        </div>
        <div>
          <p className="font-body text-sm font-medium text-ivory">Wedding planning assistant</p>
          <p className="font-body text-xs text-plum-200">Online</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-4 py-4 min-h-[280px]">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {isThinking && <TypingIndicator />}
      </div>

      <div className="px-4 pb-3">
        <SuggestedPrompts
          prompts={["Show venues near me", "Adjust budget split"]}
          onSelect={(prompt) => sendMessage(prompt)}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 px-3 py-2.5 bg-white border-t border-gold-200/40"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about vendors, budget, timeline..."
          className="flex-1 text-sm font-body focus:outline-none bg-transparent"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="w-8 h-8 rounded-lg bg-plum-600 flex items-center justify-center"
        >
          <ArrowUp size={15} className="text-ivory" />
        </button>
      </form>
    </div>
  );
}
