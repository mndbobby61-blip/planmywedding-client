export default function TypingIndicator() {
  return (
    <div className="flex gap-1 w-fit bg-white border border-gold-200/60 rounded-xl rounded-bl-sm px-3 py-2.5">
      <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}
