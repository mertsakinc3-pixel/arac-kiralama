import { mockCars } from "@/data/mockCars";
import Link from "next/link";
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
    switch(rank) {
      case 1: return "from-yellow-400 to-yellow-600";
      case 2: return "from-gray-300 to-gray-500";
      case 3: return "from-orange-400 to-orange-600";
      case 4: return "from-blue-400 to-blue-600";
      case 5: return "from-purple-400 to-purple-600";
      default: return "from-gray-400 to-gray-600";
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch(rank) {
      case 1: return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white";
      case 2: return "bg-gradient-to-br from-gray-300 to-gray-500 text-white";
      case 3: return "bg-gradient-to-br from-orange-400 to-orange-600 text-white";
      default: return "bg-gradient-to-br from-blue-400 to-blue-600 text-white";
    }
  };

  return (
    <div className="w-full max-w-7xl px-4 mt-16">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <IoTrophy className="text-yellow-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-900">
            En Çok Kiralanan Araçlar
          </h2>
        </div>
        <p className="text-gray-600">Müşterilerimizin en çok tercih ettiği 5 araç</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {topRentedCars.map((car, index) => {
          const rank = index + 1;
          return (
            <div 
              key={car.id} 
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                rank === 1 ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {/* Sıra Rozeti */}
              <div className={`bg-gradient-to-br ${getRankColor(rank)} p-3 relative`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 ${getRankBadgeColor(rank)} rounded-full flex items-center justify-center text-base font-bold shadow-md`}>
                    {rank}
                  </div>
                  {rank === 1 && (
                    <IoTrophy className="text-white" size={20} />
                  )}
                </div>
                <div className="text-white text-lg font-bold">{car.rentalCount}</div>
                <div className="text-white/80 text-xs">Kiralama</div>
              </div>

              {/* Araç Görseli */}
              <div className="relative h-40">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{car.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs">{car.away} km</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    ₺{car.price}
                    <span className="text-xs text-gray-600">/gün</span>
                  </div>
                </div>

                <Link
                  href="/arac-kirala"
                  className={`block w-full text-white text-center font-semibold py-2 px-3 rounded-lg transition-all duration-200 text-sm ${
                    rank === 1
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-md'
                      : rank === 2
                      ? 'bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 shadow-sm'
                      : rank === 3
                      ? 'bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 shadow-sm'
                      : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-sm'
                  }`}
                >
                  🚗 Kirala
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

