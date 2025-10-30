"use client";

import { useState } from "react";

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationComponentProps {
  onLocationChange?: (location: LocationData | null) => void;
}

export default function LocationComponent({ onLocationChange }: LocationComponentProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPermissionHelp, setShowPermissionHelp] = useState(false);

  const getIPLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.latitude && data.longitude) {
        const locationData = {
          latitude: data.latitude,
          longitude: data.longitude,
          address: `${data.city}, ${data.country_name}`
        };
        
        setLocation(locationData);
        onLocationChange?.(locationData);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.log('IP konum tespiti başarısız:', error);
    }
    return false;
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Tarayıcınız konum özelliğini desteklemiyor.");
      return;
    }

    setIsLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding ile adres bilgisini al
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=tr`
          );
          const data = await response.json();
          
          const locationData = {
            latitude,
            longitude,
            address: data.locality ? `${data.locality}, ${data.city}` : `${data.city}, ${data.countryName}`
          };
          
          setLocation(locationData);
          onLocationChange?.(locationData);
        } catch {
          const locationData = {
            latitude,
            longitude
          };
          setLocation(locationData);
          onLocationChange?.(locationData);
        }
        
        setIsLoading(false);
      },
      async (error) => {
        let errorMessage = "Konum alınamadı.";
        let tryIPLocation = false;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Konum erişimi reddedildi. Lütfen tarayıcı ayarlarından konum iznini verin.";
            setShowPermissionHelp(true);
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Konum bilgisi alınamıyor. GPS sinyali zayıf olabilir veya konum servisleri kapalı olabilir.";
            setShowPermissionHelp(true);
            tryIPLocation = true;
            break;
          case error.TIMEOUT:
            errorMessage = "Konum alma işlemi zaman aşımına uğradı. GPS sinyali zayıf olabilir.";
            setShowPermissionHelp(true);
            tryIPLocation = true;
            break;
        }
        
        // GPS başarısız olursa IP tabanlı konum tespitini dene
        if (tryIPLocation) {
          const ipSuccess = await getIPLocation();
          if (ipSuccess) {
            setLocationError(null);
            return;
          }
        }
        
        setLocationError(errorMessage);
        setIsLoading(false);
        onLocationChange?.(null);
      },
      {
        enableHighAccuracy: false, // Daha hızlı sonuç için false yapıyoruz
        timeout: 15000, // Timeout süresini artırıyoruz
        maximumAge: 60000 // Cache süresini azaltıyoruz
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {!location && !isLoading && (
        <div className="text-center w-full flex flex-col items-center justify-center">
          {/* Ana Konum Butonu - Dikkat Çekici Tasarım */}
          <div className="relative flex items-center justify-center w-full py-8">
            {/* Arka Plan Animasyonlu Halkalar - Tam Ortada */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-60 h-60 bg-gradient-to-r from-slate-400 to-orange-400 rounded-full opacity-10 animate-pulse"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-48 h-48 bg-gradient-to-r from-slate-500 to-orange-500 rounded-full opacity-15 animate-ping" style={{ animationDuration: '2s' }}></div>
            </div>
            
            {/* Ana Buton Container - Tam Ortalanmış */}
            <div className="flex flex-col items-center justify-center z-10">
              {/* Ana Buton */}
              <button
                onClick={getCurrentLocation}
                className="relative transform transition-all duration-300 hover:scale-110 active:scale-95 group"
              >
              <div className="relative flex flex-col items-center">
                {/* Gradient Arka Plan */}
                <div className="w-40 h-40 bg-gradient-to-br from-slate-600 via-slate-700 to-orange-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  {/* İç Beyaz Halka */}
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    {/* İkon Container */}
                    <div className="relative">
                      {/* Animasyonlu Konum İkonu */}
                      <svg 
                        className="w-16 h-16 text-transparent bg-clip-text animate-bounce" 
                        style={{ animationDuration: '2s' }}
                        fill="url(#gradient)" 
                        viewBox="0 0 20 20"
                      >
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#475569', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#64748b', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      
                      {/* Pulse Efekti */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-slate-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
                {/* Buton Metni */}
                <div className="mt-5">
                  <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-orange-600 text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Konumumu Bul
                      <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Bilgilendirme Kartları */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border-2 border-slate-200 transform hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-slate-800 text-center mb-1 text-sm">En Yakın Araçlar</h3>
              <p className="text-xs text-slate-600 text-center">Size en yakın kiralık araçları gösterin</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200 transform hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-gray-800 text-center mb-1 text-sm">Hızlı Teslimat</h3>
              <p className="text-xs text-gray-600 text-center">En hızlı teslimat sürelerini görün</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200 transform hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-orange-800 text-center mb-1 text-sm">Özel Fırsatlar</h3>
              <p className="text-xs text-orange-600 text-center">Bölgenize özel kampanyalar</p>
            </div>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="w-full flex flex-col items-center justify-center py-16 min-h-[450px]">
          <div className="relative inline-block">
            {/* Animasyonlu Yükleme Göstergesi */}
            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 border-8 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xl font-semibold text-gray-700 animate-pulse">Konumunuz Bulunuyor...</p>
          <p className="mt-3 text-sm text-gray-500">Lütfen bekleyin, size en yakın araçları hazırlıyoruz</p>
        </div>
      )}

      {locationError && (
        <div className="w-full flex justify-center px-4 py-8">
          <div className="p-6 bg-red-100 border-2 border-red-400 text-red-700 rounded-xl max-w-md w-full shadow-lg">
            <p className="font-semibold text-lg mb-2">Hata:</p>
            <p className="mb-4">{locationError}</p>
          
          {showPermissionHelp && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
              <p className="font-semibold text-yellow-800 mb-2">Çözüm Önerileri:</p>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• <strong>GPS Sinyali:</strong> Açık alana çıkın veya pencereye yaklaşın</li>
                <li>• <strong>Konum Servisleri:</strong> Cihazınızda konum servislerinin açık olduğundan emin olun</li>
                <li>• <strong>Wi-Fi:</strong> Wi-Fi bağlantısı konum tespitini iyileştirebilir</li>
                <li>• <strong>Tarayıcı:</strong> Tarayıcınızın konum iznini kontrol edin</li>
                <li>• <strong>Yeniden Deneme:</strong> Birkaç saniye bekleyip tekrar deneyin</li>
                <li>• <strong>Alternatif:</strong> GPS çalışmazsa IP tabanlı konum tespiti otomatik denenir</li>
              </ul>
            </div>
          )}
          
            <div className="flex gap-3 mt-4 justify-center">
              <button
                onClick={getCurrentLocation}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Tekrar Dene
              </button>
              <button
                onClick={() => {
                  setLocationError(null);
                  setShowPermissionHelp(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {location && (
        <div className="w-full flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl">
            <div className="p-6 bg-green-100 border-2 border-green-400 text-green-700 rounded-xl mb-6 shadow-lg">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Konum Başarıyla Alındı!</span>
            </div>
            {location.address && (
              <p className="mb-2">
                <span className="font-medium">Adres:</span> {location.address}
              </p>
            )}
            <p className="text-sm">
              <span className="font-medium">Koordinatlar:</span> {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </p>
            <button
              onClick={getCurrentLocation}
              className="mt-3 text-green-600 hover:text-green-800 underline font-medium"
            >
              Konumu Güncelle
            </button>
            </div>
          
            {/* Harita Gösterimi */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
              <h3 className="text-lg font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Konumunuz
              </h3>
            </div>
            <div className="relative w-full h-96">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.01},${location.latitude - 0.01},${location.longitude + 0.01},${location.latitude + 0.01}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <a
                href={`https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=15/${location.latitude}/${location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Haritada Büyüt
              </a>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
