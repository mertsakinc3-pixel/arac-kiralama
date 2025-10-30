"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { IoMenu, IoFilter } from "react-icons/io5";
import SideMenu from "./SideMenu";
import { useFilter } from "@/contexts/FilterContext";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsFilterOpen } = useFilter();
  const pathname = usePathname();

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  // Filter ikonu sadece arac-kirala sayfasında görünsün
  const showFilterIcon = pathname === "/arac-kirala";

  return (
    <>
      <header className="flex justify-between items-center p-4 w-full h-20 border-b border-gray-200 shadow-sm">
        {/* Left Hambuger side menu  */}

        <div>
          <button onClick={() => setIsMenuOpen(true)}>
            <IoMenu className="text-2xl" />
          </button>
        </div>

        {/* Middle company logo */}

        <div>
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold">KiralamaYeri</h1>
          </Link>
        </div>

        {/* Right filter menu - sadece arac-kirala sayfasında görünür */}

        <div>
          {showFilterIcon && (
            <button onClick={handleFilterClick}>
              <IoFilter className="text-2xl" />
            </button>
          )}
        </div>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
