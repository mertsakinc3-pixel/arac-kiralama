"use client";

import { useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { Car } from "@/data/mockCars";
import { IoMdClose, IoMdInformationCircleOutline } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

interface CarCardProps {
  car: Car;
  onSwipe: (direction: "left" | "right") => void;
  onLike: () => void;
  onReject: () => void;
  isTop: boolean;
  cardIndex?: number;
}

export function CarCard({
  car,
  onSwipe,
  onLike,
  onReject,
  isTop,
  cardIndex = 0,
}: CarCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null
  );
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-300, 300], [-30, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  // Swipe indikatörleri için transform'lar
  const leftOpacity = useTransform(x, [-300, -100], [1, 0]);
  const rightOpacity = useTransform(x, [100, 300], [0, 1]);

  // Arka kartlar için poker kartı açıları
  const getBackCardRotation = () => {
    if (isTop) return undefined;
    switch (cardIndex) {
      case 1:
        return 8;
      case 2:
        return -8;
      case 3:
        return 5;
      default:
        return 0;
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);

    const threshold = 100;

    if (info.offset.x > threshold) {
      // Sağa swipe - Beğen
      setExitDirection("right");
      x.set(300);
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      // Sola swipe - Reddet
      setExitDirection("left");
      x.set(-300);
      onSwipe("left");
    } else {
      // Geri dön
      x.set(0);
      y.set(0);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <motion.div
      className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing ${
        isTop ? "z-10" : "z-0"
      }`}
      style={{
        x,
        y,
        rotate: isTop ? rotate : getBackCardRotation(),
        opacity,
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      dragPropagation={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: isTop ? 1 : Math.max(0.93, 0.97 - cardIndex * 0.02),
        opacity: isTop ? 1 : Math.max(0.85, 0.98 - cardIndex * 0.05),
        y: isTop ? 0 : 15 + cardIndex * 8,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      exit={{
        x:
          exitDirection === "left" ? -300 : exitDirection === "right" ? 300 : 0,
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.5 },
      }}
    >
      <div className="relative w-full h-full bg-white rounded-2xl car-card-shadow overflow-hidden pointer-events-auto border border-gray-200 shadow-sm">
        {/* Araç Resmi */}
        <div className="relative h-7/12 w-full car-card-image pointer-events-none">
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
            priority={isTop}
          />

          {/* Fiyat Etiketi */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-lg font-bold text-green-600">
              ₺{car.price}/gün
            </span>
          </div>

          {/* Yakıt Türü */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-sm font-medium">
              {car.fuelType}
            </span>
          </div>

          {/* Swipe İndikatörleri */}
          {isDragging && (
            <>
              <motion.div
                className="absolute top-1/2 left-8 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg transform -rotate-12"
                style={{ opacity: leftOpacity }}
              >
                REDDET
              </motion.div>
              <motion.div
                className="absolute top-1/2 right-8 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg transform rotate-12"
                style={{ opacity: rightOpacity }}
              >
                BEĞEN
              </motion.div>
            </>
          )}
        </div>

        {/* Araç Bilgileri */}
        <div className="p-4 sm:p-6 h-1/3 flex flex-col justify-between car-card-content pointer-events-none">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {car.brand} {car.model}
            </h2>
            <p className="text-gray-600 mb-2">
              {car.year} • {car.transmission}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              {car.location},{" "}
              <span className="font-bold">{car.away}km uzakta </span>{" "}
            </p>

            {/* Özellikler */}
            {/* <div className="flex flex-wrap gap-2 mb-3">
              {car.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {feature}
                </span>
              ))}
              {car.features.length > 3 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  +{car.features.length - 3} daha
                </span>
              )}
            </div> */}
          </div>

          {/* rejecter info favorite button */}

          <div className="flex items-center justify-between">
            <div className="flex gap-2 pointer-events-auto justify-between w-full">
              <button
                onClick={onReject}
                className="w-14 h-14 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="text-red-500 text-2xl">
                  <IoMdClose />
                </span>
              </button>

              <button className="w-14 h-14 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <span className="text-blue-500 text-2xl">
                  <IoMdInformationCircleOutline />
                </span>
              </button>

              <button
                onClick={onLike}
                className="w-14 h-14 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="text-green-500 text-2xl">
                  <FaHeart />
                </span>
              </button>
            </div>
          </div>

          <div>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3 font-bold flex items-center justify-end">
              <span className="text-white text-end whitespace-nowrap  w-3/4 ">
                HEMEN KİRALA{" "}
              </span>

              <span className="w-1/4 flex items-center justify-end">
                <MdKeyboardArrowRight className="text-white text-2xl " />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
