"use client";

import { useState, useEffect } from "react";
import {
  IoCarSport,
  IoCalendar,
  IoWarning,
  IoCheckmarkCircle,
  IoAdd,
} from "react-icons/io5";
import Link from "next/link";

// Mock data - backend hazır olunca burası API'den gelecek
interface PackageInfo {
  totalSlots: number;
  usedSlots: number;
  availableSlots: number;
  expiryDate: string;
  daysRemaining: number;
}

interface CarSlot {
  id: number;
  carName: string;
  plateNumber: string;
  addedDate: string;
  expiryDate: string;
  isActive: boolean;
}

const mockPackageInfo: PackageInfo = {
  totalSlots: 5,
  usedSlots: 3,
  availableSlots: 2,
  expiryDate: "2025-11-30",
  daysRemaining: 25,
};

const mockCarSlots: CarSlot[] = [
  {
    id: 1,
    carName: "BMW 3 Serisi",
    plateNumber: "34 ABC 123",
    addedDate: "2025-10-05",
    expiryDate: "2025-11-04",
    isActive: true,
  },
  {
    id: 2,
    carName: "Mercedes C-Class",
    plateNumber: "34 XYZ 456",
    addedDate: "2025-10-10",
    expiryDate: "2025-11-09",
    isActive: true,
  },
  {
    id: 3,
    carName: "Audi A4",
    plateNumber: "34 DEF 789",
    addedDate: "2025-10-15",
    expiryDate: "2025-11-14",
    isActive: true,
  },
];

