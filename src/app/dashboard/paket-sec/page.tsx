"use client";

import { useState } from "react";
import { IoArrowBack, IoCheckmarkCircle, IoCarSport, IoCard } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Paket bilgileri
const PACKAGE_PRICE = 50; // KDV Hariç
const PACKAGE_DURATION_DAYS = 30;
const FREE_TRIAL_CARS = 5; // İlk 5 araç ücretsiz (tanıtım paketi - bir kerelik)

export default function PaketSecPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [customAmount, setCustomAmount] = useState("");

  // Önceden tanımlı paketler
  const predefinedPackages = [
    { id: 1, cars: 5, popular: true, isFree: true }, // Tanıtım paketi - ücretsiz
    { id: 2, cars: 3, popular: false, isFree: false },
    { id: 3, cars: 10, popular: false, isFree: false },
    { id: 4, cars: 20, popular: false, isFree: false },
  ];

  const calculatePrice = (carCount: number) => {
    // Normal fiyat hesaplama (indirim yok)
    const subtotal = carCount * PACKAGE_PRICE;
    const vat = subtotal * 0.20; // %20 KDV
    const total = subtotal + vat;
    return { subtotal, vat, total };
  };

  const handlePackageSelect = (packageId: number, carCount: number) => {
    setSelectedPackage(packageId);
    setCustomAmount(carCount.toString());
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 100) {
      setCustomAmount(value);
      setSelectedPackage(0); // Custom seçildi
    }
  };

  const handleContinueToPayment = () => {
    const carCount = parseInt(customAmount) || 1;
    if (carCount < 1) {
      alert("Lütfen en az 1 araç hakkı seçin!");
      return;
    }
    
    const prices = calculatePrice(carCount);
    // Ödeme sayfasına yönlendir
    router.push(`/dashboard/odeme?cars=${carCount}&total=${prices.total}`);
  };

  const currentCarCount = parseInt(customAmount) || 1;
  const currentPrices = calculatePrice(currentCarCount);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard" className="mr-4">
            <button className="flex items-center text-slate-600 hover:text-slate-800 transition-colors bg-white p-3 rounded-lg shadow-sm hover:shadow-md">
              <IoArrowBack size={24} />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Araç Yükleme Paketi Seç</h1>
            <p className="text-slate-600 mt-1">Her araç 30 gün süreyle platformda kalacak</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Taraf - Paket Seçenekleri */}
          <div className="lg:col-span-2">
            {/* Bilgilendirme Kartı */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 mb-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Paket Sistemi Nasıl Çalışır?</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-amber-900 mb-1">
                    🎁 YENİ ÜYE KAMPANYASI!
                  </p>
                  <p className="text-amber-800 font-medium">İlk 5 Araç 1 Ay Ücretsiz (Bir Kerelik)</p>
                </div>
                <div className="space-y-2 text-slate-700">
                  <p className="flex items-start gap-2">
                    <span className="text-slate-600 font-bold">✅</span>
                    <span>Her araç için <strong>50 TL (KDV Hariç)</strong> ödeme yaparsınız</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-slate-600 font-bold">✅</span>
                    <span><strong>Yeni üyeler</strong> ilk paket olarak 5 araç ücretsiz alabilir</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-slate-600 font-bold">✅</span>
                    <span>Yüklediğiniz her araç <strong>30 gün</strong> boyunca platformda aktif kalır</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-slate-600 font-bold">✅</span>
                    <span>İstediğiniz kadar araç hakkı satın alabilirsiniz</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-slate-600 font-bold">✅</span>
                    <span>Süre bitiminde araçlarınız otomatik olarak pasif olur</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-slate-600 font-bold">✅</span>
                    <span>Yeni paket alarak araçlarınızı tekrar aktif edebilirsiniz</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Önceden Tanımlı Paketler */}
            <div className="bg-white rounded-xl border-2 border-slate-200 shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Popüler Paketler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {predefinedPackages.map((pkg) => {
                  const prices = calculatePrice(pkg.cars);
                  const isSelected = selectedPackage === pkg.id;
                  
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg.id, pkg.cars)}
                      className={`relative cursor-pointer rounded-xl p-6 border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-slate-700 bg-slate-50 shadow-lg scale-105"
                          : "border-slate-200 hover:border-slate-400 hover:shadow-md"
                      } ${pkg.isFree ? "ring-2 ring-amber-400 bg-amber-50" : pkg.popular ? "ring-2 ring-slate-400" : ""}`}
                    >
                      {pkg.isFree ? (
                        <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          🎁 ÜCRETSİZ
                        </div>
                      ) : pkg.popular ? (
                        <div className="absolute -top-3 right-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          ⭐ Popüler
                        </div>
                      ) : null}
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <IoCarSport className="text-slate-700" size={28} />
                          <span className="text-2xl font-bold text-slate-800">{pkg.cars}</span>
                          <span className="text-slate-600">Araç</span>
                        </div>
                        {isSelected && (
                          <IoCheckmarkCircle className="text-slate-700" size={28} />
                        )}
                      </div>
                      
                      <div className="space-y-1 mb-3">
                        {pkg.isFree ? (
                          <div className="bg-amber-100 border-2 border-amber-300 rounded-lg p-3 mb-2">
                            <p className="text-amber-900 font-bold text-sm text-center">
                              🎁 TANITIM PAKETİ<br/>
                              <span className="text-xs">1 AY ÜCRETSİZ!</span>
                            </p>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm text-slate-600">
                              {pkg.cars} x {PACKAGE_PRICE} TL = {pkg.cars * PACKAGE_PRICE} TL
                            </p>
                            <p className="text-sm text-slate-600">
                              KDV (%20): {(pkg.cars * PACKAGE_PRICE * 0.20).toFixed(2)} TL
                            </p>
                          </>
                        )}
                      </div>
                      
                      <div className="border-t border-slate-200 pt-3">
                        <p className="text-lg font-bold text-slate-800">
                          Toplam: {pkg.isFree ? "ÜCRETSİZ" : `${(pkg.cars * PACKAGE_PRICE * 1.20).toFixed(2)} TL`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Özel Miktar Seçimi */}
            <div className="bg-white rounded-xl border-2 border-slate-200 shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Özel Miktar</h3>
              <p className="text-slate-600 mb-4">İhtiyacınıza göre araç sayısı belirleyin (Max: 100)</p>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Araç Sayısı
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-lg font-semibold text-slate-800"
                    placeholder="Örn: 7"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCustomAmountChange((Math.max(1, currentCarCount - 1)).toString())}
                    className="w-12 h-12 bg-slate-200 hover:bg-slate-300 rounded-lg font-bold text-xl transition-colors text-slate-700"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleCustomAmountChange((Math.min(100, currentCarCount + 1)).toString())}
                    className="w-12 h-12 bg-slate-200 hover:bg-slate-300 rounded-lg font-bold text-xl transition-colors text-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Hızlı Seçim Butonları */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[1, 5, 10, 15, 20, 25, 50].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleCustomAmountChange(amount.toString())}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentCarCount === amount
                        ? "bg-slate-700 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Özet ve Ödeme */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border-2 border-slate-200 shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Sipariş Özeti</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <IoCarSport className="text-slate-700" size={24} />
                    <span className="font-semibold text-slate-800">Araç Sayısı</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800">{currentCarCount}</span>
                </div>

                <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  {currentCarCount === FREE_TRIAL_CARS ? (
                    <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-4 text-center">
                      <p className="text-amber-900 font-bold text-lg mb-1">
                        🎁 YENİ ÜYE KAMPANYASI
                      </p>
                      <p className="text-amber-800 text-sm">
                        İlk {FREE_TRIAL_CARS} aracınız 1 ay tamamen ücretsiz!
                      </p>
                      <p className="text-amber-700 text-xs mt-1">
                        (Sadece yeni üyeler için - Bir kerelik)
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Birim Fiyat (KDV Hariç)</span>
                        <span className="font-semibold text-slate-800">{PACKAGE_PRICE} TL</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Araç Sayısı</span>
                        <span className="font-semibold text-slate-800">{currentCarCount} Araç</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Ara Toplam</span>
                        <span className="font-semibold text-slate-800">{currentPrices.subtotal} TL</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">KDV (%20)</span>
                        <span className="font-semibold text-slate-800">{currentPrices.vat.toFixed(2)} TL</span>
                      </div>
                      <div className="border-t border-slate-300 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-800">Toplam</span>
                          <span className="text-2xl font-bold text-slate-800">
                            {currentPrices.total.toFixed(2)} TL
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-lg">
                  <p className="text-sm text-slate-700 font-medium">
                    <strong>✓ {PACKAGE_DURATION_DAYS} Gün</strong> boyunca {currentCarCount} aracınız aktif kalacak
                  </p>
                  {currentCarCount === FREE_TRIAL_CARS && (
                    <p className="text-xs text-amber-700 mt-2 font-semibold">
                      🎉 Yeni üye kampanyası - Tamamen ücretsiz! (Bir kerelik)
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleContinueToPayment}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                  currentCarCount === FREE_TRIAL_CARS
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                    : "bg-slate-700 hover:bg-slate-800 text-white"
                }`}
              >
                {currentCarCount === FREE_TRIAL_CARS ? (
                  <>
                    <IoCheckmarkCircle size={24} />
                    Ücretsiz Paketi Al (5 Araç)
                  </>
                ) : (
                  <>
                    <IoCard size={24} />
                    Ödemeye Geç
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                Güvenli ödeme ile devam edeceksiniz
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

