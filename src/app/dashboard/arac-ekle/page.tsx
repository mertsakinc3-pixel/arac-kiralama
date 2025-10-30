"use client";

import { useState } from "react";
import { IoArrowBack, IoCloudUpload, IoQrCode } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// QR Scanner'ı dynamic import ile yükle (SSR'den kaçınmak için)
const QRCodeScanner = dynamic(() => import("@/components/QRCodeScanner"), {
  ssr: false,
});

export default function AracEklePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    fuelType: "Benzin",
    transmission: "Manuel",
    seats: "5",
    location: "",
    description: "",
    features: [] as string[],
    deliveryType: "Şubede",
    deposit: "",
    rentalConditions: {
      minAge: "",
      minLicense: "",
      maxKm: "",
    },
    registrationInfo: {
      plateNumber: "",
      registrationNumber: "",
      chassisNumber: "",
      engineNumber: "",
      registrationDate: "",
      ownerName: "",
      ownerTC: "",
    }
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      rentalConditions: {
        ...prev.rentalConditions,
        [name]: value
      }
    }));
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      registrationInfo: {
        ...prev.registrationInfo,
        [name]: value
      }
    }));
  };

  const handleQRCodeScan = (data: string) => {
    try {
      // QR koddan gelen veriyi parse et
      // Gerçek ruhsat QR kodu formatına göre parse edilmeli
      // Şimdilik JSON formatında olduğunu varsayıyoruz
      const parsedData = JSON.parse(data);
      
      setFormData(prev => ({
        ...prev,
        registrationInfo: {
          plateNumber: parsedData.plateNumber || parsedData.plaka || "",
          registrationNumber: parsedData.registrationNumber || parsedData.ruhsatNo || "",
          chassisNumber: parsedData.chassisNumber || parsedData.sasiNo || "",
          engineNumber: parsedData.engineNumber || parsedData.motorNo || "",
          registrationDate: parsedData.registrationDate || parsedData.tescilTarihi || "",
          ownerName: parsedData.ownerName || parsedData.sahipAdi || "",
          ownerTC: parsedData.ownerTC || parsedData.tcNo || "",
        }
      }));
      
      setShowQRScanner(false);
      alert("Ruhsat bilgileri başarıyla okundu!");
    } catch (error) {
      // JSON değilse, düz metin olarak işle
      console.error("QR kod parse hatası:", error);
      alert("QR kod formatı tanınamadı. Lütfen bilgileri manuel olarak girin.");
      setShowQRScanner(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend hazır olunca burası API'ye gönderilecek
    console.log("Araç Bilgileri:", formData);
    console.log("Görsel:", selectedImage);
    
    // Başarılı mesajı göster ve dashboard'a yönlendir
    alert("Araç başarıyla eklendi!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/dashboard" className="mr-4">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <IoArrowBack size={24} />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Yeni Araç Ekle</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Araç Görseli */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Araç Görseli
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              {selectedImage ? (
                <div className="relative">
                  <img src={selectedImage} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Görseli Kaldır
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <IoCloudUpload className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-600 mb-2">Görsel yüklemek için tıklayın</p>
                  <p className="text-sm text-gray-400">PNG, JPG veya JPEG (Max. 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Temel Bilgiler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marka *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: BMW"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: 3 Serisi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yıl *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                min="2000"
                max="2025"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2023"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Günlük Fiyat (TL) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="450"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yakıt Tipi *
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Benzin">Benzin</option>
                <option value="Dizel">Dizel</option>
                <option value="Elektrik">Elektrik</option>
                <option value="Hibrit">Hibrit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vites Tipi *
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Manuel">Manuel</option>
                <option value="Otomatik">Otomatik</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Koltuk Sayısı *
              </label>
              <select
                name="seats"
                value={formData.seats}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teslim Şekli *
              </label>
              <select
                name="deliveryType"
                value={formData.deliveryType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Şubede">Şubede</option>
                <option value="Kapıda">Kapıda</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Depozito (TL) *
              </label>
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konum *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="İstanbul, Beşiktaş"
              />
            </div>
          </div>

          {/* Ruhsat Bilgileri */}
          <div className="mb-6 border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">📋 Ruhsat Bilgileri</h3>
              <button
                type="button"
                onClick={() => setShowQRScanner(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <IoQrCode size={20} />
                QR Kod ile Doldur
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plaka Numarası *
                </label>
                <input
                  type="text"
                  name="plateNumber"
                  value={formData.registrationInfo.plateNumber}
                  onChange={handleRegistrationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="34 ABC 123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ruhsat Seri No *
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationInfo.registrationNumber}
                  onChange={handleRegistrationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="A12345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şasi Numarası *
                </label>
                <input
                  type="text"
                  name="chassisNumber"
                  value={formData.registrationInfo.chassisNumber}
                  onChange={handleRegistrationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="WBA1234567890ABCD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motor Numarası *
                </label>
                <input
                  type="text"
                  name="engineNumber"
                  value={formData.registrationInfo.engineNumber}
                  onChange={handleRegistrationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="M123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İlk Tescil Tarihi *
                </label>
                <input
                  type="date"
                  name="registrationDate"
                  value={formData.registrationInfo.registrationDate}
                  onChange={handleRegistrationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ruhsat Sahibi Ad Soyad *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.registrationInfo.ownerName}
                  onChange={handleRegistrationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ahmet Yılmaz"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ruhsat Sahibi TC Kimlik No *
                </label>
                <input
                  type="text"
                  name="ownerTC"
                  value={formData.registrationInfo.ownerTC}
                  onChange={handleRegistrationChange}
                  required
                  maxLength={11}
                  pattern="[0-9]{11}"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12345678901"
                />
              </div>
            </div>
          </div>

          {/* Kiralama Koşulları */}
          <div className="mb-6 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Kiralama Koşulları</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Yaş *
                </label>
                <input
                  type="number"
                  name="minAge"
                  value={formData.rentalConditions.minAge}
                  onChange={handleConditionChange}
                  required
                  min="18"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="21"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Ehliyet (Yıl) *
                </label>
                <input
                  type="number"
                  name="minLicense"
                  value={formData.rentalConditions.minLicense}
                  onChange={handleConditionChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksimum KM *
                </label>
                <input
                  type="number"
                  name="maxKm"
                  value={formData.rentalConditions.maxKm}
                  onChange={handleConditionChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3500"
                />
              </div>
            </div>
          </div>

          {/* Özellikler */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Araç Özellikleri
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: Klima, Bluetooth, GPS"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Ekle
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Açıklama */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Araç hakkında detaylı bilgi..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Aracı Ekle
            </button>
            <Link href="/dashboard" className="flex-1">
              <button
                type="button"
                className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                İptal
              </button>
            </Link>
          </div>
        </form>

        {/* QR Code Scanner Modal */}
        {showQRScanner && (
          <QRCodeScanner
            onScan={handleQRCodeScan}
            onClose={() => setShowQRScanner(false)}
          />
        )}
      </div>
    </div>
  );
}

