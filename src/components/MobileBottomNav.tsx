"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Car, Heart, User } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Ana Sayfa",
      href: "/",
      icon: Home,
    },
    {
      name: "Araç Kirala",
      href: "/arac-kirala",
      icon: Car,
    },
    {
      name: "Favoriler",
      href: "/user-dashboard/favoriler",
      icon: Heart,
    },
    {
      name: "Ayarlar",
      href: "/user-dashboard/ayarlar",
      icon: User,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

