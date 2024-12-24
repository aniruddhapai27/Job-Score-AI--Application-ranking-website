import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <Skeleton className="h-[400px] w-[400px] rounded-xl" />
      <div className="space-y-2"></div>
    </div>
  );
}
