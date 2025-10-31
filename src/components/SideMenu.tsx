"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoBusinessOutline } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoCarSportOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const menuItems = [
    { icon: IoHomeOutline, label: "Ana Sayfa", href: "/" },
    { icon: IoCarSportOutline, label: "Araç Kirala", href: "/arac-kirala" },
    { icon: IoPersonOutline, label: "Profilim", href: "/profil" },
    { icon: IoCalendarOutline, label: "Rezervasyonlarım", href: "/rezervasyonlarim" },
    { icon: IoHeartOutline, label: "Favorilerim", href: "/favoriler" },
    { icon: IoSettingsOutline, label: "Ayarlar", href: "/ayarlar" },
    { icon: IoInformationCircleOutline, label: "Hakkımızda", href: "/about" },
    {
      icon: IoBusinessOutline,
      label: "Anlaşmalı Rent a Car Şirketleri",
      href: "/partners",
    },
    { icon: IoWarningOutline, label: "Acil Durum Desteği", href: "/support" },
    { icon: IoMailOutline, label: "Bize Ulaşın", href: "/contact" },
    {
      icon: IoDocumentTextOutline,
      label: "Yasal Düzenlemeler",
      href: "/legal",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Side Menu */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Menü</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IoClose className="text-2xl text-gray-700" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                        onClick={onClose}
                      >
                        <Icon className="text-2xl" />
                        <span className="font-medium">{item.label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Auth Buttons */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 pt-6 border-t border-gray-200 space-y-2"
              >
                <button className="flex items-center gap-4 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
                  <IoLogOutOutline className="text-2xl" />
                  <span className="font-medium">Çıkış Yap</span>
                </button>
                
                <a
                  href="/login"
                  className="flex items-center gap-4 p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full"
                  onClick={onClose}
                >
                  <IoLogInOutline className="text-2xl" />
                  <span className="font-medium">Giriş Yap</span>
                </a>
                
                <a
                  href="/register"
                  className="flex items-center gap-4 p-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors w-full"
                  onClick={onClose}
                >
                  <IoPersonAddOutline className="text-2xl" />
                  <span className="font-medium">Kayıt Ol</span>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;
