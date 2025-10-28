"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoFilter } from "react-icons/io5";
import { Car } from "@/data/mockCars";

interface FilterPanelProps {
  cars: Car[];
  filteredCars: Car[];
  onFilter: (cars: Car[]) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const FilterPanel = ({
  cars,
  filteredCars,
  onFilter,
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen,
}: FilterPanelProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;

  // Filter states - array olarak değiştiriyoruz çoklu seçim için
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedDeliveryTypes, setSelectedDeliveryTypes] = useState<string[]>(
    []
  );
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [depositRange, setDepositRange] = useState({ min: 0, max: 10000 });
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // Özgün değerler
  const fuelTypes = Array.from(new Set(cars.map((car) => car.fuelType)));
  const transmissions = Array.from(
    new Set(cars.map((car) => car.transmission))
  );
  const brands = Array.from(new Set(cars.map((car) => car.brand)));
  const rentalCompanies = Array.from(
    new Set(cars.map((car) => car.rentalCompany))
  );
  const deliveryTypes = Array.from(
    new Set(cars.map((car) => car.deliveryType))
  );
  const seatsOptions = Array.from(new Set(cars.map((car) => car.seats))).sort();
  const maxPrice = Math.max(...cars.map((car) => car.price));
  const maxDeposit = Math.max(...cars.map((car) => car.deposit));

  // Seçili markalara göre modeller
  const availableModels =
    selectedBrands.length > 0
      ? Array.from(
          new Set(
            cars
              .filter((car) => selectedBrands.includes(car.brand))
              .map((car) => car.model)
          )
        )
      : [];

  // Checkbox toggle fonksiyonları
  const toggleFuel = (fuel: string) => {
    setSelectedFuels((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    );
  };

  const toggleTransmission = (trans: string) => {
    setSelectedTransmissions((prev) =>
      prev.includes(trans) ? prev.filter((t) => t !== trans) : [...prev, trans]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    // Marka kaldırılınca o markanın modellerini de temizle
    if (selectedBrands.includes(brand)) {
      setSelectedModels((prev) =>
        prev.filter((m) => {
          const brandOfModel = cars.find((c) => c.model === m)?.brand;
          return brandOfModel !== brand;
        })
      );
    }
  };

  const toggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  const toggleDeliveryType = (delivery: string) => {
    setSelectedDeliveryTypes((prev) =>
      prev.includes(delivery)
        ? prev.filter((d) => d !== delivery)
        : [...prev, delivery]
    );
  };

  const toggleSeats = (seats: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seats) ? prev.filter((s) => s !== seats) : [...prev, seats]
    );
  };

