export default function VendorCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gold-200/40 overflow-hidden animate-pulse">
      <div className="h-24 bg-[#F1EFE8]" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-2/3 bg-[#F1EFE8] rounded" />
        <div className="h-2.5 w-1/2 bg-[#F1EFE8] rounded" />
        <div className="h-2.5 w-1/3 bg-[#F1EFE8] rounded" />
      </div>
    </div>
  );
}
