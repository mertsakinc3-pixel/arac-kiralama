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
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="relative">
        <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <svg 
            className="w-16 h-16 text-blue-600" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {!location && !isLoading && (
        <div className="text-center">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md">
            <p className="text-blue-800 text-sm">
              <strong>Not:</strong> Konumunuzu almak için tarayıcınızın konum iznini vermeniz gerekiyor. 
              Bu sayede size en yakın araçları gösterebiliriz.
            </p>
          </div>
          <button
            onClick={getCurrentLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
          >
            Konumumu Al
          </button>
        </div>
      )}

      {locationError && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md">
          <p className="font-semibold">Hata:</p>
          <p>{locationError}</p>
          
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
          
          <div className="flex gap-2 mt-3">
            <button
              onClick={getCurrentLocation}
              className="text-red-600 hover:text-red-800 underline"
            >
              Tekrar Dene
            </button>
            <button
              onClick={() => {
                setLocationError(null);
                setShowPermissionHelp(false);
              }}
              className="text-red-600 hover:text-red-800 underline"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {location && (
        <div className="mt-6 p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg max-w-md">
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
            className="mt-3 text-green-600 hover:text-green-800 underline"
          >
            Konumu Güncelle
          </button>
        </div>
      )}
    </div>
  );
}
