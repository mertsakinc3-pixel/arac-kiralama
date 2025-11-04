import dynamic from "next/dynamic";
import LocationComponent from "@/components/LocationComponent";
import FeaturedCars from "@/components/FeaturedCars";

// Below the fold componentleri lazy load
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const TrustSection = dynamic(() => import("@/components/TrustSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-lg" />,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start h-full overflow-x-hidden">
      {/* Konum Bölümü - Öne Çıkarıldı */}
      <div className="w-full bg-gradient-to-b from-slate-50 via-gray-50 to-white py-6 lg:py-16 px-4 relative overflow-hidden">
        {/* Arka Plan Dekoratif Elementler */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10">
            {/* Ana Başlık */}
            <div className=" mb-3 hidden lg:inline-block">
              <span className="bg-gradient-to-r from-slate-700 via-slate-800 to-orange-600 text-transparent bg-clip-text text-3xl md:text-4xl lg:text-5xl font-extrabold animate-gradient">
                Size En Yakın Araçları Bulalım
              </span>
            </div>

            {/* Alt Başlık */}
            <p className="text-lg md:text-xl text-gray-700 mb-3 font-medium">
              Konumunuzu paylaşın,{" "}
              <span className="text-orange-600 font-bold">anında</span> size en
              uygun araçları gösterelim
            </p>

            {/* Özellikler */}
            <div className="flex flex-row lg:flex-wrap items-center justify-center gap-2 lg:gap-3 mb-3">
              <div className="flex items-center gap-2 bg-white px-3 lg:px-3 py-1.5 rounded-full shadow-md border-2 border-emerald-200 transform hover:scale-105 transition-transform">
                <svg
                  className="w-4 h-4 text-emerald-600 hidden lg:block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs lg:text-sm font-semibold text-gray-700">
                  100% Güvenli
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 lg:px-3 py-1.5 rounded-full shadow-md border-2 border-slate-200 transform hover:scale-105 transition-transform">
                <svg
                  className="w-4 h-4 text-slate-600 hidden lg:block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs lg:text-sm font-semibold text-gray-700">
                  Anında Sonuç
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 lg:px-3 py-1.5 rounded-full shadow-md border-2 border-orange-200 transform hover:scale-105 transition-transform">
                <svg
                  className="w-4 h-4 text-orange-600 hidden lg:block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs lg:text-sm font-semibold text-gray-700">
                  En İyi Fiyatlar
                </span>
              </div>
            </div>

            {/* Güvenlik Notu */}
            <div className="inline-flex items-center gap-2 text-sm text-gray-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <svg
                className="w-4 h-4 text-emerald-600 animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">
                Konumunuz güvende, sadece size özel araçları göstermek için
                kullanılır
              </span>
            </div>
          </div>

          {/* Konum Bileşeni Container */}
          <div className="relative rounded-3xl shadow-2xl p-[3px] bg-gradient-to-br from-slate-600 via-slate-700 to-orange-600 animate-gradient">
            {/* İç Beyaz Container */}
            <div className="bg-white rounded-[22px] p-8 md:p-12 relative overflow-hidden">
              {/* Dekoratif Köşe Elementleri */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-400 to-slate-500 opacity-10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-400 to-orange-500 opacity-10 rounded-tr-full"></div>

              <LocationComponent />
            </div>
          </div>
        </div>
      </div>

      {/* Öne Çıkan Araçlar */}
      <FeaturedCars />

      {/* Güven Alanı */}
      <TrustSection />

      {/* Kullanıcı Yorumları */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
