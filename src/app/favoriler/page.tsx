"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { CarCard } from "@/components/CardCard/CarCard";
import { mockCars } from "@/data/mockCars";

export default function Favoriler() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // LocalStorage'dan favorileri yükle
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleRemoveFavorite = (carId: string) => {
    const updatedFavorites = favorites.filter((id) => id !== carId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const favoriteCars = mockCars.filter((car) => favorites.includes(car.id));

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">Favorilerim</h1>
        </div>

        {favoriteCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCars.map((car) => (
              <div key={car.id} className="relative">
                <CarCard
                  car={car}
                  onSwipe={() => {}}
                  onFavorite={() => handleRemoveFavorite(car.id)}
                  isFavorite={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

