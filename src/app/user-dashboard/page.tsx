"use client";

import { useState, useEffect } from "react";
import {
  IoCarSport,
  IoCalendar,
  IoHeart,
  IoPerson,
  IoSettings,
  IoCard,
  IoTime,
  IoTrophy,
} from "react-icons/io5";
import Link from "next/link";

// Mock data - backend hazır olunca burası API'den gelecek
const mockUserInfo = {
  firstName: "Ahmet",
  lastName: "Yılmaz",
  email: "ahmet.yilmaz@email.com",
  phone: "+90 555 123 4567",
  memberSince: "Ocak 2024",
  totalRentals: 8,
  activeRentals: 1,
  upcomingRentals: 1,
  totalSpent: "12,450 TL",
  favoriteCount: 5,
};

export default function UserDashboardPage() {
  const [userInfo] = useState(mockUserInfo);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : userInfo.firstName + " " + userInfo.lastName;
  const displayEmail = user?.email || userInfo.email;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Kullanıcı Paneli
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Taraf - Kullanıcı Bilgileri */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {displayName.charAt(0)}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
                {displayName}
              </h2>

              <p className="text-center text-gray-600 mb-6">{displayEmail}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Toplam Kiralama</span>
                  <span className="font-bold text-gray-800">
                    {userInfo.totalRentals}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Favori Araç</span>
                  <span className="font-bold text-gray-800">
                    {userInfo.favoriteCount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Toplam Harcama</span>
                  <span className="font-bold text-blue-600">
                    {userInfo.totalSpent}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 text-center">
                  Üyelik Tarihi: {userInfo.memberSince}
                </p>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - İstatistikler ve Aksiyonlar */}
          <div className="lg:col-span-2">
            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Aktif Kiralama
                    </p>
                    <p className="text-3xl font-bold text-gray-800">
                      {userInfo.activeRentals}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <IoCarSport className="text-green-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Yaklaşan Kiralama
                    </p>
                    <p className="text-3xl font-bold text-gray-800">
                      {userInfo.upcomingRentals}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <IoCalendar className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Hızlı Erişim Butonları */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Hızlı İşlemler
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rezervasyonlarım */}
                <Link href="/user-dashboard/rezervasyonlarim">
                  <div className="group cursor-pointer bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoCalendar size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Rezervasyonlarım
                      </h3>
                      <p className="text-sm text-blue-100">
                        Tüm rezervasyonlarınızı görüntüleyin ve yönetin
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Favorilerim */}
                <Link href="/user-dashboard/favoriler">
                  <div className="group cursor-pointer bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoHeart size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Favorilerim</h3>
                      <p className="text-sm text-red-100">
                        Beğendiğiniz araçları görüntüleyin
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Ayarlar */}
                <Link href="/user-dashboard/ayarlar">
                  <div className="group cursor-pointer bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoSettings size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Ayarlar & Profil</h3>
                      <p className="text-sm text-gray-100">
                        Profil bilgilerinizi ve tercihlerinizi yönetin
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Araç Kirala */}
                <Link href="/arac-kirala">
                  <div className="group cursor-pointer bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoCarSport size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Araç Kirala</h3>
                      <p className="text-sm text-green-100">
                        Yeni bir araç kiralayın
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Son Aktiviteler */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Son Aktiviteler
              </h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700">
                    Yeni rezervasyon oluşturdunuz - BMW 3 Serisi
                  </p>
                  <span className="ml-auto text-xs text-gray-500">
                    2 saat önce
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700">
                    Favorilere araç eklediniz - Mercedes C-Class
                  </p>
                  <span className="ml-auto text-xs text-gray-500">
                    5 saat önce
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700">
                    Profil bilgilerinizi güncellediniz
                  </p>
                  <span className="ml-auto text-xs text-gray-500">
                    1 gün önce
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

