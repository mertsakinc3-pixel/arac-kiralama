"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  IoCard,
  IoClose,
  IoArrowForward,
  IoArrowBack,
  IoPerson,
} from "react-icons/io5";
import { mockCars } from "@/data/mockCars";

export default function AracDetayPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const car = mockCars.find(c => c.id === id);

  // Modal state
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);

  // Step 1: Tarih bilgileri
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Step 2: Kişisel bilgiler
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // Bugünün tarihini al (minimum tarih için)
  const today = new Date().toISOString().split('T')[0];

  // Toplam gün ve fiyat hesaplama
  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 0;
  };

  const totalDays = calculateDays();
  const totalPrice = car ? totalDays * car.price : 0;

  // Modal açıldığında body scroll'u kapat
  useEffect(() => {
    if (showRentalModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRentalModal]);

  const handleNextStep = () => {
    if (modalStep === 1) {
      // Tarih validasyonu
      if (!startDate || !endDate) {
        alert("Lütfen başlangıç ve bitiş tarihlerini seçin!");
        return;
      }
      if (new Date(endDate) <= new Date(startDate)) {
        alert("Bitiş tarihi başlangıç tarihinden sonra olmalıdır!");
        return;
      }
      setModalStep(2);
    } else if (modalStep === 2) {
      // Kişisel bilgi validasyonu
      if (!firstName || !lastName || !phone || !tcNo || !birthDate) {
        alert("Lütfen tüm alanları doldurun!");
        return;
      }
      if (tcNo.length !== 11) {
        alert("TC Kimlik No 11 haneli olmalıdır!");
        return;
      }
      if (phone.length < 10) {
        alert("Lütfen geçerli bir telefon numarası girin!");
        return;
      }

      // Kullanıcıyı kaydet
      const userData = {
        firstName,
        lastName,
        phone,
        tcNo,
        birthDate,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`, // Otomatik email
      };

      // LocalStorage'a kaydet
      localStorage.setItem("user", JSON.stringify({
        name: `${firstName} ${lastName}`,
        email: userData.email,
        phone,
        tcNo,
        birthDate,
      }));

      // Rezervasyon bilgilerini kaydet
      const reservation = {
        carId: car?.id,
        carName: `${car?.brand} ${car?.model}`,
        startDate,
        endDate,
        totalDays,
        totalPrice,
        deposit: car?.deposit,
        userData,
        createdAt: new Date().toISOString(),
      };

      // Mevcut rezervasyonları al
      const existingReservations = JSON.parse(localStorage.getItem("reservations") || "[]");
      existingReservations.push(reservation);
      localStorage.setItem("reservations", JSON.stringify(existingReservations));

      // Başarı mesajı ve yönlendirme
      alert("Rezervasyonunuz başarıyla oluşturuldu! Hesabınız da oluşturuldu.");
      setShowRentalModal(false);
      router.push("/user-dashboard/rezervasyonlarim");
    }
  };

  const handlePrevStep = () => {
    if (modalStep > 1) {
      setModalStep(modalStep - 1);
    }
  };

  const closeModal = () => {
    setShowRentalModal(false);
    setModalStep(1);
  };

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
                  <button 
                    onClick={() => setShowRentalModal(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                  >
                    <IoCard size={20} />
                    Hemen Kirala
                  </button>
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

      {/* Kiralama Modal - 2 Adımlı */}
      {showRentalModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <IoClose size={28} />
            </button>

            {/* Progress Bar */}
            <div className="bg-gray-100 h-2 rounded-t-2xl overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${(modalStep / 2) * 100}%` }}
              ></div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${modalStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${modalStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="font-semibold hidden sm:inline">Tarih Seçimi</span>
                </div>
                <div className="w-12 h-0.5 bg-gray-300"></div>
                <div className={`flex items-center gap-2 ${modalStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${modalStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="font-semibold hidden sm:inline">Kişisel Bilgiler</span>
                </div>
              </div>

              {/* Araç Bilgisi Özet */}
              <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-6 border border-blue-200">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-sm text-gray-600">{car.year} - {car.fuelType}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-blue-600 font-bold text-xl">{car.price} TL</span>
                      <span className="text-gray-500 text-sm">/ gün</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 1: Tarih Seçimi */}
              {modalStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Kiralama Tarihleri
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Aracı ne zaman almak ve teslim etmek istiyorsunuz?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Başlangıç Tarihi *
                      </label>
                      <div className="relative">
                        <IoCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={today}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Bitiş Tarihi *
                      </label>
                      <div className="relative">
                        <IoCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate || today}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fiyat Özeti */}
                  {totalDays > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Kiralama Süresi:</span>
                        <span className="font-bold text-gray-800">{totalDays} Gün</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Günlük Fiyat:</span>
                        <span className="font-bold text-gray-800">{car.price} TL</span>
                      </div>
                      <div className="border-t border-green-300 pt-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-800 font-semibold">Toplam Tutar:</span>
                          <span className="font-bold text-green-600 text-2xl">{totalPrice} TL</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        * Depozito: {car.deposit} TL (İade edilecek)
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Kişisel Bilgiler */}
              {modalStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Kişisel Bilgileriniz
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Rezervasyonunuzu tamamlamak için bilgilerinizi girin
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ad *
                      </label>
                      <div className="relative">
                        <IoPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Adınız"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Soyad *
                      </label>
                      <div className="relative">
                        <IoPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Soyadınız"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefon Numarası *
                    </label>
                    <div className="relative">
                      <IoCall className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0555 123 45 67"
                        maxLength={11}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      TC Kimlik No *
                    </label>
                    <input
                      type="text"
                      value={tcNo}
                      onChange={(e) => setTcNo(e.target.value.replace(/\D/g, ''))}
                      placeholder="12345678901"
                      maxLength={11}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Doğum Tarihi *
                    </label>
                    <div className="relative">
                      <IoCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      * Araç kiralamak için 18 yaşından büyük olmalısınız
                    </p>
                  </div>

                  {/* Özet Bilgi */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Rezervasyon Özeti</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Başlangıç:</span>
                        <span className="font-semibold">{new Date(startDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bitiş:</span>
                        <span className="font-semibold">{new Date(endDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Süre:</span>
                        <span className="font-semibold">{totalDays} Gün</span>
                      </div>
                      <div className="border-t border-blue-300 pt-2 mt-2 flex justify-between">
                        <span className="text-gray-800 font-semibold">Toplam:</span>
                        <span className="font-bold text-blue-600 text-lg">{totalPrice} TL</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-800">
                      <IoShield className="inline mr-1" size={16} />
                      Bilgileriniz güvende. Rezervasyonunuz onaylandıktan sonra bir hesap oluşturulacaktır.
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Footer - Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                {modalStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  >
                    <IoArrowBack size={20} />
                    Geri
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {modalStep === 2 ? 'Rezervasyonu Tamamla' : 'İleri'}
                  {modalStep === 1 && <IoArrowForward size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

