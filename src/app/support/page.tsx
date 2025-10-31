"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IoCall,
  IoMail,
  IoLocation,
  IoWarning,
  IoShield,
  IoTime,
  IoCheckmarkCircle,
  IoCar,
  IoMedkit,
  IoFlash,
  IoConstruct,
  IoNavigate,
  IoDocument,
  IoInformationCircle,
  IoHeadset,
  IoAlertCircle,
  IoCarSport,
  IoHome,
  IoAirplane,
} from "react-icons/io5";

// Acil Durum Kategorileri
const emergencyCategories = [
  {
    id: "accident",
    icon: IoWarning,
    title: "Kaza Durumu",
    description: "Trafik kazası sonrası yapılması gerekenler",
    color: "red",
    urgent: true,
  },
  {
    id: "breakdown",
    icon: IoConstruct,
    title: "Araç Arızası",
    description: "Yolda kalan araç için yardım",
    color: "orange",
    urgent: true,
  },
  {
    id: "medical",
    icon: IoMedkit,
    title: "Sağlık Sorunu",
    description: "Acil sağlık durumları",
    color: "red",
    urgent: true,
  },
  {
    id: "replacement",
    icon: IoCarSport,
    title: "Acil Araç Değişimi",
    description: "Hızlı araç değişim talebi",
    color: "blue",
    urgent: false,
  },
  {
    id: "location",
    icon: IoNavigate,
    title: "Konum Desteği",
    description: "Kaybolma veya yol tarifi",
    color: "green",
    urgent: false,
  },
  {
    id: "document",
    icon: IoDocument,
    title: "Belge Sorunu",
    description: "Evrak ve belge ile ilgili sorunlar",
    color: "purple",
    urgent: false,
  },
];

// Acil Durum İletişim Bilgileri
const emergencyContacts = [
  {
    title: "7/24 Acil Yardım Hattı",
    phone: "0850 123 45 67",
    description: "Tüm acil durumlar için",
    icon: IoHeadset,
    priority: "high",
  },
  {
    title: "Kaza Bildirimi",
    phone: "0850 123 45 68",
    description: "Trafik kazaları için özel hat",
    icon: IoWarning,
    priority: "high",
  },
  {
    title: "Yol Yardım",
    phone: "0850 123 45 69",
    description: "Araç arızası ve yol yardımı",
    icon: IoConstruct,
    priority: "medium",
  },
  {
    title: "Müşteri Hizmetleri",
    phone: "0850 123 45 70",
    description: "Genel sorular ve destek",
    icon: IoInformationCircle,
    priority: "medium",
  },
];

// Acil Durum Adımları
const emergencySteps = {
  accident: [
    "Aracı güvenli bir yere çekin ve dörtlüleri yakın",
    "Yaralı varsa hemen 112'yi arayın",
    "Polis (155) ve trafik polisini arayın",
    "Acil yardım hattımızı (0850 123 45 68) arayın",
    "Kaza tutanağını mutlaka alın",
    "Fotoğraf çekin ve tanık bilgilerini kaydedin",
    "Sigorta şirketini bilgilendirin",
  ],
  breakdown: [
    "Aracı güvenli bir yere çekin",
    "Dörtlü flaşörleri yakın",
    "Reflektör ve üçgen işaret koyun",
    "Yol yardım hattımızı arayın (0850 123 45 69)",
    "Konumunuzu net olarak bildirin",
    "Araçta kalın ve güvende olun",
    "Yardım ekibimizi bekleyin",
  ],
  medical: [
    "Hemen 112 Acil Sağlık Hizmetlerini arayın",
    "Aracı güvenli bir yere çekin",
    "Mümkünse ilk yardım uygulayın",
    "Acil yardım hattımızı bilgilendirin",
    "Sakin kalın ve talimatları takip edin",
  ],
  replacement: [
    "Müşteri hizmetlerimizi arayın",
    "Mevcut durumu açıklayın",
    "Konum bilgilerinizi paylaşın",
    "Yedek araç talebinizi iletin",
    "Teslim detaylarını görüşün",
  ],
  location: [
    "Sakin kalın ve paniğe kapılmayın",
    "GPS'inizi kontrol edin",
    "Müşteri hizmetlerimizi arayın",
    "Çevredeki işaretleri tarif edin",
    "Yol tarifi alın",
  ],
  document: [
    "Müşteri hizmetlerimizi arayın",
    "Sorunun detaylarını açıklayın",
    "Gerekli belgeleri fotoğraflayın",
    "E-posta ile gönderin",
    "Çözüm için talimatları bekleyin",
  ],
};

