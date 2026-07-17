import ChatWindow from "@/components/ai/ChatWindow";

export default function AiChatPage() {
  return (
    <section className="container-page py-10">
      <h1 className="font-display text-2xl text-plum-700 mb-6 text-center">Ask the AI assistant</h1>
      <ChatWindow />
    </section>
  );
}
