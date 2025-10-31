"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoCall,
  IoMail,
  IoLocation,
  IoCheckmarkCircle,
  IoStar,
  IoCar,
  IoShield,
  IoTrophy,
  IoPeople,
  IoTrendingUp,
  IoDocumentText,
  IoBusinessOutline,
  IoTime,
  IoCard,
  IoGlobe,
} from "react-icons/io5";

// Anlaşmalı Rent-a-Car Şirketleri
const partners = [
  {
    id: "1",
    name: "Premium Rent A Car",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    location: "İstanbul, Ankara, İzmir",
    rating: 4.8,
    totalCars: 150,
    specialties: ["Lüks Araçlar", "VIP Transfer", "Uzun Dönem Kiralama"],
    discount: "15%",
    description:
      "Türkiye'nin önde gelen lüks araç kiralama şirketi. Kurumsal müşterilere özel fiyatlandırma.",
    phone: "+90 555 111 22 33",
    email: "info@premiumrentacar.com",
    website: "www.premiumrentacar.com",
    verified: true,
    featured: true,
  },
  {
    id: "2",
    name: "Ekonomik Araç Kiralama",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    location: "İstanbul, Bursa, Antalya",
    rating: 4.6,
    totalCars: 200,
    specialties: ["Ekonomik Araçlar", "Günlük Kiralama", "Havalimanı Transfer"],
    discount: "20%",
    description:
      "Uygun fiyatlı ve kaliteli hizmet. Öğrenci ve kurumsal müşterilere özel indirimler.",
    phone: "+90 555 222 33 44",
    email: "info@ekonomikrentacar.com",
    website: "www.ekonomikrentacar.com",
    verified: true,
    featured: false,
  },
  {
    id: "3",
    name: "Aile Araç Kiralama",
    logo: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=200&fit=crop",
    location: "Ankara, Konya, Eskişehir",
    rating: 4.7,
    totalCars: 120,
    specialties: ["Aile Araçları", "SUV", "Minivan"],
    discount: "10%",
    description: "Aileler için ideal araçlar. Geniş ve konforlu araç filosu.",
    phone: "+90 555 333 44 55",
    email: "info@ailerentacar.com",
    website: "www.ailerentacar.com",
    verified: true,
    featured: true,
  },
  {
    id: "4",
    name: "Spor Araç Kiralama",
    logo: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&h=200&fit=crop",
    location: "İstanbul, Bodrum, Antalya",
    rating: 4.9,
    totalCars: 80,
    specialties: ["Spor Araçlar", "Lüks SUV", "Cabrio"],
    discount: "12%",
    description: "Spor ve lüks araç tutkunları için özel koleksiyon.",
    phone: "+90 555 444 55 66",
    email: "info@sporrentacar.com",
    website: "www.sporrentacar.com",
    verified: true,
    featured: false,
  },
  {
    id: "5",
    name: "Ticari Araç Kiralama",
    logo: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&h=200&fit=crop",
    location: "İstanbul, Ankara, İzmir",
    rating: 4.5,
    totalCars: 180,
    specialties: ["Ticari Araçlar", "Kamyonet", "Panelvan"],
    discount: "18%",
    description: "İşletmeler için ticari araç kiralama çözümleri.",
    phone: "+90 555 555 66 77",
    email: "info@ticarirentacar.com",
    website: "www.ticarirentacar.com",
    verified: true,
    featured: false,
  },
  {
    id: "6",
    name: "Elektrikli Araç Kiralama",
    logo: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&h=200&fit=crop",
    location: "İstanbul, Ankara",
    rating: 4.8,
    totalCars: 60,
    specialties: ["Elektrikli Araçlar", "Hibrit Araçlar", "Çevre Dostu"],
    discount: "15%",
    description: "Çevre dostu elektrikli ve hibrit araç filosu.",
    phone: "+90 555 666 77 88",
    email: "info@elektrikrentacar.com",
    website: "www.elektrikrentacar.com",
    verified: true,
    featured: true,
  },
];

