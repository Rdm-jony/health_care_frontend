import { Skeleton } from "./ui/skeleton";

const BookingCardSkeleton = () => (
  <div className="w-full shadow-md rounded-2xl border overflow-hidden p-5 animate-pulse">
    <div className="p-4 flex justify-between items-center">
      <div className="w-1/2 flex gap-20">
        {/* Doctor image placeholder */}
        <Skeleton className="w-20 h-[150px] rounded-lg" />

        {/* Text placeholders */}
        <div className="space-y-3 flex-1">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-4 w-48 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>

      {/* Buttons placeholder */}
      <div className="flex flex-col gap-5">
        <Skeleton className="h-10 w-20 rounded" />
        <Skeleton className="h-10 w-20 rounded" />
      </div>
    </div>
  </div>
);

export default BookingCardSkeleton
