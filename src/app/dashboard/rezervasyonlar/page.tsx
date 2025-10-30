"use client";

import { useState } from "react";
import { IoArrowBack, IoCalendar, IoCar, IoPerson, IoCall, IoCheckmarkCircle, IoCloseCircle, IoTime, IoShieldCheckmark } from "react-icons/io5";
import Link from "next/link";

// Mock data - backend hazır olunca API'den gelecek
interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  carBrand: string;
  carModel: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: "pending" | "approved" | "active" | "completed" | "cancelled";
  createdAt: string;
  findeksScore?: number;
  findeksChecked?: boolean;
}

const mockReservations: Reservation[] = [
  {
    id: "1",
    customerName: "Mehmet Demir",
    customerPhone: "+90 555 111 2233",
    customerEmail: "mehmet@example.com",
    carBrand: "BMW",
    carModel: "3 Serisi",
    startDate: "2025-11-01",
    endDate: "2025-11-05",
    totalDays: 4,
    totalPrice: 1800,
    status: "pending",
    createdAt: "2025-10-28"
  },
  {
    id: "2",
    customerName: "Ayşe Yılmaz",
    customerPhone: "+90 555 222 3344",
    customerEmail: "ayse@example.com",
    carBrand: "Mercedes",
    carModel: "C-Class",
    startDate: "2025-10-30",
    endDate: "2025-11-03",
    totalDays: 4,
    totalPrice: 2080,
    status: "approved",
    createdAt: "2025-10-27"
  },
  {
    id: "3",
    customerName: "Can Öztürk",
    customerPhone: "+90 555 333 4455",
    customerEmail: "can@example.com",
    carBrand: "Audi",
    carModel: "A4",
    startDate: "2025-10-25",
    endDate: "2025-10-30",
    totalDays: 5,
    totalPrice: 2400,
    status: "active",
    createdAt: "2025-10-23"
  },
  {
    id: "4",
    customerName: "Zeynep Kaya",
    customerPhone: "+90 555 444 5566",
    customerEmail: "zeynep@example.com",
    carBrand: "Volkswagen",
    carModel: "Golf",
    startDate: "2025-10-15",
    endDate: "2025-10-20",
    totalDays: 5,
    totalPrice: 1600,
    status: "completed",
    createdAt: "2025-10-12"
  },
  {
    id: "5",
    customerName: "Ali Şahin",
    customerPhone: "+90 555 555 6677",
    customerEmail: "ali@example.com",
    carBrand: "Toyota",
    carModel: "Corolla",
    startDate: "2025-10-28",
    endDate: "2025-11-02",
    totalDays: 5,
    totalPrice: 1900,
    status: "cancelled",
    createdAt: "2025-10-26"
  }
];

