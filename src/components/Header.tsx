"use client";

import { useState, useImperativeHandle, forwardRef } from "react";
import { IoMenu, IoFilter } from "react-icons/io5";
import SideMenu from "./SideMenu";

export interface HeaderRef {
  openFilter: () => void;
}

interface HeaderProps {
  onFilterClick?: () => void;
}

const Header = forwardRef<HeaderRef, HeaderProps>(({ onFilterClick }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openFilter: () => {
      onFilterClick?.();
    }
  }));

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
          <h1 className="text-2xl font-bold">KiralamaYeri</h1>
        </div>

        {/* Right filter menu */}

        <div>
          <button onClick={onFilterClick}>
            <IoFilter className="text-2xl" />
          </button>
        </div>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
});

Header.displayName = "Header";

export default Header;
