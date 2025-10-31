"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  IoCall, 
  IoMail, 
  IoLocation, 
  IoStar,
  IoCheckmarkCircle,
  IoCalendar,
  IoCar,
  IoSpeedometer,
  IoSettings,
  IoPeople,
  IoShield,
  IoCard
} from "react-icons/io5";
import { mockCars, Car } from "@/data/mockCars";

export default function AracDetayPage() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ID'ye göre aracı bul
    const foundCar = mockCars.find(c => c.id === params.id);
    if (foundCar) {
      setCar(foundCar);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Araç Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Aradığınız araç mevcut değil.</p>
          <Link href="/arac-kirala">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Araç Listesine Dön
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Ana İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sol Taraf - Araç Görseli */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-[400px] lg:h-[600px]">
              <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {car.availability ? (
                <div className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-lg flex items-center gap-2">
                  <IoCheckmarkCircle size={20} />
                  Müsait
                </div>
              ) : (
                <div className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-full shadow-lg">
                  Kirada
                </div>
              )}
            </div>
          </div>

          {/* Sağ Taraf - Araç Bilgileri */}
          <div className="space-y-6">
            {/* Başlık ve Fiyat */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {car.brand} {car.model}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <IoLocation size={20} />
                    <span>{car.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg">
                  <IoStar className="text-yellow-500" size={24} />
                  <span className="font-bold text-gray-800 text-xl">{car.rating}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-600">{car.price} TL</span>
                  <span className="text-gray-500">/ gün</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Depozito: {car.deposit} TL
                </p>
              </div>
            </div>

            {/* Temel Özellikler */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Araç Özellikleri</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IoCalendar className="text-blue-600" size={24} />
                  <div>
                    <p className="text-xs text-gray-500">Yıl</p>
                    <p className="font-semibold text-gray-800">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IoCar className="text-blue-600" size={24} />
                  <div>
                    <p className="text-xs text-gray-500">Yakıt</p>
                    <p className="font-semibold text-gray-800">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IoSettings className="text-blue-600" size={24} />
                  <div>
                    <p className="text-xs text-gray-500">Vites</p>
                    <p className="font-semibold text-gray-800">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IoPeople className="text-blue-600" size={24} />
                  <div>
                    <p className="text-xs text-gray-500">Koltuk</p>
                    <p className="font-semibold text-gray-800">{car.seats} Kişi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IoSpeedometer className="text-blue-600" size={24} />
                  <div>
                    <p className="text-xs text-gray-500">Uzaklık</p>
                    <p className="font-semibold text-gray-800">{car.away} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IoShield className="text-blue-600" size={24} />
                  <div>
                    <p className="text-xs text-gray-500">Teslim</p>
                    <p className="font-semibold text-gray-800">{car.deliveryType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Açıklama</h2>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Özellikler */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Araçta Bulunan Özellikler</h2>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    <IoCheckmarkCircle size={16} />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Kiralama Koşulları */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Kiralama Koşulları</h2>
              <div className="space-y-2">
                {car.rentalConditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <IoCheckmarkCircle className="text-green-500 shrink-0" size={20} />
                    <span>{condition}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alt Kısım - Rent-a-Car Bilgileri */}
          <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sol Taraf - Şirket Bilgileri */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <IoCar size={28} />
                {car.rentalCompany}
              </h2>
              <p className="text-blue-100 mb-6">
                Güvenilir ve kaliteli araç kiralama hizmeti. Müşteri memnuniyeti odaklı çalışıyoruz.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <IoLocation size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Adres</p>
                    <p className="font-semibold">{car.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <IoCall size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Telefon</p>
                    <p className="font-semibold">+90 555 123 45 67</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <IoMail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">E-posta</p>
                    <p className="font-semibold">info@{car.rentalCompany.toLowerCase().replace(/\s+/g, '')}.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - İletişim ve Rezervasyon */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-2">Hemen Kirala!</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Bu aracı kiralamak için bizimle iletişime geçin veya rezervasyon yapın.
                </p>
                <div className="space-y-3">
                  <Link href="/arac-kirala">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                      <IoCard size={20} />
                      Rezervasyon Yap
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Güvenlik Bilgisi */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <IoShield className="text-yellow-600 shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Güvenli Kiralama</h3>
              <p className="text-sm text-yellow-700">
                Tüm araçlarımız düzenli bakımdan geçer ve tam kapsamlı sigortalıdır. 
                Güvenliğiniz bizim önceliğimizdir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

