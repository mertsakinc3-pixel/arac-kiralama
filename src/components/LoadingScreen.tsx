"use client";

import React from "react";
import { Car, Gauge, Shield, Clock } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Minimal Arka Plan Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100"></div>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(51, 65, 85) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Ana İçerik */}
      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Logo/Marka Alanı */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
            <Car className="w-8 h-8 md:w-9 md:h-9 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center">
              {/* Kiralama - Koyu Gri */}
              <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent">
                Kiralama
              </span>
              {/* Yeri - Turuncu */}
              <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                Yeri
              </span>
            </h1>
            <p className="text-sm text-slate-500 font-medium">Premium Konum Bazlı Araç Kiralama</p>
          </div>
        </div>

        {/* Ana Animasyon Alanı */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          {/* Dış Çember - Rotating Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-slate-700 border-r-slate-700 animate-spin-slow"></div>
          
          {/* Orta Çember */}
          <div className="absolute inset-8 rounded-full border-2 border-slate-100"></div>
          <div className="absolute inset-8 rounded-full border-2 border-transparent border-t-orange-500 border-r-orange-500 animate-spin-reverse"></div>
          
          {/* Merkez - Ana Araç İkonu */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-slow">
              <Car className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Özellik İkonları - 4 Köşe */}
          {/* Üst - Hız */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 animate-float">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center shadow-lg border border-slate-200">
              <Gauge className="w-6 h-6 md:w-7 md:h-7 text-slate-700" strokeWidth={2} />
            </div>
          </div>

          {/* Sağ - Güvenlik */}
          <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2 animate-float animation-delay-200">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center shadow-lg border border-slate-200">
              <Shield className="w-6 h-6 md:w-7 md:h-7 text-orange-600" strokeWidth={2} />
            </div>
          </div>

          {/* Alt - Zaman */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 animate-float animation-delay-400">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center shadow-lg border border-slate-200">
              <Clock className="w-6 h-6 md:w-7 md:h-7 text-slate-700" strokeWidth={2} />
            </div>
          </div>

          {/* Sol - Araç */}
          <div className="absolute top-1/2 left-0 transform -translate-x-2 -translate-y-1/2 animate-float animation-delay-600">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center shadow-lg border border-slate-200">
              <Car className="w-6 h-6 md:w-7 md:h-7 text-orange-600" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Yükleniyor Metni */}
        <div className="text-center space-y-3">
          <p className="text-lg md:text-xl font-semibold text-slate-800">
            Yükleniyor
          </p>
          <p className="text-sm text-slate-500 max-w-xs">
            Size en uygun araçları hazırlıyoruz...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-64 md:w-80 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-slate-700 via-orange-600 to-slate-700 animate-progress"></div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span>Güvenli Bağlantı</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

