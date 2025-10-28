"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockCars, Car } from "@/data/mockCars";
import { CarCard } from "./CarCard";
import FilterPanel from "../FilterPanel";

interface CardSwipeContainerProps {
  isFilterOpen?: boolean;
  setIsFilterOpen?: (isOpen: boolean) => void;
}

const CardSwipeContainer = ({
  isFilterOpen,
  setIsFilterOpen,
}: CardSwipeContainerProps) => {
  const [allCars] = useState<Car[]>(mockCars);
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = () => {
    // Swipe işlemi sırasında sadece state'i güncelle, index'i değiştirme
    // Swipe animasyonu tamamlandıktan sonra index'i artır
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  const handleLike = () => {
    // Beğenme işlemi sonrası kartı değiştir
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

  const currentCar = cars[currentIndex];

  const handleFilterChange = (filteredCars: Car[]) => {
    setCars(filteredCars);
    setCurrentIndex(0); // Filtre değişince başa dön
  };

  return (
    <div className="w-full max-w-md mx-auto  pb-8 pt-4 scroll-smooth">
      {/* Filter Panel */}
      <div className="mb-4">
        <FilterPanel
          cars={allCars}
          filteredCars={cars}
          onFilter={handleFilterChange}
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
        />
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Araçlarını Keşfet
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Beğendiğin araçları sağa, beğenmediklerini sola kaydır
        </p>
      </div>

      {/* Kartlar Container */}
      <div className="relative h-[650px] sm:h-[700px] w-full car-card-container">
        <AnimatePresence>
          {currentCar && (
            <CarCard
              key={currentCar.id}
              car={currentCar}
              onSwipe={handleSwipe}
              onLike={handleLike}
              onReject={handleReject}
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
              onLike={handleLike}
              onReject={handleReject}
              isTop={false}
              cardIndex={stackPosition}
            />
          );
        })}
      </div>

      {/* İstatistikler */}
      {/* <div className="mt-6 flex justify-center gap-4 text-sm text-gray-600">
        <span className="text-green-600">Beğenilen: {likedCars.length}</span>
        <span className="text-red-600">Reddedilen: {rejectedCars.length}</span>
        <span className="text-blue-600">
          Kalan: {cars.length - currentIndex}
        </span>
      </div> */}

      {/* Harita Container - Sadece en üstteki kart için */}
      {currentCar && (
        <motion.div
          key={currentCar.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-full mt-16 px-4"
        >
          <div className="h-52 w-full overflow-hidden rounded-xl border border-gray-200">
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
          <div className="flex items-center justify-between mt-2 text-sm text-gray-600 px-1">
            <span className="truncate">{currentCar.location}</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                currentCar.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Haritada aç
            </a>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default CardSwipeContainer;
