"use client";

import CardSwipeContainer from "@/components/CardCard/CardSwipeContainer";
import { useFilter } from "@/contexts/FilterContext";

export default function AracKirala() {
  const { isFilterOpen, setIsFilterOpen } = useFilter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start h-full overflow-x-hidden">
      <CardSwipeContainer 
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
    </div>
  );
}
