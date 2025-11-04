"use client";

import { useState } from "react";
import { IoArrowBack, IoShield, IoAddCircle } from "react-icons/io5";
import Link from "next/link";
import { mockCars } from "@/data/mockCars";

interface InsuranceInfo {
  id: string;
  carId: string;
  carBrand: string;
  carModel: string;
  plateNumber: string;
  insuranceCompany: string;
  policyNumber: string;
  insuranceType: "Kasko" | "Trafik" | "Kasko + Trafik";
  startDate: string;
  endDate: string;
  premium: number;
  status: "active" | "expired" | "expiring_soon";
}

// Mock sigorta verileri
const mockInsurances: InsuranceInfo[] = [
  {
    id: "1",
    carId: "1",
    carBrand: "BMW",
    carModel: "3 Serisi",
    plateNumber: "34 ABC 123",
    insuranceCompany: "Anadolu Sigorta",
    policyNumber: "POL-2024-001234",
    insuranceType: "Kasko + Trafik",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    premium: 12500,
    status: "active",
  },
  {
    id: "2",
    carId: "2",
    carBrand: "Mercedes",
    carModel: "C-Class",
    plateNumber: "06 XYZ 456",
    insuranceCompany: "Allianz Sigorta",
    policyNumber: "POL-2024-002345",
    insuranceType: "Kasko + Trafik",
    startDate: "2024-03-20",
    endDate: "2025-03-20",
    premium: 15800,
    status: "active",
  },
  {
    id: "3",
    carId: "3",
    carBrand: "Audi",
    carModel: "A4",
    plateNumber: "35 DEF 789",
    insuranceCompany: "Mapfre Sigorta",
    policyNumber: "POL-2024-003456",
    insuranceType: "Kasko",
    startDate: "2024-02-10",
    endDate: "2024-11-10",
    premium: 11200,
    status: "expiring_soon",
  },
];

export default function SigortaPage() {
  const [insurances, setInsurances] = useState(mockInsurances);

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { text: "Aktif", color: "bg-green-100 text-green-800" },
      expired: { text: "Süresi Dolmuş", color: "bg-red-100 text-red-800" },
      expiring_soon: {
        text: "Yakında Dolacak",
        color: "bg-yellow-100 text-yellow-800",
      },
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}
      >
        {badge.text}
      </span>
    );
  };

  const stats = {
    total: insurances.length,
    active: insurances.filter((i) => i.status === "active").length,
    expiring: insurances.filter((i) => i.status === "expiring_soon").length,
    totalPremium: insurances.reduce((sum, i) => sum + i.premium, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/rentacar-dashboard" className="mr-4">
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <IoArrowBack size={24} />
              </button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">
              Sigorta Yönetimi
            </h1>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Toplam Sigorta</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Aktif</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Yakında Dolacak</p>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.expiring}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Toplam Prim</p>
            <p className="text-xl font-bold text-blue-600">
              {stats.totalPremium.toLocaleString("tr-TR")} TL
            </p>
          </div>
        </div>

        {/* Sigorta Listesi */}
        <div className="space-y-4">
          {insurances.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <IoShield className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 mb-4">
                Henüz sigorta kaydı bulunmamaktadır.
              </p>
              <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                İlk Sigortayı Ekle
              </button>
            </div>
          ) : (
            insurances.map((insurance) => (
              <div
                key={insurance.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Sol Taraf - Araç ve Sigorta Bilgileri */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <IoShield className="text-orange-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {insurance.carBrand} {insurance.carModel}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {insurance.plateNumber}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Sigorta Şirketi</p>
                        <p className="font-medium text-gray-800">
                          {insurance.insuranceCompany}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Poliçe No</p>
                        <p className="font-medium text-gray-800">
                          {insurance.policyNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Sigorta Tipi</p>
                        <p className="font-medium text-gray-800">
                          {insurance.insuranceType}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Geçerlilik</p>
                        <p className="font-medium text-gray-800">
                          {insurance.startDate} - {insurance.endDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sağ Taraf - Durum ve Fiyat */}
                  <div className="flex flex-col items-end gap-3">
                    {getStatusBadge(insurance.status)}
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Yıllık Prim</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {insurance.premium.toLocaleString("tr-TR")} TL
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      Teklif Al
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