  const handleApplyFilter = () => {
    let filtered = [...cars];

    if (selectedFuels.length > 0) {
      filtered = filtered.filter((car) => selectedFuels.includes(car.fuelType));
    }

    if (selectedTransmissions.length > 0) {
      filtered = filtered.filter((car) =>
        selectedTransmissions.includes(car.transmission)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((car) => selectedBrands.includes(car.brand));
    }

    if (selectedModels.length > 0) {
      filtered = filtered.filter((car) => selectedModels.includes(car.model));
    }

    if (selectedCompanies.length > 0) {
      filtered = filtered.filter((car) =>
        selectedCompanies.includes(car.rentalCompany)
      );
    }

    if (selectedDeliveryTypes.length > 0) {
      filtered = filtered.filter((car) =>
        selectedDeliveryTypes.includes(car.deliveryType)
      );
    }

    if (selectedSeats.length > 0) {
      filtered = filtered.filter((car) => selectedSeats.includes(car.seats));
    }

    filtered = filtered.filter(
      (car) => car.price >= priceRange.min && car.price <= priceRange.max
    );

    filtered = filtered.filter(
      (car) =>
        car.deposit >= depositRange.min && car.deposit <= depositRange.max
    );

    console.log(filtered);
    onFilter(filtered);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedFuels([]);
    setSelectedTransmissions([]);
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedCompanies([]);
    setSelectedDeliveryTypes([]);
    setSelectedSeats([]);
    setPriceRange({ min: 0, max: maxPrice });
    setDepositRange({ min: 0, max: maxDeposit });
    onFilter(cars);
    setIsOpen(false);
  };

  const activeFiltersCount =
    selectedFuels.length +
    selectedTransmissions.length +
    selectedBrands.length +
    selectedModels.length +
    selectedCompanies.length +
    selectedDeliveryTypes.length +
    selectedSeats.length +
    (priceRange.min > 0 || priceRange.max < maxPrice ? 1 : 0) +
    (depositRange.min > 0 || depositRange.max < maxDeposit ? 1 : 0);

  const renderFilterContent = () => (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-400">
        <h3 className="text-2xl font-bold text-gray-900">Filtrele</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoClose className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Yakıt Türü */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yakıt Türü
          </label>
          <div className="flex flex-wrap gap-2">
            {fuelTypes.map((fuel) => (
              <label key={fuel} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFuels.includes(fuel)}
                  onChange={() => toggleFuel(fuel)}
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{fuel}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Vites Tipi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vites Tipi
          </label>
          <div className="flex flex-wrap gap-2">
            {transmissions.map((trans) => (
              <label key={trans} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTransmissions.includes(trans)}
                  onChange={() => toggleTransmission(trans)}
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{trans}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Araç Markası */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Araç Markası
          </label>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Araç Modeli */}
        {selectedBrands.length > 0 && availableModels.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Araç Modeli
            </label>
            <div className="flex flex-wrap gap-2">
              {availableModels.map((model) => (
                <label key={model} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedModels.includes(model)}
                    onChange={() => toggleModel(model)}
                    className="w-4 h-4 text-blue-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{model}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Kiralama Şirketi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kiralama Şirketi
          </label>
          <div className="flex flex-wrap gap-2">
            {rentalCompanies.map((company) => (
              <label key={company} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company)}
                  onChange={() => toggleCompany(company)}
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{company}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Araç Teslim Şekli */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Araç Teslim Şekli
          </label>
          <div className="flex flex-wrap gap-2">
            {deliveryTypes.map((delivery) => (
              <label
                key={delivery}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedDeliveryTypes.includes(delivery)}
                  onChange={() => toggleDeliveryType(delivery)}
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{delivery}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Koltuk Sayısı */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Koltuk Sayısı
          </label>
          <div className="flex flex-wrap gap-2">
            {seatsOptions.map((seats) => (
              <label key={seats} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSeats.includes(seats)}
                  onChange={() => toggleSeats(seats)}
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {seats} Koltuk
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Fiyat Aralığı */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fiyat Aralığı: {priceRange.min}₺ - {priceRange.max}₺
          </label>
          <div className="flex gap-4">
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
              }
              className="flex-1"
            />
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
              }
              className="flex-1"
            />
          </div>
        </div>

        {/* Depozito Aralığı */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Depozito Aralığı: {depositRange.min}₺ - {depositRange.max}₺
          </label>
          <div className="flex gap-4">
            <input
              type="range"
              min={0}
              max={maxDeposit}
              value={depositRange.min}
              onChange={(e) =>
                setDepositRange({
                  ...depositRange,
                  min: parseInt(e.target.value),
                })
              }
              className="flex-1"
            />
            <input
              type="range"
              min={0}
              max={maxDeposit}
              value={depositRange.max}
              onChange={(e) =>
                setDepositRange({
                  ...depositRange,
                  max: parseInt(e.target.value),
                })
              }
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleApplyFilter}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Filtrele
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
        >
          Komple Temizle
        </button>
      </div>
    </div>
  );

  // Eğer external state varsa (Header'dan açılıyorsa) sadece panel göster
  if (externalIsOpen !== undefined) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 bottom-0 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {renderFilterContent()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Normal kullanım (kartların üstünde butonlu)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        <IoFilter className="text-xl" />
        <span>Filtrele</span>
        {activeFiltersCount > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {activeFiltersCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-30"
            />
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 bottom-0 bg-white shadow-2xl z-40 overflow-y-auto"
            >
              {renderFilterContent()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterPanel;
