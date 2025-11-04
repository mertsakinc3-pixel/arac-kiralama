"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IoClose,
  IoCalendar,
  IoArrowForward,
  IoArrowBack,
  IoPerson,
  IoCall,
  IoShield,
  IoInformationCircle,
} from "react-icons/io5";
import { Car } from "@/data/mockCars";

interface RentalModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

export default function RentalModal({ car, isOpen, onClose }: RentalModalProps) {
  const router = useRouter();
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
  const today = new Date().toISOString().split("T")[0];

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
  const totalPrice = totalDays * car.price;

  // Modal açıldığında body scroll'u kapat
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    // State'leri sıfırla
    setModalStep(1);
    setStartDate("");
    setEndDate("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setTcNo("");
    setBirthDate("");
    onClose();
  };

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
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      };

      // LocalStorage'a kaydet
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: `${firstName} ${lastName}`,
          email: userData.email,
          phone,
          tcNo,
          birthDate,
        })
      );

      // Rezervasyon bilgilerini kaydet
      const reservation = {
        carId: car.id,
        carName: `${car.brand} ${car.model}`,
        carImage: car.image,
        startDate,
        endDate,
        totalDays,
        totalPrice,
        deposit: car.deposit,
        userData,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      // Mevcut rezervasyonları al
      const existingReservations = JSON.parse(
        localStorage.getItem("reservations") || "[]"
      );
      existingReservations.push(reservation);
      localStorage.setItem("reservations", JSON.stringify(existingReservations));

      // Başarı mesajı ve yönlendirme
      alert("Rezervasyonunuz başarıyla oluşturuldu! Hesabınız da oluşturuldu.");
      handleClose();
      router.push("/user-dashboard/rezervasyonlarim");
    }
  };

  const handlePrevStep = () => {
    if (modalStep > 1) {
      setModalStep(modalStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full my-8 relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="sticky top-4 left-full ml-4 -mr-12 z-20 bg-white rounded-full p-2 shadow-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <IoClose size={24} />
          </button>

        {/* Progress Bar */}
        <div className="bg-gray-100 h-2 rounded-t-2xl overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${(modalStep / 2) * 100}%` }}
          ></div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className={`flex items-center gap-2 ${
                modalStep >= 1 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  modalStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="font-semibold text-sm hidden sm:inline">Tarih Seçimi</span>
            </div>
            <div className="w-10 h-0.5 bg-gray-300"></div>
            <div
              className={`flex items-center gap-2 ${
                modalStep >= 2 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  modalStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="font-semibold text-sm hidden sm:inline">
                Kişisel Bilgiler
              </span>
            </div>
          </div>

          {/* Araç Bilgisi Özet */}
          <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-xl p-3 mb-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-base">
                  {car.brand} {car.model}
                </h3>
                <p className="text-xs text-gray-600">
                  {car.year} - {car.fuelType}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-blue-600 font-bold text-lg">
                    {car.price} TL
                  </span>
                  <span className="text-gray-500 text-xs">/ gün</span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 1: Tarih Seçimi */}
          {modalStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Kiralama Tarihleri
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Aracı ne zaman almak ve teslim etmek istiyorsunuz?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Başlangıç Tarihi *
                  </label>
                  <div className="relative">
                    <IoCalendar
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={today}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bitiş Tarihi *
                  </label>
                  <div className="relative">
                    <IoCalendar
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || today}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Fiyat Özeti */}
              {totalDays > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="text-gray-700">Kiralama Süresi:</span>
                    <span className="font-bold text-gray-800">{totalDays} Gün</span>
                  </div>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="text-gray-700">Günlük Fiyat:</span>
                    <span className="font-bold text-gray-800">{car.price} TL</span>
                  </div>
                  <div className="border-t border-green-300 pt-1.5 mt-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 font-semibold text-sm">
                        Toplam Tutar:
                      </span>
                      <span className="font-bold text-green-600 text-xl">
                        {totalPrice} TL
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5">
                    * Depozito: {car.deposit} TL (İade edilecek)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Kişisel Bilgiler */}
          {modalStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Kişisel Bilgileriniz
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Rezervasyonunuzu tamamlamak için bilgilerinizi girin
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ad *
                  </label>
                  <div className="relative">
                    <IoPerson
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Adınız"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Soyad *
                  </label>
                  <div className="relative">
                    <IoPerson
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Soyadınız"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon Numarası *
                  </label>
                  <div className="relative">
                    <IoCall
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0555 123 45 67"
                      maxLength={11}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                    TC Kimlik No *
                    <div className="relative group">
                      <IoInformationCircle className="text-blue-500 cursor-help" size={16} />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                        TC kimlik numarası findeks tarafından kontrol edilir.
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={tcNo}
                    onChange={(e) => setTcNo(e.target.value.replace(/\D/g, ""))}
                    placeholder="12345678901"
                    maxLength={11}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                  Doğum Tarihi *
                  <div className="relative group">
                    <IoInformationCircle className="text-blue-500 cursor-help" size={16} />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                      Yaş bilgisi kimlik numarası kontrolü için gereklidir.
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </label>
                <div className="relative">
                  <IoCalendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 18)
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  * 18 yaşından büyük olmalısınız
                </p>
              </div>

              {/* Özet Bilgi */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                  Rezervasyon Özeti
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Başlangıç:</span>
                    <span className="font-semibold">
                      {new Date(startDate).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bitiş:</span>
                    <span className="font-semibold">
                      {new Date(endDate).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Süre:</span>
                    <span className="font-semibold">{totalDays} Gün</span>
                  </div>
                  <div className="border-t border-blue-300 pt-1.5 mt-1.5 flex justify-between">
                    <span className="text-gray-800 font-semibold">Toplam:</span>
                    <span className="font-bold text-blue-600 text-base">
                      {totalPrice} TL
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5">
                <p className="text-xs text-yellow-800 flex items-start gap-1">
                  <IoShield className="shrink-0 mt-0.5" size={14} />
                  <span>Bilgileriniz güvende. Rezervasyonunuz onaylandıktan sonra bir hesap oluşturulacaktır.</span>
                </p>
              </div>
            </div>
          )}

          {/* Modal Footer - Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            {modalStep > 1 && (
              <button
                onClick={handlePrevStep}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm"
              >
                <IoArrowBack size={18} />
                Geri
              </button>
            )}
            <button
              onClick={handleNextStep}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
            >
              {modalStep === 2 ? "Rezervasyonu Tamamla" : "İleri"}
              {modalStep === 1 && <IoArrowForward size={18} />}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