// Kurumsal Avantajlar
const corporateAdvantages = [
  {
    icon: IoTrendingUp,
    title: "Özel İndirimler",
    description: "Kurumsal müşterilere özel %10-25 arası indirim fırsatları",
  },
  {
    icon: IoShield,
    title: "Tam Sigorta",
    description: "Tüm araçlarda kasko ve trafik sigortası dahil",
  },
  {
    icon: IoTime,
    title: "7/24 Destek",
    description: "Acil durumlarda kesintisiz destek hizmeti",
  },
  {
    icon: IoCard,
    title: "Esnek Ödeme",
    description: "Kurumsal fatura ve vadeli ödeme seçenekleri",
  },
  {
    icon: IoPeople,
    title: "Özel Hesap Yöneticisi",
    description: "Size özel atanmış hesap yöneticisi",
  },
  {
    icon: IoDocumentText,
    title: "Kolay Sözleşme",
    description: "Hızlı ve kolay sözleşme süreçleri",
  },
];

export default function PartnersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showContactForm, setShowContactForm] = useState(false);

  const categories = [
    { id: "all", label: "Tümü" },
    { id: "luxury", label: "Lüks Araçlar" },
    { id: "economy", label: "Ekonomik" },
    { id: "family", label: "Aile Araçları" },
    { id: "sport", label: "Spor Araçlar" },
    { id: "commercial", label: "Ticari Araçlar" },
    { id: "electric", label: "Elektrikli" },
  ];

  const filteredPartners =
    selectedCategory === "all"
      ? partners
      : partners.filter((p) => {
          const categoryMap: Record<string, string[]> = {
            luxury: ["Lüks Araçlar", "VIP Transfer"],
            economy: ["Ekonomik Araçlar"],
            family: ["Aile Araçları", "SUV", "Minivan"],
            sport: ["Spor Araçlar", "Cabrio"],
            commercial: ["Ticari Araçlar", "Kamyonet"],
            electric: ["Elektrikli Araçlar", "Hibrit Araçlar"],
          };
          return p.specialties.some((s) =>
            categoryMap[selectedCategory]?.includes(s)
          );
        });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <IoBusinessOutline className="text-5xl" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Anlaşmalı Rent-a-Car Şirketleri
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
              Türkiye'nin en güvenilir araç kiralama şirketleriyle anlaşmalıyız.
              Kurumsal müşterilerimize özel avantajlar sunuyoruz.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <IoCheckmarkCircle className="text-green-300" size={24} />
                <span className="font-semibold">Doğrulanmış Şirketler</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <IoTrophy className="text-yellow-300" size={24} />
                <span className="font-semibold">En İyi Fiyat Garantisi</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <IoShield className="text-blue-300" size={24} />
                <span className="font-semibold">Güvenli İşlem</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kurumsal Avantajlar */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Kurumsal Müşterilerimize Özel Avantajlar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              İşletmeniz için en uygun araç kiralama çözümlerini sunuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corporateAdvantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Icon className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Kategori Filtreleri */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Listesi */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  partner.featured ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {/* Featured Badge */}
                {partner.featured && (
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2 font-semibold text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <IoTrophy size={18} />
                      <span>ÖNE ÇIKAN PARTNER</span>
                    </div>
                  </div>
                )}

                {/* Logo */}
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-cover"
                  />
                  {partner.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                      <IoCheckmarkCircle size={16} />
                      Doğrulanmış
                    </div>
                  )}
                  {partner.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-lg">
                      {partner.discount} İndirim
                    </div>
                  )}
                </div>

                {/* İçerik */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {partner.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <IoStar className="text-yellow-500" size={18} />
                      <span className="font-bold text-gray-800">
                        {partner.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <IoLocation size={18} />
                    <span className="text-sm">{partner.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <IoCar size={18} />
                    <span className="text-sm font-semibold">
                      {partner.totalCars} Araç
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {partner.description}
                  </p>

                  {/* Uzmanlık Alanları */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {partner.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* İletişim Bilgileri */}
                  <div className="space-y-2 mb-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <IoCall size={16} />
                      <span>{partner.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <IoMail size={16} />
                      <span className="truncate">{partner.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <IoGlobe size={16} />
                      <span className="truncate">{partner.website}</span>
                    </div>
                  </div>

                  {/* Butonlar */}
                  <div className="flex gap-2">
                    <Link href={`/arac-kirala`} className="flex-1">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Araçları Gör
                      </button>
                    </Link>
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <IoMail size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
