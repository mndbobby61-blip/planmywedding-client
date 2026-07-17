export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-8 h-8 rounded-md text-sm font-body ${
            p === page ? "bg-plum-600 text-ivory" : "bg-white border border-gold-200/60 text-charcoal"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
