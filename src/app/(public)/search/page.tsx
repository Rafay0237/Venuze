import { Suspense } from "react";
import { SearchPage } from "@/features/venues/components/search-page";
import { Skeleton } from "@/components/ui/skeleton";

function SearchFallback() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-4 px-4 py-6 sm:px-6 lg:px-8">
      <Skeleton className="h-16 w-full max-w-3xl" />
      <Skeleton className="h-10 w-80" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="aspect-[4/3] w-full" />
        <Skeleton className="aspect-[4/3] w-full" />
      </div>
    </div>
  );
}

export default function SearchRoute() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchPage />
    </Suspense>
  );
}
