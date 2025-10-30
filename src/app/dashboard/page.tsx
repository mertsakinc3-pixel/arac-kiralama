"use client";

import { useState } from "react";
import { IoCarSport, IoCalendar, IoList, IoPerson, IoMail, IoCall, IoLocation, IoShield } from "react-icons/io5";
import Link from "next/link";

// Mock data - backend hazır olunca burası API'den gelecek
const mockRentACarInfo = {
  companyName: "Premium Kiralama",
  ownerName: "Ahmet Yılmaz",
  email: "info@premiumkiralama.com",
  phone: "+90 555 123 4567",
  address: "İstanbul, Beşiktaş",
  totalCars: 12,
  activeReservations: 5,
  totalRevenue: "45,000 TL",
  rating: 4.8,
  memberSince: "Ocak 2023"
};

export default function DashboardPage() {
  const [rentACarInfo] = useState(mockRentACarInfo);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Rent-a-Car Yönetim Paneli
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Taraf - Rent-a-Car Bilgileri */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {rentACarInfo.companyName.charAt(0)}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
                {rentACarInfo.companyName}
              </h2>
              
              <div className="flex items-center justify-center mb-6">
                <span className="text-yellow-500 text-xl">★</span>
                <span className="ml-1 text-gray-700 font-semibold">{rentACarInfo.rating}</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <IoPerson className="text-gray-500 mt-1 mr-3 shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Yetkili Kişi</p>
                    <p className="text-gray-800 font-medium">{rentACarInfo.ownerName}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <IoMail className="text-gray-500 mt-1 mr-3 shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">E-posta</p>
                    <p className="text-gray-800 font-medium break-all">{rentACarInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <IoCall className="text-gray-500 mt-1 mr-3 shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <p className="text-gray-800 font-medium">{rentACarInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <IoLocation className="text-gray-500 mt-1 mr-3 shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Adres</p>
                    <p className="text-gray-800 font-medium">{rentACarInfo.address}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 text-center">
                  Üyelik Tarihi: {rentACarInfo.memberSince}
                </p>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - İstatistikler ve Aksiyonlar */}
          <div className="lg:col-span-2">
            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Toplam Araç</p>
                    <p className="text-3xl font-bold text-gray-800">{rentACarInfo.totalCars}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <IoCarSport className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Aktif Rezervasyon</p>
                    <p className="text-3xl font-bold text-gray-800">{rentACarInfo.activeReservations}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <IoCalendar className="text-green-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Toplam Gelir</p>
                    <p className="text-2xl font-bold text-gray-800">{rentACarInfo.totalRevenue}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-2xl font-bold">₺</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ana Aksiyon Butonları */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Hızlı İşlemler</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Araç Ekleme Butonu */}
                <Link href="/dashboard/arac-ekle">
                  <div className="group cursor-pointer bg-linear-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoCarSport size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Araç Ekle</h3>
                      <p className="text-sm text-blue-100">Yeni araç ekleyin ve kiralama havuzunuzu genişletin</p>
                    </div>
                  </div>
                </Link>

                {/* Rezervasyonlar Butonu */}
                <Link href="/dashboard/rezervasyonlar">
                  <div className="group cursor-pointer bg-linear-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoCalendar size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Rezervasyonlar</h3>
                      <p className="text-sm text-green-100">Müşteri rezervasyonlarını görüntüleyin ve yönetin</p>
                    </div>
                  </div>
                </Link>

                {/* Araç Listesi Butonu */}
                <Link href="/dashboard/arac-listesi">
                  <div className="group cursor-pointer bg-linear-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoList size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Araç Listesi</h3>
                      <p className="text-sm text-purple-100">Tüm araçlarınızı görüntüleyin ve düzenleyin</p>
                    </div>
                  </div>
                </Link>

                {/* Sigorta Yap Butonu */}
                <Link href="/dashboard/sigorta">
                  <div className="group cursor-pointer bg-linear-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoShield size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Sigorta Yap</h3>
                      <p className="text-sm text-orange-100">Araçlarınızın sigorta bilgilerini yönetin ve düzenleyin</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Son Aktiviteler */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Son Aktiviteler</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700">Yeni rezervasyon alındı - BMW 3 Serisi</p>
                  <span className="ml-auto text-xs text-gray-500">2 saat önce</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700">Araç teslim edildi - Mercedes C-Class</p>
                  <span className="ml-auto text-xs text-gray-500">5 saat önce</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700">Araç iade edildi - Audi A4</p>
                  <span className="ml-auto text-xs text-gray-500">1 gün önce</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

