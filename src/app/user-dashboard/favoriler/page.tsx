"use client";

import { useState } from "react";
import { Heart, Star, Fuel, Settings, Users, MapPin, Trash2, Calendar, Building2, Car as CarIcon } from "lucide-react";
import { mockCars, Car } from "@/data/mockCars";
import Image from "next/image";
import RentalModal from "@/components/RentalModal";

export default function Favoriler() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // LocalStorage'dan favorileri yükle (initial state)
    if (typeof window !== "undefined") {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        return JSON.parse(savedFavorites);
      }
    }
    return [];
  });
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showRentalModal, setShowRentalModal] = useState(false);

  const handleRemoveFavorite = (carId: string) => {
    const updatedFavorites = favorites.filter((id) => id !== carId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRentNow = (car: Car) => {
    setSelectedCar(car);
    setShowRentalModal(true);
  };

  const favoriteCars = mockCars.filter((car) => favorites.includes(car.id));

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">Favorilerim</h1>
        </div>

        {favoriteCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
            <Heart className="w-24 h-24 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Henüz favori araç yok
            </h2>
            <p className="text-gray-500 text-center max-w-md">
              Beğendiğiniz araçları favorilere ekleyerek daha sonra kolayca
              ulaşabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Mobil görünüm - Kartlar */}
            <div className="md:hidden">
              {favoriteCars.map((car) => (
                <div key={car.id} className="border-b last:border-b-0 p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {car.brand} {car.model}
                          </h3>
                          <p className="text-sm text-gray-500">{car.year}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Building2 className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{car.rentalCompany}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFavorite(car.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{car.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{car.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {car.transmission} • {car.fuelType} • {car.seats} Kişi
                          </span>
                          <span className="font-bold text-lg text-blue-600">
                            ₺{car.price}
                            <span className="text-xs text-gray-500">/gün</span>
                          </span>
                        </div>
                        <button
                          onClick={() => handleRentNow(car)}
                          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <CarIcon className="w-4 h-4" />
                          Hemen Kirala
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop görünüm - Tablo */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Araç
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kiralama Şirketi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Yıl
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Vites
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Yakıt
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kapasite
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Konum
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Puan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {favoriteCars.map((car) => (
                    <tr
                      key={car.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={car.image}
                              alt={`${car.brand} ${car.model}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">
                              {car.brand}
                            </div>
                            <div className="text-sm text-gray-600">
                              {car.model}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{car.rentalCompany}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{car.year}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Settings className="w-4 h-4 text-gray-400" />
                          <span>{car.transmission}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Fuel className="w-4 h-4 text-gray-400" />
                          <span>{car.fuelType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{car.seats} Kişi</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{car.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-gray-900">
                            {car.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-blue-600 text-lg">
                          ₺{car.price}
                          <div className="text-xs text-gray-500 font-normal">
                            /gün
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleRentNow(car)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
                            title="Hemen Kirala"
                          >
                            <CarIcon className="w-4 h-4" />
                            Kirala
                          </button>
                          <button
                            onClick={() => handleRemoveFavorite(car.id)}
                            className="inline-flex items-center justify-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Favorilerden Kaldır"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Özet bilgi */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Toplam <span className="font-semibold text-gray-900">{favoriteCars.length}</span> favori araç
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Rental Modal */}
      {selectedCar && (
        <RentalModal 
          car={selectedCar}
          isOpen={showRentalModal}
          onClose={() => {
            setShowRentalModal(false);
            setSelectedCar(null);
          }}
        />
      )}
    </div>
  );
}

