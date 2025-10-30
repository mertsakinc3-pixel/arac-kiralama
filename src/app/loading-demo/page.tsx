"use client";

import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";

export default function LoadingDemoPage() {
  const [showLoading, setShowLoading] = useState(false);

  const handleShowLoading = () => {
    setShowLoading(true);
    // 5 saniye sonra loading ekranını kapat
    setTimeout(() => {
      setShowLoading(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-gray-100">
      {showLoading && <LoadingScreen />}
      
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Loading Ekranı Demo
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Araç kiralama temalı modern loading ekranınızı test edin
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Özellikler
          </h2>
          
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span>8 araç ikonu etrafında döner</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span>Gradient arka plan animasyonu</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span>Merkezdeki animasyonlu sohbet balonu</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span>Kalp ve hediye ikonları ile özel dokunuşlar</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span>Mobil uyumlu responsive tasarım</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span>Smooth animasyonlar ve geçişler</span>
            </li>
          </ul>

          <div className="pt-6">
            <Button
              onClick={handleShowLoading}
              className="w-full md:w-auto px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Loading Ekranını Göster (5 saniye)
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">
            💡 Kullanım Önerisi
          </h3>
          <p className="text-blue-700 text-left">
            Bu loading ekranını uygulamanızın herhangi bir yerinde kullanabilirsiniz:
          </p>
          <ul className="text-left text-blue-700 mt-3 space-y-2 ml-4">
            <li>• Sayfa yüklenirken</li>
            <li>• Veri çekilirken</li>
            <li>• Form gönderilirken</li>
            <li>• Araç aranırken</li>
            <li>• Rezervasyon işlemi sırasında</li>
          </ul>
        </div>

        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            📝 Kod Örneği
          </h3>
          <pre className="text-left bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`import LoadingScreen from "@/components/LoadingScreen";

// State tanımlama
const [isLoading, setIsLoading] = useState(false);

// Kullanım
{isLoading && <LoadingScreen />}

// Loading'i aktif etme
setIsLoading(true);

// Loading'i kapatma
setIsLoading(false);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

