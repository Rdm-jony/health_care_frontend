import { Skeleton } from "@/components/ui/skeleton";

const DoctorCardSkeleton = () => {
  return (
    <div className="w-[250px] h-[300px] rounded-xl border p-4 flex flex-col items-center space-y-4">
      <Skeleton className="w-24 h-24 rounded-full" />
      <Skeleton className="w-32 h-4" />
      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-32 h-8 rounded-md" />
    </div>
  );
};

export default DoctorCardSkeleton;