export default function PackageManager() {
  const [packageInfo, setPackageInfo] = useState<PackageInfo>(mockPackageInfo);
  const [carSlots, setCarSlots] = useState<CarSlot[]>(mockCarSlots);
  const [showDetails, setShowDetails] = useState(false);

  // Gün hesaplama
  const calculateDaysRemaining = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Uyarı seviyesi belirleme
  const getWarningLevel = (daysRemaining: number) => {
    if (daysRemaining <= 3) return "critical";
    if (daysRemaining <= 7) return "warning";
    return "normal";
  };

  const warningLevel = getWarningLevel(packageInfo.daysRemaining);

  return (
    <div className="space-y-4">
      {/* Ana Paket Kartı - Modern ve Klasik Tasarım */}
      <div
        className={`rounded-xl shadow-lg overflow-hidden ${
          warningLevel === "critical"
            ? "bg-white border-2 border-red-500"
            : warningLevel === "warning"
            ? "bg-white border-2 border-amber-500"
            : "bg-white border-2 border-slate-200"
        }`}
      >
        {/* Header Bölümü */}
        <div
          className={`p-6 ${
            warningLevel === "critical"
              ? "bg-gradient-to-r from-red-50 to-red-100"
              : warningLevel === "warning"
              ? "bg-gradient-to-r from-amber-50 to-amber-100"
              : "bg-gradient-to-r from-slate-50 to-slate-100"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  warningLevel === "critical"
                    ? "bg-red-500"
                    : warningLevel === "warning"
                    ? "bg-amber-500"
                    : "bg-slate-700"
                }`}
              >
                <IoCarSport className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-slate-800 text-xl font-bold">
                  Araç Paketiniz
                </h3>
                <p className="text-slate-600 text-sm">
                  {packageInfo.usedSlots} / {packageInfo.totalSlots} Araç
                  Kullanımda
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            >
              {showDetails ? "Gizle" : "Detaylar"}
            </button>
          </div>

          {/* İlerleme Çubuğu */}
          <div className="mb-2">
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  warningLevel === "critical"
                    ? "bg-red-500"
                    : warningLevel === "warning"
                    ? "bg-amber-500"
                    : "bg-slate-700"
                }`}
                style={{
                  width: `${
                    (packageInfo.usedSlots / packageInfo.totalSlots) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* İstatistikler Bölümü */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-slate-500 text-xs font-medium mb-1.5 uppercase tracking-wide">
                Toplam Slot
              </p>
              <p className="text-slate-800 text-3xl font-bold">
                {packageInfo.totalSlots}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-slate-500 text-xs font-medium mb-1.5 uppercase tracking-wide">
                Kullanılan
              </p>
              <p className="text-slate-800 text-3xl font-bold">
                {packageInfo.usedSlots}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-slate-500 text-xs font-medium mb-1.5 uppercase tracking-wide">
                Boş Slot
              </p>
              <p className="text-slate-800 text-3xl font-bold">
                {packageInfo.availableSlots}
              </p>
            </div>
          </div>

          {/* Uyarı Mesajı */}
          {warningLevel !== "normal" && (
            <div
              className={`mt-4 rounded-lg p-4 flex items-start gap-3 border-2 ${
                warningLevel === "critical"
                  ? "bg-red-50 border-red-300"
                  : "bg-amber-50 border-amber-300"
              }`}
            >
              <IoWarning
                className={
                  warningLevel === "critical"
                    ? "text-red-600"
                    : "text-amber-600"
                }
                size={22}
              />
              <p
                className={`text-sm font-medium ${
                  warningLevel === "critical"
                    ? "text-red-800"
                    : "text-amber-800"
                }`}
              >
                {warningLevel === "critical"
                  ? "Paketiniz çok yakında sona erecek! Araçlarınız pasif hale gelecek."
                  : "Paketinizin süresi yakında dolacak. Yeni paket almayı unutmayın!"}
              </p>
            </div>
          )}

          {/* Aksiyon Butonları */}
          <div className="mt-4">
            <Link href="/rentacar-dashboard/paket-sec" className="block">
              <button className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <IoAdd size={22} />
                Yeni Paket Al
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Detaylı Slot Listesi */}
      {showDetails && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-6 animate-fadeIn">
          <h4 className="text-lg font-bold text-slate-800 mb-4">
            Araç Slotları
          </h4>

          {carSlots.length > 0 ? (
            <div className="space-y-3">
              {carSlots.map((slot) => {
                const daysLeft = calculateDaysRemaining(slot.expiryDate);
                const slotWarning = getWarningLevel(daysLeft);

                return (
                  <div
                    key={slot.id}
                    className={`border-2 rounded-lg p-4 ${
                      slotWarning === "critical"
                        ? "border-red-300 bg-red-50"
                        : slotWarning === "warning"
                        ? "border-amber-300 bg-amber-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <IoCheckmarkCircle
                            className={
                              slotWarning === "critical"
                                ? "text-red-500"
                                : slotWarning === "warning"
                                ? "text-amber-500"
                                : "text-slate-600"
                            }
                            size={20}
                          />
                          <h5 className="font-bold text-slate-800">
                            {slot.carName}
                          </h5>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">
                          Plaka: <strong>{slot.plateNumber}</strong>
                        </p>
                        <p className="text-xs text-slate-500">
                          Eklendi:{" "}
                          {new Date(slot.addedDate).toLocaleDateString("tr-TR")}
                        </p>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            slotWarning === "critical"
                              ? "text-red-600"
                              : slotWarning === "warning"
                              ? "text-amber-600"
                              : "text-slate-700"
                          }`}
                        >
                          {daysLeft} Gün
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(slot.expiryDate).toLocaleDateString(
                            "tr-TR"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <IoCarSport className="text-slate-300 mx-auto mb-3" size={48} />
              <p className="text-slate-500">Henüz araç eklemediniz</p>
              <Link href="/rentacar-dashboard/arac-ekle">
                <button className="mt-4 bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                  İlk Aracı Ekle
                </button>
              </Link>
            </div>
          )}

          {/* Boş Slotlar */}
          {packageInfo.availableSlots > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-3">
                <strong>{packageInfo.availableSlots}</strong> boş slotunuz var
              </p>
              <Link href="/rentacar-dashboard/arac-ekle">
                <button className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <IoAdd size={20} />
                  Yeni Araç Ekle
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
