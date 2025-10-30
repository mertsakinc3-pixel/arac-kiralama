"use client";

import CardSwipeContainer from "@/components/CardCard/CardSwipeContainer";
import { useFilter } from "@/contexts/FilterContext";

export default function AracKirala() {
  const { isFilterOpen, setIsFilterOpen } = useFilter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start h-full overflow-x-hidden pb-20 md:pb-0 px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <CardSwipeContainer 
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      </div>
    </div>
  );
}
