"use client";

import { useState, useEffect } from "react";
import {
  IoCarSport,
  IoCalendar,
  IoList,
  IoPerson,
  IoMail,
  IoCall,
  IoLocation,
  IoShield,
  IoTrophy,
} from "react-icons/io5";
import Link from "next/link";
import PackageManager from "@/components/PackageManager";

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
  memberSince: "Ocak 2023",
};

// İhale sistemi için liderlik tablosu - en çok para ödeyen en üstte
const mockLeaderboard = [
  {
    id: 1,
    rank: 1,
    companyName: "Elit Rent A Car",
    district: "Beşiktaş",
    bidAmount: 500,
  },
  {
    id: 2,
    rank: 2,
    companyName: "Lüks Araç Kiralama",
    district: "Beşiktaş",
    bidAmount: 400,
  },
  {
    id: 3,
    rank: 3,
    companyName: "Premium Kiralama",
    district: "Beşiktaş",
    bidAmount: 300,
  },
  {
    id: 4,
    rank: 4,
    companyName: "Hızlı Rent A Car",
    district: "Beşiktaş",
    bidAmount: 200,
  },
  {
    id: 5,
    rank: 5,
    companyName: "Ekonomik Kiralama",
    district: "Beşiktaş",
    bidAmount: 100,
  },
];

