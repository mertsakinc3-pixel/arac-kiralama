"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"
      >
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/legal" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors">
            <IoArrowBack />
            Yasal Düzenlemeler
          </Link>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4"
          >
            Gizlilik Politikası
          </motion.h1>
          <p className="text-blue-100">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>
        </div>
      </motion.section>

      {/* Content */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Giriş</h2>
            <p className="text-gray-600 leading-relaxed">
              Bu Gizlilik Politikası, Araç Kiralama platformunu kullanırken kişisel verilerinizin nasıl toplandığını, 
              kullanıldığını, saklandığını ve korunduğunu açıklamaktadır. Hizmetlerimizi kullanarak bu politikayı 
              kabul etmiş olursunuz.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Toplanan Bilgiler</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Platformumuzu kullanırken aşağıdaki bilgiler toplanabilir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li>
              <li>Kimlik bilgileri (TC Kimlik No, pasaport bilgileri)</li>
              <li>Ehliyet bilgileri</li>
              <li>Ödeme ve fatura bilgileri</li>
              <li>Rezervasyon geçmişi ve tercihleri</li>
              <li>Cihaz ve tarayıcı bilgileri</li>
              <li>IP adresi ve konum bilgileri</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Bilgilerin Kullanımı</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Toplanan bilgiler aşağıdaki amaçlarla kullanılır:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Araç kiralama hizmetinin sağlanması ve yönetimi</li>
              <li>Rezervasyon işlemlerinin gerçekleştirilmesi</li>
              <li>Müşteri desteği ve iletişim</li>
              <li>Ödeme işlemlerinin güvenli şekilde yapılması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Hizmet kalitesinin iyileştirilmesi</li>
              <li>Pazarlama ve tanıtım faaliyetleri (onay verilmesi halinde)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Bilgi Güvenliği</h2>
            <p className="text-gray-600 leading-relaxed">
              Kişisel verilerinizin güvenliği bizim için önceliklidir. Verilerinizi korumak için endüstri standardı 
              güvenlik önlemleri kullanıyoruz. SSL şifreleme, güvenli sunucular ve düzenli güvenlik denetimleri ile 
              verilerinizi korumaktayız.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Üçüncü Taraflarla Paylaşım</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kişisel bilgileriniz aşağıdaki durumlarda üçüncü taraflarla paylaşılabilir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Anlaşmalı rent a car şirketleri ile rezervasyon bilgileriniz</li>
              <li>Ödeme işlemleri için ödeme hizmet sağlayıcıları</li>
              <li>Yasal zorunluluklar gereği resmi kurumlar</li>
              <li>Hizmet sağlayıcılar (hosting, e-posta servisleri vb.)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Üçüncü taraflarla paylaşılan bilgiler, yalnızca belirtilen amaçlar doğrultusunda kullanılır ve 
              gizlilik standartlarına uygun şekilde korunur.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Çerezler (Cookies)</h2>
            <p className="text-gray-600 leading-relaxed">
              Web sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezler kullanır. 
              Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz. Ancak bu durumda 
              bazı site özelliklerinin düzgün çalışmayabileceğini unutmayın.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Haklarınız</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen verileriniz hakkında bilgi talep etme</li>
              <li>Verilerin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Verilerin eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme</li>
              <li>Verilerin silinmesini veya yok edilmesini isteme</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Değişiklikler</h2>
            <p className="text-gray-600 leading-relaxed">
              Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler yapıldığında kullanıcılarımız 
              bilgilendirilecektir. Güncel politikayı düzenli olarak kontrol etmenizi öneririz.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. İletişim</h2>
            <p className="text-gray-600 leading-relaxed">
              Gizlilik politikamız hakkında sorularınız veya talepleriniz için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700"><strong>E-posta:</strong> info@arackiralama.com</p>
              <p className="text-gray-700"><strong>Telefon:</strong> +90 555 123 45 67</p>
              <p className="text-gray-700"><strong>Adres:</strong> Atatürk Bulvarı No: 123, Çankaya, Ankara</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PrivacyPage;

