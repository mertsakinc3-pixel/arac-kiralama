"use client";

import { useState } from "react";
import {
  IoCarSport,
  IoCalendar,
  IoLocation,
  IoTime,
  IoCard,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoQrCode,
  IoCall,
  IoMail,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock rezervasyon verileri
interface Reservation {
  id: string;
  carBrand: string;
  carModel: string;
  carImage: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  status: "active" | "completed" | "cancelled" | "upcoming";
  rentalCompany: string;
  companyPhone: string;
  companyEmail: string;
  paymentStatus: "paid" | "pending" | "refunded";
  bookingDate: string;
  insuranceType?: string;
  additionalServices?: string[];
  qrCode?: string;
}

const mockReservations: Reservation[] = [
  {
    id: "RES001",
    carBrand: "BMW",
    carModel: "3 Serisi",
    carImage:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    startDate: "2025-11-05",
    endDate: "2025-11-08",
    pickupLocation: "İstanbul, Beşiktaş",
    dropoffLocation: "İstanbul, Beşiktaş",
    totalPrice: 1350,
    status: "upcoming",
    rentalCompany: "Premium Kiralama",
    companyPhone: "+90 555 123 4567",
    companyEmail: "info@premiumkiralama.com",
    paymentStatus: "paid",
    bookingDate: "2025-10-28",
    insuranceType: "Tam Kasko",
    additionalServices: ["GPS", "Bebek Koltuğu"],
    qrCode: "QR-BMW-001",
  },
  {
    id: "RES002",
    carBrand: "Mercedes",
    carModel: "C-Class",
    carImage:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    startDate: "2025-10-25",
    endDate: "2025-10-28",
    pickupLocation: "Ankara, Çankaya",
    dropoffLocation: "Ankara, Çankaya",
    totalPrice: 1560,
    status: "active",
    rentalCompany: "Luxury Car Rental",
    companyPhone: "+90 555 987 6543",
    companyEmail: "info@luxurycar.com",
    paymentStatus: "paid",
    bookingDate: "2025-10-20",
    insuranceType: "Tam Kasko",
    additionalServices: ["GPS", "Ek Sürücü"],
    qrCode: "QR-MERC-002",
  },
  {
    id: "RES003",
    carBrand: "Audi",
    carModel: "A4",
    carImage:
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop",
    startDate: "2025-09-15",
    endDate: "2025-09-20",
    pickupLocation: "İzmir, Konak",
    dropoffLocation: "İzmir, Konak",
    totalPrice: 2400,
    status: "completed",
    rentalCompany: "GreenDrive",
    companyPhone: "+90 555 456 7890",
    companyEmail: "info@greendrive.com",
    paymentStatus: "paid",
    bookingDate: "2025-09-10",
    insuranceType: "Kısmi Kasko",
    additionalServices: ["GPS"],
  },
  {
    id: "RES004",
    carBrand: "Volkswagen",
    carModel: "Golf",
    carImage:
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
    startDate: "2025-08-10",
    endDate: "2025-08-12",
    pickupLocation: "Bursa, Osmangazi",
    dropoffLocation: "Bursa, Osmangazi",
    totalPrice: 640,
    status: "cancelled",
    rentalCompany: "Budget Rent a Car",
    companyPhone: "+90 555 321 9876",
    companyEmail: "info@budgetrent.com",
    paymentStatus: "refunded",
    bookingDate: "2025-08-05",
  },
];

export default function RezervasyonlarimPage() {
  const [selectedTab, setSelectedTab] = useState<
    "all" | "active" | "upcoming" | "completed" | "cancelled"
  >("all");
  const [expandedReservation, setExpandedReservation] = useState<string | null>(
    null
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif Kiralama";
      case "upcoming":
        return "Yaklaşan";
      case "completed":
        return "Tamamlandı";
      case "cancelled":
        return "İptal Edildi";
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "refunded":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Ödendi";
      case "pending":
        return "Beklemede";
      case "refunded":
        return "İade Edildi";
      default:
        return status;
    }
  };

  const filteredReservations = mockReservations.filter((res) => {
    if (selectedTab === "all") return true;
    return res.status === selectedTab;
  });

  const toggleExpand = (id: string) => {
    setExpandedReservation(expandedReservation === id ? null : id);
  };

  const handleShowQR = (qrCode: string) => {
    alert(`QR Kod: ${qrCode}\n\nBu kodu araç tesliminde gösteriniz.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Rezervasyonlarım
          </h1>
          <p className="text-gray-600">
            Tüm rezervasyonlarınızı buradan görüntüleyebilir ve yönetebilirsiniz
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {mockReservations.length}
                </p>
                <p className="text-sm text-gray-600">Toplam</p>
              </div>
              <IoCarSport className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {
                    mockReservations.filter((r) => r.status === "active").length
                  }
                </p>
                <p className="text-sm text-gray-600">Aktif</p>
              </div>
              <IoCheckmarkCircle className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {
                    mockReservations.filter((r) => r.status === "upcoming")
                      .length
                  }
                </p>
                <p className="text-sm text-gray-600">Yaklaşan</p>
              </div>
              <IoCalendar className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {
                    mockReservations.filter((r) => r.status === "completed")
                      .length
                  }
                </p>
                <p className="text-sm text-gray-600">Tamamlanan</p>
              </div>
              <IoTime className="text-gray-600" size={32} />
            </div>
          </div>
        </div>

        {/* Filtre Tabları */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setSelectedTab("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTab === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tümü ({mockReservations.length})
            </button>
            <button
              onClick={() => setSelectedTab("active")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTab === "active"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Aktif (
              {mockReservations.filter((r) => r.status === "active").length})
            </button>
            <button
              onClick={() => setSelectedTab("upcoming")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTab === "upcoming"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Yaklaşan (
              {mockReservations.filter((r) => r.status === "upcoming").length})
            </button>
            <button
              onClick={() => setSelectedTab("completed")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTab === "completed"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tamamlanan (
              {mockReservations.filter((r) => r.status === "completed").length})
            </button>
            <button
              onClick={() => setSelectedTab("cancelled")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTab === "cancelled"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              İptal Edilenler (
              {mockReservations.filter((r) => r.status === "cancelled").length})
            </button>
          </div>
        </div>

        {/* Rezervasyon Listesi */}
        {filteredReservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <IoCarSport className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Rezervasyon Bulunamadı
            </h3>
            <p className="text-gray-500 mb-6">
              Bu kategoride henüz bir rezervasyonunuz yok.
            </p>
            <Link href="/arac-kirala">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Araç Kirala
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Rezervasyon Özet Kartı */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Araç Görseli */}
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={reservation.carImage}
                        alt={`${reservation.carBrand} ${reservation.carModel}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Rezervasyon Bilgileri */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {reservation.carBrand} {reservation.carModel}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {reservation.rentalCompany}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          {getStatusText(reservation.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                          <IoCalendar
                            className="text-gray-500 mt-0.5"
                            size={18}
                          />
                          <div>
                            <p className="text-xs text-gray-500">
                              Kiralama Tarihi
                            </p>
                            <p className="text-sm font-medium text-gray-800">
                              {new Date(
                                reservation.startDate
                              ).toLocaleDateString("tr-TR")}
                              {" - "}
                              {new Date(reservation.endDate).toLocaleDateString(
                                "tr-TR"
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <IoLocation
                            className="text-gray-500 mt-0.5"
                            size={18}
                          />
                          <div>
                            <p className="text-xs text-gray-500">
                              Teslim Alma Yeri
                            </p>
                            <p className="text-sm font-medium text-gray-800">
                              {reservation.pickupLocation}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <IoCard className="text-gray-500 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-gray-500">
                              Ödeme Durumu
                            </p>
                            <p
                              className={`text-sm font-semibold ${getPaymentStatusColor(
                                reservation.paymentStatus
                              )}`}
                            >
                              {getPaymentStatusText(reservation.paymentStatus)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <IoCard className="text-gray-500 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-gray-500">
                              Toplam Tutar
                            </p>
                            <p className="text-lg font-bold text-blue-600">
                              {reservation.totalPrice} TL
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Aksiyon Butonları */}
                      <div className="flex flex-wrap gap-2">
                        {reservation.status === "active" ||
                        reservation.status === "upcoming" ? (
                          <>
                            {reservation.qrCode && (
                              <Button
                                onClick={() =>
                                  handleShowQR(reservation.qrCode!)
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-sm"
                              >
                                <IoQrCode className="mr-2" size={18} />
                                QR Kodu Göster
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              className="text-sm"
                              onClick={() => toggleExpand(reservation.id)}
                            >
                              {expandedReservation === reservation.id ? (
                                <>
                                  <IoChevronUp className="mr-2" size={18} />
                                  Detayları Gizle
                                </>
                              ) : (
                                <>
                                  <IoChevronDown className="mr-2" size={18} />
                                  Detayları Göster
                                </>
                              )}
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            className="text-sm"
                            onClick={() => toggleExpand(reservation.id)}
                          >
                            {expandedReservation === reservation.id ? (
                              <>
                                <IoChevronUp className="mr-2" size={18} />
                                Detayları Gizle
                              </>
                            ) : (
                              <>
                                <IoChevronDown className="mr-2" size={18} />
                                Detayları Göster
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Genişletilmiş Detaylar */}
                {expandedReservation === reservation.id && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Sol Kolon */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Rezervasyon Bilgileri
                          </h4>
                          <div className="bg-white rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Rezervasyon No:
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                {reservation.id}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Rezervasyon Tarihi:
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                {new Date(
                                  reservation.bookingDate
                                ).toLocaleDateString("tr-TR")}
                              </span>
                            </div>
                            {reservation.insuranceType && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                  Sigorta:
                                </span>
                                <span className="text-sm font-medium text-gray-800">
                                  {reservation.insuranceType}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {reservation.additionalServices &&
                          reservation.additionalServices.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                Ek Hizmetler
                              </h4>
                              <div className="bg-white rounded-lg p-4">
                                <ul className="space-y-1">
                                  {reservation.additionalServices.map(
                                    (service, index) => (
                                      <li
                                        key={index}
                                        className="text-sm text-gray-700 flex items-center gap-2"
                                      >
                                        <IoCheckmarkCircle className="text-green-600" />
                                        {service}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          )}
                      </div>

                      {/* Sağ Kolon */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Kiralama Şirketi İletişim
                          </h4>
                          <div className="bg-white rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2">
                              <IoCall className="text-blue-600" size={18} />
                              <a
                                href={`tel:${reservation.companyPhone}`}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {reservation.companyPhone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <IoMail className="text-blue-600" size={18} />
                              <a
                                href={`mailto:${reservation.companyEmail}`}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {reservation.companyEmail}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Teslim Bilgileri
                          </h4>
                          <div className="bg-white rounded-lg p-4 space-y-2">
                            <div>
                              <p className="text-xs text-gray-500">
                                Teslim Alma
                              </p>
                              <p className="text-sm font-medium text-gray-800">
                                {reservation.pickupLocation}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Teslim Etme
                              </p>
                              <p className="text-sm font-medium text-gray-800">
                                {reservation.dropoffLocation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* İptal Butonu (sadece upcoming için) */}
                    {reservation.status === "upcoming" && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <IoCloseCircle className="mr-2" size={18} />
                          Rezervasyonu İptal Et
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

