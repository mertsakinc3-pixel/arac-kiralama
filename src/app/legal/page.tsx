"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoDocumentTextOutline, IoShieldCheckmarkOutline, IoLockClosedOutline, IoReceiptOutline } from "react-icons/io5";

const LegalPage = () => {
  const legalPages = [
    {
      icon: IoShieldCheckmarkOutline,
      title: "Gizlilik Politikası",
      description: "Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi edinin.",
      href: "/legal/privacy",
      color: "blue",
    },
    {
      icon: IoDocumentTextOutline,
      title: "Kullanım Koşulları",
      description: "Platformumuzu kullanırken uymanız gereken kurallar ve koşullar.",
      href: "/legal/terms",
      color: "green",
    },
    {
      icon: IoLockClosedOutline,
      title: "KVKK Aydınlatma Metni",
      description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme.",
      href: "/legal/kvkk",
      color: "purple",
    },
    {
      icon: IoReceiptOutline,
      title: "İptal ve İade Koşulları",
      description: "Rezervasyon iptali ve iade işlemleri hakkında detaylı bilgiler.",
      href: "/legal/cancellation",
      color: "orange",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      hover: "hover:bg-blue-50",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      hover: "hover:bg-green-50",
      border: "border-green-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "hover:bg-purple-50",
      border: "border-purple-200",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      hover: "hover:bg-orange-50",
      border: "border-orange-200",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Yasal Düzenlemeler
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-center max-w-3xl mx-auto text-gray-300"
          >
            Şeffaflık ve güven ilkesiyle, tüm yasal düzenlemelerimizi sizlerle paylaşıyoruz.
          </motion.p>
        </div>
      </motion.section>

      {/* Legal Pages Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {legalPages.map((page, index) => {
            const Icon = page.icon;
            const colors = colorClasses[page.color as keyof typeof colorClasses];
            
            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={page.href}>
                  <div className={`bg-white rounded-xl shadow-lg p-8 border-2 ${colors.border} ${colors.hover} transition-all hover:shadow-xl cursor-pointer h-full`}>
                    <div className={`${colors.bg} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                      <Icon className={`text-4xl ${colors.text}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{page.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{page.description}</p>
                    <div className={`mt-6 ${colors.text} font-semibold flex items-center gap-2`}>
                      Detaylı Bilgi
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Önemli Bilgilendirme</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Bu sayfada yer alan tüm yasal metinler, şirketimizin güncel politikalarını ve yasal 
                yükümlülüklerini yansıtmaktadır. Hizmetlerimizi kullanmadan önce bu belgeleri dikkatlice 
                okumanızı öneririz.
              </p>
              <p>
                Yasal düzenlemelerimizde yapılacak değişiklikler bu sayfada yayınlanacak ve önemli 
                değişiklikler için kullanıcılarımız bilgilendirilecektir.
              </p>
              <p>
                Herhangi bir sorunuz veya öneriniz için{" "}
                <Link href="/contact" className="text-blue-600 hover:underline font-semibold">
                  bize ulaşabilirsiniz
                </Link>
                .
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Son güncelleme: {new Date().toLocaleDateString("tr-TR", { 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;

