"use client";

import { motion } from "framer-motion";
import { IoCarSportOutline, IoShieldCheckmarkOutline, IoPeopleOutline, IoTrophyOutline } from "react-icons/io5";

const AboutPage = () => {
  const features = [
    {
      icon: IoCarSportOutline,
      title: "Geniş Araç Filosu",
      description: "Ekonomik araçlardan lüks segmente kadar geniş araç seçenekleri",
    },
    {
      icon: IoShieldCheckmarkOutline,
      title: "Güvenilir Hizmet",
      description: "7/24 müşteri desteği ve kapsamlı sigorta seçenekleri",
    },
    {
      icon: IoPeopleOutline,
      title: "Müşteri Memnuniyeti",
      description: "Binlerce mutlu müşteri ve yüksek memnuniyet oranı",
    },
    {
      icon: IoTrophyOutline,
      title: "Sektör Lideri",
      description: "15 yıllık tecrübe ve sektörde öncü konumumuz",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Mutlu Müşteri" },
    { number: "500+", label: "Araç Filosu" },
    { number: "15+", label: "Yıllık Tecrübe" },
    { number: "24/7", label: "Destek Hizmeti" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Hakkımızda
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-center max-w-3xl mx-auto text-blue-100"
          >
            Türkiye&apos;nin en güvenilir araç kiralama platformu olarak, size en iyi hizmeti sunmak için çalışıyoruz.
          </motion.p>
        </div>
      </motion.section>

      {/* Story Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Hikayemiz</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              2009 yılında kurulan şirketimiz, araç kiralama sektöründe müşteri memnuniyetini ön planda tutan 
              yaklaşımıyla hızla büyüdü. Bugün Türkiye&apos;nin dört bir yanında hizmet veren, 500&apos;den fazla araçlık 
              filosuyla sektörün önde gelen firmalarından biri haline geldik.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Misyonumuz, müşterilerimize en uygun fiyatlarla, en kaliteli ve güvenilir araç kiralama hizmetini 
              sunmaktır. Vizyonumuz ise, teknoloji ve müşteri odaklı yaklaşımımızla sektörün lider markası olmaktır.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Değerlerimiz</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-200 mt-1">✓</span>
                <span>Müşteri memnuniyeti odaklı hizmet anlayışı</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-200 mt-1">✓</span>
                <span>Şeffaf ve dürüst iletişim</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-200 mt-1">✓</span>
                <span>Sürekli gelişim ve yenilikçilik</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-200 mt-1">✓</span>
                <span>Kalite ve güvenilirlik standartları</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-200 mt-1">✓</span>
                <span>Çevre ve toplum bilinci</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Rakamlarla Biz</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Neden Bizi Seçmelisiniz?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Hemen Araç Kiralamanın Keyfini Çıkarın</h2>
          <p className="text-xl mb-8 text-blue-100">
            Geniş araç filomuzdan size en uygun aracı seçin ve yolculuğunuza başlayın.
          </p>
          <a
            href="/arac-kirala"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Araç Kirala
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

