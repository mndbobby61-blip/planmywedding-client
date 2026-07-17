export default function SuggestedPrompts({
  prompts,
  onSelect,
}: {
  prompts: string[];
  onSelect: (prompt: string) => void;
}) {
  if (prompts.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="text-xs font-body text-plum-600 bg-plum-50 rounded-full px-3 py-1.5 hover:bg-plum-100 transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
