"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { mockCars, Car } from "@/data/mockCars";
import { CarCard } from "./CarCard";
import FilterPanel from "../FilterPanel";

interface CardSwipeContainerProps {
  isFilterOpen?: boolean;
  setIsFilterOpen?: (isOpen: boolean) => void;
}

const CardSwipeContainer = ({ isFilterOpen, setIsFilterOpen }: CardSwipeContainerProps) => {
  const [allCars] = useState<Car[]>(mockCars);
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCars, setLikedCars] = useState<Car[]>([]);
  const [rejectedCars, setRejectedCars] = useState<Car[]>([]);

  const handleSwipe = (direction: "left" | "right") => {
    // Swipe işlemi sırasında sadece state'i güncelle, index'i değiştirme
    if (direction === "right") {
      if (cars[currentIndex]) {
        setLikedCars((prev) => [...prev, cars[currentIndex]]);
      }
    } else {
      if (cars[currentIndex]) {
        setRejectedCars((prev) => [...prev, cars[currentIndex]]);
      }
    }

    // Swipe animasyonu tamamlandıktan sonra index'i artır
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };                                                                                                                   

  const handleLike = () => {
    if (cars[currentIndex]) {
      setLikedCars((prev) => [...prev, cars[currentIndex]]);
      // Beğenme işlemi sonrası kartı değiştir
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const handleReject = () => {
    if (cars[currentIndex]) {
      setRejectedCars((prev) => [...prev, cars[currentIndex]]);
      // Reddetme işlemi sonrası kartı değiştir
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
  };

  // const resetCards = () => {
  //   setCars(mockCars);
  //   setCurrentIndex(0);
  //   setLikedCars([]);
  //   setRejectedCars([]);
  // };

  // const addRejectedCarsBackToList = () => {
  //   if (rejectedCars.length > 0) {
  //     setCars((prev) => [...prev, ...rejectedCars]);
  //     setRejectedCars([]);
  //   }
  // };

  const currentCar = cars[currentIndex];
  const nextCar = cars[currentIndex + 1];

  const handleFilterChange = (filteredCars: Car[]) => {
    setCars(filteredCars);
    setCurrentIndex(0); // Filtre değişince başa dön
  };

  return (
    <div className="w-full max-w-md mx-auto px-12 mt-4">
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
      <div className="relative h-[600px] sm:h-[700px] w-full car-card-container">
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

      {/* Reset Butonu */}
      {/* {currentIndex >= cars.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600 mb-4">
            Tüm araçları inceledin! Beğendiğin {likedCars.length} araç var.
          </p>
          <button
            onClick={resetCards}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            Tekrar Başla
          </button>
        </motion.div>
      )} */}

      {/* Beğenilen Araçlar Listesi */}
      {/* {likedCars.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Beğendiğin Araçlar
          </h3>
          <div className="space-y-3">
            {likedCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4"
              >
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  width={64}
                  height={64}
                  className="object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {car.brand} {car.model}
                  </h4>
                  <p className="text-sm text-gray-600">{car.location}</p>
                  <p className="text-sm font-medium text-green-600">
                    ₺{car.price}/gün
                  </p>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Kirala
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )} */}

      {/* Beğenilmeyen Araçlar Listesi */}
      {/* {rejectedCars.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Beğenmediğin Araçlar
            </h3>
            <button
              onClick={addRejectedCarsBackToList}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Tekrar Kontrol Et ({rejectedCars.length})
            </button>
          </div>
          <div className="space-y-3">
            {rejectedCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4 opacity-75"
              >
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  width={64}
                  height={64}
                  className="object-cover rounded-lg grayscale"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {car.brand} {car.model}
                  </h4>
                  <p className="text-sm text-gray-600">{car.location}</p>
                  <p className="text-sm font-medium text-gray-500">
                    ₺{car.price}/gün
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-sm">Reddedildi</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )} */}
    </div>
  );
};

export default CardSwipeContainer;
