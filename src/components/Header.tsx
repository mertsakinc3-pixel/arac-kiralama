"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoMenu, IoChevronDown, IoPersonCircle } from "react-icons/io5";
import { IoCalendarOutline, IoHeartOutline, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import SideMenu from "./SideMenu";
import Link from "next/link";

// Geçici user type - Backend bağlanınca güncellenecek
interface TempUser {
  name?: string;
  email?: string;
  // Backend'den gelecek diğer alanlar buraya eklenecek
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<TempUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // LocalStorage'dan kullanıcı bilgilerini kontrol et
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(savedUser));
    }
  }, [pathname]); // pathname değiştiğinde yeniden kontrol et

  // Dropdown dışına tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsUserMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="relative flex items-center p-4 w-full h-20 border-b border-gray-200 shadow-sm">
        {/* Left Hambuger side menu  */}
        <div className="flex items-center z-10">
          <button onClick={() => setIsMenuOpen(true)}>
            <IoMenu className="text-2xl" />
          </button>
        </div>

        {/* Middle company logo - Absolute centered */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
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

        {/* Right side - User menu */}
        <div className="flex items-center gap-3 ml-auto z-10">
          {/* User dropdown menu */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <IoPersonCircle className="text-white text-2xl" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {user?.name || "Kullanıcı"}
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">Hesabım</p>
                </div>
                <IoChevronDown
                  className={`text-gray-600 transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name || "Kullanıcı"}
                    </p>
                    {user?.email && (
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/rezervasyonlarim"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <IoCalendarOutline className="text-gray-600 text-lg" />
                      <span className="text-sm text-gray-700">Rezervasyonlarım</span>
                    </Link>

                    <Link
                      href="/favoriler"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <IoHeartOutline className="text-gray-600 text-lg" />
                      <span className="text-sm text-gray-700">Favorilerim</span>
                    </Link>

                    <Link
                      href="/ayarlar"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <IoSettingsOutline className="text-gray-600 text-lg" />
                      <span className="text-sm text-gray-700">Ayarlar</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <IoLogOutOutline className="text-red-600 text-lg" />
                      <span className="text-sm text-red-600 font-medium">Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Login/Register buttons when not logged in
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Kayıt Ol
              </Link>
            </div>
          )}
        </div>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
