import { Skeleton } from "@/components/ui/skeleton";

const FilterSkeleton = () => {
  return (
    <aside className="w-full lg:w-1/4 md:block hidden min-h-screen p-4 border-r bg-gray-50 space-y-4">
      {/* Reset Button */}
      <div className="flex justify-end">
        <Skeleton className="h-6 w-12 rounded" />
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Specialization buttons */}
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>
    </aside>
  );
};

export default FilterSkeleton;
