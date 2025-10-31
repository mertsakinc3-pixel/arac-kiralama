"use client";

import { useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/data/mockCars";
import { IoMdClose, IoMdInformationCircleOutline } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  FaBluetoothB,
  FaIdCard,
  FaMoneyBillWave,
  FaRoad,
  FaUser,
} from "react-icons/fa";
import { FaSnowflake } from "react-icons/fa6";
import { MdGpsFixed, MdElectricBolt, MdEventSeat } from "react-icons/md";
import { RiRadarLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CarCardProps {
  car: Car;
  onSwipe: (direction: "left" | "right") => void;
  onReject?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  isTop?: boolean;
  cardIndex?: number;
}

export function CarCard({
  car,
  onSwipe,
  onReject,
  onFavorite,
  isFavorite = false,
  isTop = true,
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

  const getFeatureIcon = (feature: string) => {
    const normalized = feature.toLowerCase();
    if (normalized.includes("klima"))
      return <FaSnowflake className="text-blue-600" />;
    if (normalized.includes("bluetooth"))
      return <FaBluetoothB className="text-blue-600" />;
    if (normalized.includes("gps") || normalized.includes("navigasyon"))
      return <MdGpsFixed className="text-blue-600" />;
    if (normalized.includes("park"))
      return <RiRadarLine className="text-blue-600" />;
    if (normalized.includes("deri") || normalized.includes("koltuk"))
      return <MdEventSeat className="text-blue-600" />;
    if (normalized.includes("hibrit") || normalized.includes("elektrik"))
      return <MdElectricBolt className="text-blue-600" />;
    return <MdGpsFixed className="text-blue-600" />;
  };

  const getConditionIcon = (condition: string) => {
    const normalized = condition.toLowerCase();
    if (normalized.includes("ehliyet"))
      return <FaIdCard className="text-emerald-600" />;
    if (normalized.includes("km"))
      return <FaRoad className="text-emerald-600" />;
    if (normalized.includes("yaş"))
      return <FaUser className="text-emerald-600" />;
    if (normalized.includes("depozito") || normalized.includes("tl"))
      return <FaMoneyBillWave className="text-emerald-600" />;
    return <FaIdCard className="text-emerald-600" />;
  };

  return (
    <>
      <motion.div
        className={`absolute inset-0 w-full h-full px-12 cursor-grab active:cursor-grabbing ${
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
            exitDirection === "left"
              ? -300
              : exitDirection === "right"
              ? 300
              : 0,
          opacity: 0,
          scale: 0.8,
          transition: { duration: 0.5 },
        }}
      >
        <div className="relative w-full bg-white rounded-2xl car-card-shadow pointer-events-auto border border-gray-200 shadow-sm flex flex-col">
          {/* Araç Resmi */}
          <div className="relative h-96 w-full car-card-image pointer-events-none flex-shrink-0">
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover"
              priority={isTop}
            />

            {/* Yakıt Türü */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">
                {car.fuelType}
              </span>
            </div>

            {/* Uzaklık */}
            <div className="absolute bottom-2 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">
                {car.location} • {car.away}km uzakta
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
                  className="absolute top-1/2 right-8 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg transform rotate-12"
                  style={{ opacity: rightOpacity }}
                >
                  FAVORİ
                </motion.div>
              </>
            )}
          </div>

          {/* Araç Bilgileri */}
          <div className="p-4 flex flex-col justify-between car-card-content pointer-events-none space-y-3">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {car.brand} {car.model}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {car.year} • {car.transmission}
                  </p>
                </div>

                {/* Fiyat Etiketi */}
                <div className="bg-blue-100 rounded-lg px-2.5 py-1.5 shadow-sm border border-blue-200">
                  <div className="flex flex-col items-end space-y-0.5">
                    <div className="flex items-center space-x-1">
                      <span className="text-base font-bold text-red-600">
                        ₺{car.price}
                      </span>
                      <span className="text-sm text-black">/gün</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-base font-bold text-red-600">
                        ₺{car.price * 7}
                      </span>
                      <span className="text-sm text-black">/hafta</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* rejecter info favorite button */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 pointer-events-auto justify-between w-full">
                {onReject && (
                  <button
                    onClick={onReject}
                    className="w-12 h-12 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span className="text-red-500 text-xl">
                      <IoMdClose />
                    </span>
                  </button>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                      <span className="text-blue-500 text-xl">
                        <IoMdInformationCircleOutline />
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Araç Özellikleri</DialogTitle>
                    </DialogHeader>
                    <div className="mt-3">
                      <ul className="mt-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {car.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                              {getFeatureIcon(feature)}
                            </span>
                            <span className="text-gray-800 leading-6">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <DialogTitle className="mt-6">
                      Kiralama Koşulları
                    </DialogTitle>
                    <div className="mt-3">
                      <ul className="mt-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {car.rentalConditions.map((rentalCondition, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                              {getConditionIcon(rentalCondition)}
                            </span>
                            <span className="text-gray-800 leading-6">
                              {rentalCondition}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>

                {onFavorite && (
                  <button
                    onClick={onFavorite}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      isFavorite
                        ? "bg-red-100 hover:bg-red-200"
                        : "bg-green-100 hover:bg-green-200"
                    }`}
                  >
                    <FaHeart
                      className={`text-xl ${
                        isFavorite ? "text-red-500" : "text-green-500"
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>

            <div className="pt-2 pointer-events-auto">
              <Link href={`/arac/${car.id}`}>
                <button className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-bold flex items-center justify-between hover:bg-blue-600 transition-colors">
                  <span className="text-white font-bold text-sm">
                    HEMEN KİRALA
                  </span>
                  <MdKeyboardArrowRight className="text-white text-2xl" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default CarCard;
