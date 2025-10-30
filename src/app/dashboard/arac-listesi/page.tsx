"use client";

import { useState } from "react";
import { IoArrowBack, IoCar, IoTrash, IoCreate, IoEye, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { mockCars, Car } from "@/data/mockCars";

// Araç tipini genişlet
interface CarWithPublish extends Car {
  isPublished?: boolean;
}

export default function AracListesiPage() {
  const [cars, setCars] = useState<CarWithPublish[]>(
    mockCars.map(car => ({ ...car, isPublished: true }))
  );
  const [selectedCar, setSelectedCar] = useState<CarWithPublish | null>(null);

  const handleDelete = (carId: string) => {
    if (confirm("Bu aracı silmek istediğinizden emin misiniz?")) {
      setCars(prev => prev.filter(car => car.id !== carId));
      alert("Araç başarıyla silindi!");
    }
  };

  const handlePublishToggle = (carId: string) => {
    setCars(prev =>
      prev.map(car =>
        car.id === carId ? { ...car, isPublished: !car.isPublished } : car
      )
    );
    const car = cars.find(c => c.id === carId);
    if (car) {
      alert(car.isPublished ? "Araç yayından kaldırıldı!" : "Araç yayına alındı!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4">
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <IoArrowBack size={24} />
              </button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Araç Listesi</h1>
          </div>
          <Link href="/dashboard/arac-ekle">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <IoCar size={20} />
              Yeni Araç Ekle
            </button>
          </Link>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Toplam Araç</p>
            <p className="text-2xl font-bold text-gray-800">{cars.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Yayında</p>
            <p className="text-2xl font-bold text-green-600">
              {cars.filter(car => car.isPublished).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Yayında Değil</p>
            <p className="text-2xl font-bold text-red-600">
              {cars.filter(car => !car.isPublished).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Kirada</p>
            <p className="text-2xl font-bold text-yellow-600">
              {cars.filter(car => !car.availability).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Ortalama Fiyat</p>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(cars.reduce((acc, car) => acc + car.price, 0) / cars.length)} TL
            </p>
          </div>
        </div>

        {/* Araç Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Araç Görseli */}
              <div className="relative h-48">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {!car.isPublished && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                      Yayında Değil
                    </span>
                  )}
                  {car.availability ? (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      Müsait
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                      Kirada
                    </span>
                  )}
                </div>
              </div>

              {/* Araç Bilgileri */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {car.brand} {car.model}
                </h3>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  <div>
                    <span className="font-medium">Yıl:</span> {car.year}
                  </div>
                  <div>
                    <span className="font-medium">Yakıt:</span> {car.fuelType}
                  </div>
                  <div>
                    <span className="font-medium">Vites:</span> {car.transmission}
                  </div>
                  <div>
                    <span className="font-medium">Koltuk:</span> {car.seats}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Günlük Fiyat</p>
                    <p className="text-2xl font-bold text-blue-600">{car.price} TL</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-semibold text-gray-700">{car.rating}</span>
                  </div>
                </div>

                {/* Aksiyonlar */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      <IoEye size={16} />
                      Detay
                    </button>
                    <button
                      onClick={() => alert("Düzenleme özelliği yakında eklenecek!")}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <IoCreate size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <IoTrash size={16} />
                    </button>
                  </div>
                  
                  {/* Yayına Al/Kaldır Butonu */}
                  {car.isPublished ? (
                    <button
                      onClick={() => handlePublishToggle(car.id)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                    >
                      <IoCloseCircle size={18} />
                      Yayından Kaldır
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublishToggle(car.id)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                    >
                      <IoCheckmarkCircle size={18} />
                      Yayına Al
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detay Modal */}
        {selectedCar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCar.brand} {selectedCar.model}
                  </h2>
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="relative w-full h-64 mb-6">
                  <Image
                    src={selectedCar.image}
                    alt={`${selectedCar.brand} ${selectedCar.model}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Temel Bilgiler</h3>
                    <p className="text-gray-600">Yıl: {selectedCar.year}</p>
                    <p className="text-gray-600">Yakıt: {selectedCar.fuelType}</p>
                    <p className="text-gray-600">Vites: {selectedCar.transmission}</p>
                    <p className="text-gray-600">Koltuk: {selectedCar.seats}</p>
                    <p className="text-gray-600">Konum: {selectedCar.location}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Fiyatlandırma</h3>
                    <p className="text-gray-600">Günlük: {selectedCar.price} TL</p>
                    <p className="text-gray-600">Depozito: {selectedCar.deposit} TL</p>
                    <p className="text-gray-600">Teslim: {selectedCar.deliveryType}</p>
                    <p className="text-gray-600">Puan: ★ {selectedCar.rating}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Açıklama</h3>
                  <p className="text-gray-600">{selectedCar.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Özellikler</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCar.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Kiralama Koşulları</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCar.rentalConditions.map((condition, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Kapat
                  </button>
                  <button
                    onClick={() => {
                      alert("Düzenleme özelliği yakında eklenecek!");
                      setSelectedCar(null);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Düzenle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

