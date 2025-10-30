"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, LogIn, UserPlus, Settings, Heart, Car, LogOut, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Profil() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // LocalStorage'dan kullanıcı bilgilerini kontrol et
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pb-20 md:pb-0 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Hoş Geldiniz
                </h1>
                <p className="text-gray-600 text-center">
                  Araç kiralama hizmetlerimizden faydalanmak için giriş yapın
                  veya hesap oluşturun.
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/login" className="block">
                  <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <LogIn className="w-5 h-5" />
                    Giriş Yap
                  </Button>
                </Link>

                <Link href="/register" className="block">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Kayıt Ol
                  </Button>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Üyelik Avantajları
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Hızlı ve kolay rezervasyon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Favori araçlarınızı kaydedin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Geçmiş rezervasyonlarınızı görüntüleyin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Özel kampanya ve indirimlerden yararlanın</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Profil Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.name || "Kullanıcı"}
                </h1>
                <div className="flex flex-col gap-1 mt-2">
                  {user?.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user?.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-600">Aktif Kiralama</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-600">Tamamlanan</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-600">Favoriler</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">Pro</p>
                  <p className="text-xs text-gray-600">Üyelik</p>
                </div>
              </div>
            </div>
          </div>

          {/* Menü Öğeleri */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <Link
              href="/favoriler"
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <Heart className="w-5 h-5 text-gray-600" />
              <span className="flex-1 font-medium text-gray-900">
                Favorilerim
              </span>
              <span className="text-gray-400">›</span>
            </Link>

            <Link
              href="/rezervasyonlarim"
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <Car className="w-5 h-5 text-gray-600" />
              <span className="flex-1 font-medium text-gray-900">
                Rezervasyonlarım
              </span>
              <span className="text-gray-400">›</span>
            </Link>

            <Link
              href="/ayarlar"
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="flex-1 font-medium text-gray-900">Ayarlar</span>
              <span className="text-gray-400">›</span>
            </Link>
          </div>

          {/* Çıkış Yap */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-red-600 border-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </Button>
        </div>
      </div>
    </div>
  );
}

