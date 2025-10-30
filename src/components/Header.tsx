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
            <div className="relative group">
              {/* Kare Container - Modern Tasarım */}
              <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {/* Gradient Border Efekti */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>

                {/* Logo Metni */}
                <h1 className="relative text-3xl font-extrabold tracking-tight flex items-center">
                  {/* Kiralama - Koyu Gri/Lacivert */}
                  <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent drop-shadow-sm">
                    Kiralama
                  </span>

                  {/* Yeri - Turuncu (Kurumsal Vurgu) */}
                  <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent drop-shadow-sm">
                    Yeri
                  </span>
                </h1>

                {/* Alt Çizgi Animasyonu */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-slate-600 to-orange-600 group-hover:w-[calc(100%-2rem)] transition-all duration-300 rounded-full"></div>
              </div>

              {/* Hover Glow Efekti */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-orange-400 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            </div>
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