export default function RezervasyonlarPage() {
  const [reservations, setReservations] = useState(mockReservations);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [findeksModal, setFindeksModal] = useState<Reservation | null>(null);

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { text: "Beklemede", color: "bg-yellow-100 text-yellow-800" },
      approved: { text: "Onaylandı", color: "bg-blue-100 text-blue-800" },
      active: { text: "Aktif", color: "bg-green-100 text-green-800" },
      completed: { text: "Tamamlandı", color: "bg-gray-100 text-gray-800" },
      cancelled: { text: "İptal Edildi", color: "bg-red-100 text-red-800" }
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const handleStatusChange = (reservationId: string, newStatus: "approved" | "cancelled") => {
    setReservations(prev =>
      prev.map(res =>
        res.id === reservationId ? { ...res, status: newStatus } : res
      )
    );
    setSelectedReservation(null);
    alert(`Rezervasyon ${newStatus === "approved" ? "onaylandı" : "iptal edildi"}!`);
  };

  const handleFindeksCheck = (reservation: Reservation) => {
    // Backend hazır olunca gerçek Findeks API'si çağrılacak
    const mockScore = Math.floor(Math.random() * (1900 - 1000) + 1000);
    setReservations(prev =>
      prev.map(res =>
        res.id === reservation.id 
          ? { ...res, findeksScore: mockScore, findeksChecked: true }
          : res
      )
    );
    setFindeksModal(null);
    alert(`Findeks Puanı: ${mockScore}\n${mockScore >= 1400 ? '✅ Uygun' : '❌ Uygun Değil'}`);
  };

  const filteredReservations = filterStatus === "all"
    ? reservations
    : reservations.filter(res => res.status === filterStatus);

  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === "pending").length,
    active: reservations.filter(r => r.status === "active").length,
    completed: reservations.filter(r => r.status === "completed").length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/dashboard" className="mr-4">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <IoArrowBack size={24} />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Rezervasyonlar</h1>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Toplam</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Bekleyen</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Aktif</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500 mb-1">Tamamlanan</p>
            <p className="text-2xl font-bold text-gray-600">{stats.completed}</p>
          </div>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Bekleyen
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "approved"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Onaylandı
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "active"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "completed"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tamamlanan
            </button>
            <button
              onClick={() => setFilterStatus("cancelled")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "cancelled"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              İptal
            </button>
          </div>
        </div>

        {/* Rezervasyon Listesi */}
        <div className="space-y-4">
          {filteredReservations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">Bu kategoride rezervasyon bulunmamaktadır.</p>
            </div>
          ) : (
            filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Sol Taraf - Müşteri ve Araç Bilgileri */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <IoCar className="text-blue-500" size={24} />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {reservation.carBrand} {reservation.carModel}
                        </h3>
                        <p className="text-sm text-gray-500">Rezervasyon #{reservation.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <IoPerson className="text-gray-400" />
                        <span className="text-gray-700">{reservation.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoCall className="text-gray-400" />
                        <span className="text-gray-700">{reservation.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoCalendar className="text-gray-400" />
                        <span className="text-gray-700">
                          {reservation.startDate} - {reservation.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoTime className="text-gray-400" />
                        <span className="text-gray-700">{reservation.totalDays} Gün</span>
                      </div>
                    </div>
                  </div>

                  {/* Sağ Taraf - Durum ve Aksiyonlar */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(reservation.status)}
                      {reservation.findeksChecked && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          reservation.findeksScore! >= 1400 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          Findeks: {reservation.findeksScore}
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {reservation.totalPrice.toLocaleString('tr-TR')} TL
                    </p>
                    
                    {reservation.status === "pending" && (
                      <div className="flex flex-wrap gap-2 justify-end">
                        <button
                          onClick={() => setFindeksModal(reservation)}
                          className="flex items-center gap-1 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                        >
                          <IoShieldCheckmark size={16} />
                          Findeks
                        </button>
                        <button
                          onClick={() => handleStatusChange(reservation.id, "approved")}
                          className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <IoCheckmarkCircle size={18} />
                          Onayla
                        </button>
                        <button
                          onClick={() => handleStatusChange(reservation.id, "cancelled")}
                          className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <IoCloseCircle size={18} />
                          Reddet
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedReservation(reservation)}
                      className="text-sm text-blue-500 hover:text-blue-700"
                    >
                      Detayları Gör
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detay Modal */}
        {selectedReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Rezervasyon Detayları</h2>
                  <button
                    onClick={() => setSelectedReservation(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Araç Bilgileri</h3>
                    <p className="text-gray-600">
                      {selectedReservation.carBrand} {selectedReservation.carModel}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Müşteri Bilgileri</h3>
                    <p className="text-gray-600">Ad Soyad: {selectedReservation.customerName}</p>
                    <p className="text-gray-600">Telefon: {selectedReservation.customerPhone}</p>
                    <p className="text-gray-600">E-posta: {selectedReservation.customerEmail}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Kiralama Bilgileri</h3>
                    <p className="text-gray-600">Başlangıç: {selectedReservation.startDate}</p>
                    <p className="text-gray-600">Bitiş: {selectedReservation.endDate}</p>
                    <p className="text-gray-600">Süre: {selectedReservation.totalDays} Gün</p>
                    <p className="text-gray-600">
                      Toplam Tutar: {selectedReservation.totalPrice.toLocaleString('tr-TR')} TL
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Durum</h3>
                    {getStatusBadge(selectedReservation.status)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Oluşturulma Tarihi</h3>
                    <p className="text-gray-600">{selectedReservation.createdAt}</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setSelectedReservation(null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Findeks Kontrol Modal */}
        {findeksModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Findeks Kontrolü</h2>
                  <button
                    onClick={() => setFindeksModal(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <IoShieldCheckmark className="text-purple-600" size={32} />
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {findeksModal.customerName}
                        </h3>
                        <p className="text-sm text-gray-600">{findeksModal.customerEmail}</p>
                      </div>
                    </div>
                    <div className="border-t border-purple-200 pt-3 mt-3">
                      <p className="text-sm text-gray-700">
                        <strong>Araç:</strong> {findeksModal.carBrand} {findeksModal.carModel}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Tutar:</strong> {findeksModal.totalPrice.toLocaleString('tr-TR')} TL
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>ℹ️ Bilgi:</strong> Findeks kontrolü müşterinin kredi notunu ve 
                      araç kiralama geçmişini değerlendirir. Minimum 1400 puan gereklidir.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setFindeksModal(null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    İptal
                  </button>
                  <button
                    onClick={() => handleFindeksCheck(findeksModal)}
                    className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    Kontrol Et
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