export default function DashboardPage() {
  const [rentACarInfo] = useState(mockRentACarInfo);
  const [showRules, setShowRules] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 7 günlük geri sayım
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-300 via-yellow-400 to-yellow-500"; // Gold
      case 2:
      case 3:
        return "from-gray-200 via-gray-300 to-gray-400"; // Silver
      case 4:
        return "bg-[#d4a89a]"; // Açık Bronze
      case 5:
        return "bg-[#bf8970]"; // Koyu Bronze
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-300 to-yellow-500 text-gray-900 border-2 border-white"; // Gold
      case 2:
      case 3:
        return "bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900"; // Silver
      case 4:
        return "bg-[#d4a89a] text-white font-extrabold border-2 border-white"; // Açık Bronze
      case 5:
        return "bg-[#bf8970] text-white font-extrabold border-2 border-white"; // Koyu Bronze
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-600 text-white";
    }
  };

  const handlePurchaseRank = (rank: number, amount: number) => {
    const confirmMessage = `${rank}. sırayı ${amount} TL'ye satın almak istediğinize emin misiniz?\n\nSatın aldığınızda ${rank}. sırada yer alacaksınız ve ilçenizde daha fazla görünürlük kazanacaksınız!`;

    if (confirm(confirmMessage)) {
      alert(
        `🎉 Tebrikler!\n\n${rank}. sırayı başarıyla satın aldınız!\n\nArtık ${rank}. sıradasınız ve ilçenizde öne çıkıyorsunuz.\n\nÖdeme tutarı: ${amount} TL`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Rent-a-Car Yönetim Paneli
        </h1>

        {/* Paket Yönetimi */}
        <div className="mb-6">
          <PackageManager />
        </div>

        {/* İlçe Lideri Leaderboard - Modern ve Klasik Tasarım */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 overflow-hidden mb-6">
          {/* Header Bölümü */}
          <div className="bg-linear-to-r from-slate-50 to-slate-100 p-6 border-b-2 border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center shadow-md">
                  <IoTrophy className="text-white" size={26} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    İlçe Lideri
                  </h2>
                  <p className="text-slate-600 text-sm">
                    En yüksek teklif veren kazanır!
                  </p>
                </div>
              </div>

              {/* Geri Sayım - Modern */}
              <div className="bg-white border-2 border-slate-200 rounded-lg px-4 py-3 shadow-sm">
                <p className="text-slate-600 text-xs font-medium mb-1 text-center uppercase tracking-wide">
                  Süre Bitimine
                </p>
                <div className="flex gap-2 items-center text-slate-800 font-bold text-base">
                  <span>{timeRemaining.days}g</span>
                  <span className="text-slate-400">:</span>
                  <span>{String(timeRemaining.hours).padStart(2, "0")}s</span>
                  <span className="text-slate-400">:</span>
                  <span>{String(timeRemaining.minutes).padStart(2, "0")}d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kısa Uyarı + Nasıl Çalışır Butonu */}
          <div className="p-6">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 mb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-slate-800 text-sm font-semibold mb-1">
                    ⚡ Sadece ilk 5 firma görünür! En yüksek teklif veren lider
                    olur.
                  </p>
                  <p className="text-slate-600 text-xs">
                    Başkaları daha yüksek teklif verirse sıralama anında
                    değişir!
                  </p>
                </div>
                <button
                  onClick={() => setShowRules(!showRules)}
                  className="shrink-0 bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {showRules ? "✕ Kapat" : "📖 Nasıl Çalışır?"}
                </button>
              </div>
            </div>

            {/* Katlanabilir Detaylı Kurallar */}
            {showRules && (
              <div className="mb-4 bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-5 shadow-md animate-fadeIn">
                <h3 className="text-base font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span>🏆</span>
                  <span>İlçe Lideri Sistemi Kuralları</span>
                </h3>
                <div className="space-y-2 text-sm text-green-900">
                  <p>
                    <strong>1️⃣ İlk 5 Sıra:</strong> Her ilçede sadece ilk 5
                    firma müşterilere gösterilir.
                  </p>
                  <p>
                    <strong>2️⃣ Dinamik Sıralama:</strong> En yüksek teklif veren
                    her zaman üstte. Birisi daha fazla verirse sıralama değişir.
                  </p>
                  <p>
                    <strong>3️⃣ Çıkma Riski:</strong> 5&apos;ten fazla firma daha
                    yüksek teklif verirse, en düşük teklifli listeden çıkar!
                  </p>
                  <p>
                    <strong>4️⃣ 7 Günlük Dönem:</strong> Her hafta yeni dönem
                    başlar, teklifler sıfırlanır.
                  </p>
                </div>
                <div className="mt-3 bg-green-100 border-2 border-green-300 rounded-lg p-3">
                  <p className="text-green-900 font-bold text-sm">
                    ⚡ Kartınız her an ilk 5&apos;ten çıkabilir! Teklifinizi
                    güncel tutun.
                  </p>
                </div>
              </div>
            )}

            {/* Leaderboard Kartları - Modern Klasik */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {mockLeaderboard.map((company) => (
                <div
                  key={company.id}
                  className={`bg-white rounded-lg border-2 overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                    company.rank === 1
                      ? "border-amber-400 shadow-lg"
                      : "border-slate-200 shadow-md"
                  }`}
                >
                  {/* Sıra Rozeti */}
                  <div
                    className={`bg-linear-to-br ${getRankColor(
                      company.rank
                    )} p-4 relative`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-10 h-10 ${getRankBadgeColor(
                          company.rank
                        )} rounded-full flex items-center justify-center text-lg font-bold`}
                      >
                        {company.rank}
                      </div>
                      {company.rank === 1 && (
                        <IoTrophy
                          className="text-white drop-shadow-md"
                          size={22}
                        />
                      )}
                    </div>
                    <div className="text-white text-xl font-bold drop-shadow-sm">
                      {company.bidAmount} TL
                    </div>
                    <div className="text-white/90 text-xs font-medium">
                      Teklif
                    </div>
                  </div>

                  {/* Şirket Bilgileri */}
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-slate-800 text-sm mb-2 line-clamp-2 h-10">
                      {company.companyName}
                    </h3>

                    {/* Satın Al Butonu */}
                    <button
                      onClick={() =>
                        handlePurchaseRank(company.rank, company.bidAmount)
                      }
                      className={`w-full py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 ${
                        company.rank === 1
                          ? "bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg"
                          : company.rank === 2
                          ? "bg-linear-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-white shadow-sm hover:shadow-md"
                          : company.rank === 3
                          ? "bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm hover:shadow-md"
                          : "bg-slate-700 hover:bg-slate-800 text-white shadow-sm hover:shadow-md"
                      }`}
                    >
                      💳 Satın Al
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                <span className="ml-1 text-gray-700 font-semibold">
                  {rentACarInfo.rating}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <IoPerson
                    className="text-gray-500 mt-1 mr-3 shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Yetkili Kişi</p>
                    <p className="text-gray-800 font-medium">
                      {rentACarInfo.ownerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <IoMail
                    className="text-gray-500 mt-1 mr-3 shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500">E-posta</p>
                    <p className="text-gray-800 font-medium break-all">
                      {rentACarInfo.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <IoCall
                    className="text-gray-500 mt-1 mr-3 shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <p className="text-gray-800 font-medium">
                      {rentACarInfo.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <IoLocation
                    className="text-gray-500 mt-1 mr-3 shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Adres</p>
                    <p className="text-gray-800 font-medium">
                      {rentACarInfo.address}
                    </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Toplam Araç</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {rentACarInfo.totalCars}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <IoCarSport className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Aktif Rezervasyon
                    </p>
                    <p className="text-3xl font-bold text-gray-800">
                      {rentACarInfo.activeReservations}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <IoCalendar className="text-green-600" size={24} />
                  </div>
                </div>
              </div>


            </div>

            {/* Ana Aksiyon Butonları */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Hızlı İşlemler
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Araç Ekleme Butonu */}
                <Link href="/rentacar-dashboard/arac-ekle">
                  <div className="group cursor-pointer bg-linear-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoCarSport size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Araç Ekle</h3>
                      <p className="text-sm text-slate-100">
                        Yeni araç ekleyin ve kiralama havuzunuzu genişletin
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Rezervasyonlar Butonu */}
                <Link href="/rentacar-dashboard/rezervasyonlar">
                  <div className="group cursor-pointer bg-linear-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoCalendar size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Rezervasyonlar</h3>
                      <p className="text-sm text-slate-100">
                        Müşteri rezervasyonlarını görüntüleyin ve yönetin
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Araç Listesi Butonu */}
                <Link href="/rentacar-dashboard/arac-listesi">
                  <div className="group cursor-pointer bg-linear-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoList size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Araç Listesi</h3>
                      <p className="text-sm text-slate-100">
                        Tüm araçlarınızı görüntüleyin ve düzenleyin
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Sigorta Yap Butonu */}
                <Link href="/rentacar-dashboard/sigorta">
                  <div className="group cursor-pointer bg-linear-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-xl p-8 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
                        <IoShield size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Sigorta Yap</h3>
                      <p className="text-sm text-slate-100">
                        Araçlarınızın sigorta bilgilerini yönetin ve düzenleyin
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
                    Yeni rezervasyon alındı - BMW 3 Serisi
                  </p>
                  <span className="ml-auto text-xs text-gray-500">
                    2 saat önce
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700">
                    Araç teslim edildi - Mercedes C-Class
                  </p>
                  <span className="ml-auto text-xs text-gray-500">
                    5 saat önce
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
