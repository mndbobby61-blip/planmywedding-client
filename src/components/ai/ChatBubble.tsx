import { ChatMessage } from "@/types/ai.types";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-3 py-2 text-sm font-body leading-relaxed rounded-xl ${
          isUser
            ? "bg-plum-600 text-ivory rounded-br-sm"
            : "bg-white border border-gold-200/60 text-charcoal rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
