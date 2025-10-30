import { mockCars } from "@/data/mockCars";
import Image from "next/image";
import { IoTrophy } from "react-icons/io5";

export default function FeaturedCars() {
  // Araçlara kiralama sayısı (bidAmount) ekle - gerçek uygulamada bu backend'den gelecek
  const carsWithRentals = mockCars.map((car) => ({
    ...car,
    // eslint-disable-next-line react-hooks/purity
    rentalCount: Math.floor(Math.random() * 500) + 100, // 100-600 arası rastgele kiralama sayısı
  }));

  // En çok kiralanan 5 aracı sırala (İlçe Liderleri mantığı)
  const topRentedCars = [...carsWithRentals]
    .sort((a, b) => b.rentalCount - a.rentalCount)
    .slice(0, 5);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-300 via-yellow-400 to-yellow-500 shadow-xl shadow-yellow-500/50"; // 1. sıra - Parlak altın
      case 2:
      case 3:
        return "from-gray-200 via-gray-300 to-gray-400 shadow-lg shadow-gray-400/40"; // 2-3. sıra - Parlak gümüş
      case 4:
        return "bg-[#d4a89a]"; // 4. sıra - Açık Bronze
      case 5:
        return "bg-[#bf8970]"; // 5. sıra - Koyu Bronze
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-300 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-400/60 w-10 h-10 text-lg border-2 border-white"; // 1. sıra - Parlak altın, büyük
      case 2:
      case 3:
        return "bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900 shadow-md w-9 h-9 text-base"; // 2-3. sıra - Gümüş, orta
      case 4:
        return "bg-[#d4a89a] text-white w-9 h-9 text-base font-extrabold border-2 border-white shadow-lg"; // 4. sıra - Açık Bronze
      case 5:
        return "bg-[#bf8970] text-white w-9 h-9 text-base font-extrabold border-2 border-white shadow-lg"; // 5. sıra - Koyu Bronze
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-600 text-white w-8 h-8";
    }
  };

  return (
    <div className="w-full max-w-7xl px-4 xl:px-0 mt-16">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <IoTrophy className="text-yellow-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-900">
            En Çok Kiralanan Araçlar
          </h2>
        </div>
        <p className="text-gray-600">
          Müşterilerimizin en çok tercih ettiği 5 araç
        </p>
      </div>

      {/* Piramit Düzeni - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap justify-center items-center xl:items-end gap-4 xl:gap-3 2xl:gap-4">
        {topRentedCars.map((car, index) => {
          const rank = index + 1;
          
          // Order sınıfları - xl altında normal (1,2,3,4,5), xl'de piramit (4,2,1,3,5)
          const orderClasses = 
            rank === 1 ? "xl:order-3" : 
            rank === 2 ? "xl:order-2" : 
            rank === 3 ? "xl:order-4" : 
            rank === 4 ? "xl:order-1" : 
            "xl:order-5";
          
          // Boyut ayarları - grid'de otomatik, xl'de sabit genişlik
          const sizeClasses = 
            rank === 1 ? "xl:w-56" : // 1. sıra
            rank === 2 || rank === 3 ? "xl:w-52" : // 2-3. sıra
            "xl:w-48"; // 4-5. sıra
          
          // Yükseklik ayarları - sadece xl'de scale (daha az fark)
          const heightScale = 
            rank === 1 ? "xl:scale-y-105" : // 1. sıra - %5 daha uzun
            rank === 2 || rank === 3 ? "xl:scale-y-103" : // 2-3. sıra - %3 daha uzun
            "xl:scale-y-100"; // 4-5. sıra - normal
          
          const ringClasses = 
            rank === 1 ? "ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400/40" : 
            rank === 2 || rank === 3 ? "ring-3 ring-gray-300 shadow-xl shadow-gray-400/30" : 
            rank === 4 ? "ring-2 ring-[#d4a89a]" :
            "ring-2 ring-[#bf8970]";
          
          return (
            <div
              key={car.id}
              className={`${sizeClasses} ${orderClasses} ${heightScale} ${ringClasses} bg-white rounded-lg overflow-hidden transition-all duration-300`}
            >
              {/* Sıra Rozeti ve Rent a Car */}
              <div
                className={`bg-gradient-to-br ${getRankColor(
                  rank
                )} p-3 relative`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`${getRankBadgeColor(
                        rank
                      )} rounded-full flex items-center justify-center font-bold`}
                    >
                      {rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-white font-bold leading-tight break-words ${
                        rank === 1 ? "text-base" : 
                        rank === 2 || rank === 3 ? "text-sm" : 
                        "text-xs"
                      }`}>
                        {car.rentalCompany}
                      </div>
                    </div>
                  </div>
                  {rank === 1 && <IoTrophy className="text-white" size={20} />}
                </div>
              </div>

              {/* Araç Görseli */}
              <div className={`relative ${
                rank === 1 ? "h-48 xl:h-44" : 
                rank === 2 || rank === 3 ? "h-48 xl:h-42" : 
                "h-48 xl:h-40"
              }`}>
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {car.rating}
                </div>
              </div>

              {/* Araç Bilgileri */}
              <div className="p-3">
                <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">
                  {car.brand} {car.model}
                </h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {car.description}
                </p>

                {/* Adres Bilgisi */}
                <div className="flex items-start gap-1 mb-3">
                  <svg
                    className="w-3 h-3 text-gray-500 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-xs text-gray-600 line-clamp-1">
                    {car.location}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-lg font-bold text-blue-600">
                    ₺{car.price}
                    <span className="text-xs text-gray-600">/gün</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