// Hızlı Erişim Kartları
const quickAccessCards = [
  {
    icon: IoAirplane,
    title: "Havalimanı Acil Destek",
    description: "Havalimanında sorun yaşıyorsanız",
    phone: "0850 123 45 71",
    color: "blue",
  },
  {
    icon: IoHome,
    title: "Otel Teslimat",
    description: "Otelde araç teslimi için",
    phone: "0850 123 45 72",
    color: "green",
  },
  {
    icon: IoFlash,
    title: "Hızlı Kiralama",
    description: "Acil araç kiralama",
    phone: "0850 123 45 73",
    color: "orange",
  },
];

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showEmergencyCall, setShowEmergencyCall] = useState(false);

  const selectedSteps = selectedCategory ? emergencySteps[selectedCategory as keyof typeof emergencySteps] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Acil Durum Vurgusu */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4 animate-pulse">
              <IoWarning className="text-6xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Acil Durum Desteği
            </h1>
            <p className="text-xl text-red-100 mb-6 max-w-3xl mx-auto">
              7/24 yanınızdayız. Herhangi bir sorun yaşadığınızda hemen bize ulaşın.
            </p>
            
            {/* Acil Arama Butonu */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => setShowEmergencyCall(true)}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-xl hover:bg-red-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center gap-3 animate-bounce"
              >
                <IoCall size={28} />
                ACİL YARDIM HATTI: 0850 123 45 67
              </button>
              <p className="text-sm text-red-100">
                Tüm aramalar ücretsizdir ve anında yanıt verilir
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Acil İletişim Kartları */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Acil İletişim Hatları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => {
              const Icon = contact.icon;
              const bgColor = contact.priority === "high" 
                ? "from-red-500 to-red-600" 
                : "from-blue-500 to-blue-600";
              
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${bgColor} text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="text-3xl" />
                    <h3 className="font-bold text-lg">{contact.title}</h3>
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    {contact.description}
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="block bg-white text-gray-800 text-center py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <IoCall size={20} />
                      {contact.phone}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Acil Durum Kategorileri */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Hangi Konuda Yardıma İhtiyacınız Var?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              const colorClasses = {
                red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
                orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
                blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
                purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
              };

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`bg-gradient-to-br ${colorClasses[category.color as keyof typeof colorClasses]} text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-left ${
                    isSelected ? "ring-4 ring-white scale-105" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="text-4xl" />
                    {category.urgent && (
                      <span className="bg-white text-red-600 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <IoFlash size={12} />
                        ACİL
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{category.title}</h3>
                  <p className="text-white/90 text-sm">{category.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Seçilen Kategori İçin Adımlar */}
      {selectedCategory && (
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <IoAlertCircle className="text-blue-600 text-4xl" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {emergencyCategories.find(c => c.id === selectedCategory)?.title} - Yapılması Gerekenler
                </h2>
              </div>
              
              <div className="space-y-4">
                {selectedSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 font-medium pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <div className="flex items-center gap-3 text-blue-800">
                  <IoInformationCircle size={24} />
                  <p className="font-semibold">
                    Daha fazla yardım için 7/24 acil hattımızı arayabilirsiniz: 
                    <a href="tel:08501234567" className="ml-2 underline">0850 123 45 67</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hızlı Erişim Kartları */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Hızlı Erişim
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickAccessCards.map((card, index) => {
              const Icon = card.icon;
              const colorClasses = {
                blue: "from-blue-500 to-blue-600",
                green: "from-green-500 to-green-600",
                orange: "from-orange-500 to-orange-600",
              };

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${colorClasses[card.color as keyof typeof colorClasses]} text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  <Icon className="text-4xl mb-4" />
                  <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                  <p className="text-white/90 text-sm mb-4">{card.description}</p>
                  <a
                    href={`tel:${card.phone.replace(/\s/g, "")}`}
                    className="block bg-white text-gray-800 text-center py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <IoCall size={18} />
                      {card.phone}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SSS - Sık Sorulan Sorular */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Kaza yaptım, ne yapmalıyım?",
                a: "Öncelikle sakin olun. Aracı güvenli bir yere çekin, yaralı varsa 112'yi arayın, ardından polis (155) ve bizim acil hattımızı (0850 123 45 68) arayın. Kaza tutanağı almayı unutmayın.",
              },
              {
                q: "Yolda kaldım, yardım ne kadar sürede gelir?",
                a: "Konumunuza göre değişmekle birlikte, şehir içinde ortalama 30-45 dakika, şehir dışında 1-2 saat içinde yardım ekibimiz yanınızda olur.",
              },
              {
                q: "Acil durum hizmetleri ücretli mi?",
                a: "Hayır, kiralama paketinize dahil olan acil yardım hizmetleri tamamen ücretsizdir. Sadece bazı özel durumlar için ek ücret talep edilebilir.",
              },
              {
                q: "Yurt dışında sorun yaşarsam ne yapmalıyım?",
                a: "Yurt dışı acil destek hattımızı (+90 850 123 45 67) arayın. 7/24 Türkçe destek alabilirsiniz.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              >
                <summary className="font-bold text-gray-800 cursor-pointer flex items-center gap-3">
                  <IoCheckmarkCircle className="text-green-500" size={24} />
                  {faq.q}
                </summary>
                <p className="text-gray-600 mt-4 ml-9">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Önemli Bilgiler */}
      <div className="py-12 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <IoShield className="text-4xl" />
              <h2 className="text-2xl font-bold">Güvenliğiniz Önceliğimiz</h2>
            </div>
            <div className="space-y-4 text-white/90">
              <div className="flex items-start gap-3">
                <IoCheckmarkCircle className="text-green-300 shrink-0 mt-1" size={24} />
                <p>Tüm araçlarımız düzenli bakımdan geçer ve tam kapsamlı sigortalıdır</p>
              </div>
              <div className="flex items-start gap-3">
                <IoCheckmarkCircle className="text-green-300 shrink-0 mt-1" size={24} />
                <p>7/24 acil yardım ekibimiz her zaman ulaşılabilir durumdadır</p>
              </div>
              <div className="flex items-start gap-3">
                <IoCheckmarkCircle className="text-green-300 shrink-0 mt-1" size={24} />
                <p>Yol yardım hizmetimiz Türkiye genelinde geçerlidir</p>
              </div>
              <div className="flex items-start gap-3">
                <IoCheckmarkCircle className="text-green-300 shrink-0 mt-1" size={24} />
                <p>Acil durumlarda yedek araç temin edilir</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bilgi - Diğer Sayfalar */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Daha Fazla Bilgi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/arac-kirala">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center">
                <IoCar className="text-blue-600 text-4xl mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Araç Kirala</h3>
                <p className="text-gray-600 text-sm">Geniş araç filomuzdan seçim yapın</p>
              </div>
            </Link>
            <Link href="/contact">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center">
                <IoMail className="text-green-600 text-4xl mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">İletişim</h3>
                <p className="text-gray-600 text-sm">Bize ulaşın, size yardımcı olalım</p>
              </div>
            </Link>
            <Link href="/about">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center">
                <IoInformationCircle className="text-purple-600 text-4xl mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Hakkımızda</h3>
                <p className="text-gray-600 text-sm">Bizi daha yakından tanıyın</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Acil Arama Modal */}
      {showEmergencyCall && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowEmergencyCall(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
            
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoCall className="text-red-600 text-4xl animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Acil Yardım Hattı
              </h3>
              <p className="text-gray-600 mb-6">
                7/24 size yardımcı olmak için buradayız
              </p>
              
              <a
                href="tel:08501234567"
                className="block bg-red-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-red-700 transition-colors mb-3"
              >
                0850 123 45 67
              </a>
              
              <p className="text-sm text-gray-500">
                Arama ücretsizdir ve anında yanıt verilir
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

