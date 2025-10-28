"use client";

import { useState, useRef } from "react";
import CardSwipeContainer from "@/components/CardCard/CardSwipeContainer";
import Header, { HeaderRef } from "@/components/Header";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const headerRef = useRef<HeaderRef>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start h-full overflow-x-hidden">
      <Header 
        ref={headerRef}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      <CardSwipeContainer 
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
    </div>
  );
}
