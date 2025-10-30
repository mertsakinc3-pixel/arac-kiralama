"use client";

import { useState, Suspense } from "react";
import { IoArrowBack, IoCard, IoCheckmarkCircle, IoShield, IoLockClosed } from "react-icons/io5";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL parametrelerinden değerleri al
  const cars = searchParams.get("cars");
  const total = searchParams.get("total");
  const initialCarCount = cars ? parseInt(cars) : 1;
  const initialTotalAmount = total ? parseFloat(total) : 0;
  
  const [carCount] = useState(initialCarCount);
  const [totalAmount] = useState(initialTotalAmount);
  const [isProcessing, setIsProcessing] = useState(false);
  // Eğer tam 5 araç ve ücretsiz ise direkt başarılı göster (yeni üye kampanyası)
  const [paymentSuccess, setPaymentSuccess] = useState(initialCarCount === 5 && initialTotalAmount === 0);

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    taxNumber: "",
    companyName: "",
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "cardNumber") {
      // Sadece rakam ve boşluk
      const cleaned = value.replace(/\D/g, "");
      const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
      if (cleaned.length <= 16) {
        setCardInfo(prev => ({ ...prev, cardNumber: formatted }));
      }
    } else if (name === "cvv") {
      // Sadece rakam, max 3-4 karakter
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 4) {
        setCardInfo(prev => ({ ...prev, cvv: cleaned }));
      }
    } else {
      setCardInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasyon
    if (cardInfo.cardNumber.replace(/\s/g, "").length !== 16) {
      alert("Lütfen geçerli bir kart numarası girin!");
      return;
    }
    
    if (!cardInfo.cardName || !cardInfo.expiryMonth || !cardInfo.expiryYear || !cardInfo.cvv) {
      alert("Lütfen tüm kart bilgilerini doldurun!");
      return;
    }

    if (!billingInfo.fullName || !billingInfo.email || !billingInfo.phone) {
      alert("Lütfen fatura bilgilerini doldurun!");
      return;
    }

    setIsProcessing(true);

    // Simüle edilmiş ödeme işlemi
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // 3 saniye sonra dashboard'a yönlendir
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }, 2000);
  };

  // Başarılı ödeme ekranı
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <IoCheckmarkCircle className="text-white" size={48} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {totalAmount === 0 ? "Yeni Üye Kampanyası Aktif! 🎁" : "Ödeme Başarılı! 🎉"}
          </h2>
          <p className="text-gray-600 mb-6">
            {totalAmount === 0 
              ? `Tebrikler! Yeni üye kampanyası ile ${carCount} araç için 1 ay boyunca ücretsiz kullanım hakkınız aktif edildi.`
              : `${carCount} araç hakkınız başarıyla aktif edildi. Artık araç ekleyebilirsiniz!`
            }
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>✓ {carCount} Araç Hakkı</strong> - 30 gün süreyle aktif
            </p>
            {totalAmount === 0 ? (
              <div className="mt-2">
                <p className="text-sm text-green-800 font-bold">
                  🎁 Yeni Üye Kampanyası - ÜCRETSİZ!
                </p>
                <p className="text-xs text-green-700 mt-1">
                  (Sadece yeni üyeler için - Bir kerelik)
                </p>
              </div>
            ) : (
              <p className="text-sm text-green-800 mt-2">
                Ödenen Tutar: <strong>{totalAmount.toFixed(2)} TL</strong>
              </p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Dashboard&apos;a yönlendiriliyorsunuz...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard/paket-sec" className="mr-4">
            <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <IoArrowBack size={24} />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Güvenli Ödeme</h1>
            <p className="text-gray-600 mt-1">256-bit SSL şifreleme ile korunan ödeme</p>
          </div>
        </div>

        <form onSubmit={handleSubmitPayment}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol Taraf - Ödeme Formu */}
            <div className="lg:col-span-2 space-y-6">
              {/* Güvenlik Bildirimi */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-4 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <IoShield size={32} />
                  <div>
                    <h3 className="font-bold text-lg">Güvenli Ödeme</h3>
                    <p className="text-sm text-white/90">Kart bilgileriniz 256-bit SSL ile şifrelenir ve saklanmaz</p>
                  </div>
                </div>
              </div>

              {/* Kart Bilgileri */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-6">
                  <IoCard className="text-blue-500" size={24} />
                  <h3 className="text-xl font-bold text-gray-800">Kart Bilgileri</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kart Numarası *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardInfo.cardNumber}
                      onChange={handleCardInputChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kart Üzerindeki İsim *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={cardInfo.cardName}
                      onChange={handleCardInputChange}
                      required
                      placeholder="AHMET YILMAZ"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ay *
                      </label>
                      <select
                        name="expiryMonth"
                        value={cardInfo.expiryMonth}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, expiryMonth: e.target.value }))}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Ay</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yıl *
                      </label>
                      <select
                        name="expiryYear"
                        value={cardInfo.expiryYear}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, expiryYear: e.target.value }))}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Yıl</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year.toString().slice(-2)}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardInputChange}
                        required
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fatura Bilgileri */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Fatura Bilgileri</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={billingInfo.fullName}
                        onChange={handleBillingInputChange}
                        required
                        placeholder="Ahmet Yılmaz"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={billingInfo.email}
                        onChange={handleBillingInputChange}
                        required
                        placeholder="ornek@email.com"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={billingInfo.phone}
                        onChange={handleBillingInputChange}
                        required
                        placeholder="+90 555 123 4567"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şehir *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleBillingInputChange}
                        required
                        placeholder="İstanbul"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adres *
                    </label>
                    <textarea
                      name="address"
                      value={billingInfo.address}
                      onChange={handleBillingInputChange}
                      required
                      rows={3}
                      placeholder="Tam adresinizi girin"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şirket Adı (Opsiyonel)
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={billingInfo.companyName}
                        onChange={handleBillingInputChange}
                        placeholder="Şirket adı"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vergi No / TC No (Opsiyonel)
                      </label>
                      <input
                        type="text"
                        name="taxNumber"
                        value={billingInfo.taxNumber}
                        onChange={handleBillingInputChange}
                        placeholder="1234567890"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Sipariş Özeti */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Sipariş Özeti</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Araç Sayısı</span>
                    <span className="text-xl font-bold text-blue-600">{carCount}</span>
                  </div>

                  <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                    {totalAmount === 0 ? (
                      <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center">
                        <p className="text-green-800 font-bold text-lg mb-1">
                          🎁 YENİ ÜYE KAMPANYASI
                        </p>
                        <p className="text-green-700 text-sm">
                          İlk {carCount} aracınız 1 ay tamamen ücretsiz!
                        </p>
                        <p className="text-green-600 text-xs mt-1">
                          (Sadece yeni üyeler için - Bir kerelik)
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Birim Fiyat</span>
                          <span className="font-semibold">50 TL</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Araç Sayısı</span>
                          <span className="font-semibold">{carCount} Araç</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Ara Toplam (KDV Hariç)</span>
                          <span className="font-semibold">{(carCount * 50)} TL</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">KDV (%20)</span>
                          <span className="font-semibold">{(carCount * 50 * 0.20).toFixed(2)} TL</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-800">Toplam</span>
                            <span className="text-2xl font-bold text-blue-600">
                              {totalAmount.toFixed(2)} TL
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>✓ 30 Gün</strong> boyunca {carCount} aracınız aktif kalacak
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      <IoLockClosed size={24} />
                      Ödemeyi Tamamla
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <IoShield size={16} />
                  <span>256-bit SSL ile güvence altında</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OdemePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}

