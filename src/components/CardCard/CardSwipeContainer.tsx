"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockCars, Car } from "@/data/mockCars";
import { CarCard } from "./CarCard";
import FilterPanel from "../FilterPanel";
import { IoFilter } from "react-icons/io5";

const CardSwipeContainer = () => {
  const [allCars] = useState<Car[]>(mockCars);
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // LocalStorage'dan favorileri yükle
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    // Sağa swipe - favorilere ekle
    if (direction === "right") {
      const currentCar = cars[currentIndex];
      if (currentCar && !favorites.includes(currentCar.id)) {
        const updatedFavorites = [...favorites, currentCar.id];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
    }
    
    // Swipe animasyonu tamamlandıktan sonra index'i artır
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  const handleReject = () => {
    // Reddetme işlemi sonrası kartı değiştir
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  const handleFavoriteToggle = () => {
    const currentCar = cars[currentIndex];
    if (!currentCar) return;

    if (favorites.includes(currentCar.id)) {
      const updatedFavorites = favorites.filter((id) => id !== currentCar.id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, currentCar.id];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const currentCar = cars[currentIndex];

  const handleFilterChange = (filteredCars: Car[]) => {
    setCars(filteredCars);
    setCurrentIndex(0); // Filtre değişince başa dön
  };

  return (
    <div className="w-full pb-8 pt-4 scroll-smooth">
      {/* Header with Filter Button */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Araçlarını Keşfet
          </h2>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            <IoFilter className="text-xl" />
            <span className="hidden sm:inline">Filtrele</span>
          </button>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Beğendiğin araçları sağa, beğenmediklerini sola kaydır
        </p>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        cars={allCars}
        filteredCars={cars}
        onFilter={handleFilterChange}
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
      />

      {/* Desktop ve Mobile Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Kartlar Container - Sol taraf (Desktop'ta) */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-4">
          <div className="relative w-full max-w-md mx-auto lg:max-w-none car-card-container" style={{ minHeight: '650px' }}>
            <AnimatePresence>
              {currentCar && (
                <CarCard
                  key={currentCar.id}
                  car={currentCar}
                  onSwipe={handleSwipe}
                  onReject={handleReject}
                  onFavorite={handleFavoriteToggle}
                  isFavorite={favorites.includes(currentCar.id)}
                  isTop={true}
                  cardIndex={0}
                />
              )}
            </AnimatePresence>

            {cars.map((car, index) => {
              if (index <= currentIndex) return null;

              // En fazla 3 arka kart göster
              const stackPosition = index - currentIndex - 1;
              if (stackPosition > 3) return null;

              return (
                <CarCard
                  key={car.id}
                  car={car}
                  onSwipe={handleSwipe}
                  onReject={handleReject}
                  isTop={false}
                  cardIndex={stackPosition}
                />
              );
            })}
          </div>
        </div>

        {/* Harita Container - Sağ taraf (Desktop'ta) */}
        {currentCar && (
          <motion.div
            key={currentCar.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full lg:w-1/2 mt-8 lg:mt-0"
          >
            <div className="h-64 sm:h-80 lg:h-[650px] w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  currentCar.location
                )}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  scrollBehavior: "auto",
                  overscrollBehavior: "contain",
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-sm sm:text-base text-gray-600 px-1">
              <span className="truncate font-medium">{currentCar.location}</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  currentCar.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium whitespace-nowrap ml-2"
              >
                Haritada aç →
              </a>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default CardSwipeContainer;
