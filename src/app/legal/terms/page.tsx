"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16"
      >
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/legal" className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-6 transition-colors">
            <IoArrowBack />
            Yasal Düzenlemeler
          </Link>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4"
          >
            Kullanım Koşulları
          </motion.h1>
          <p className="text-green-100">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>
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
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Genel Hükümler</h2>
            <p className="text-gray-600 leading-relaxed">
              Bu kullanım koşulları, Araç Kiralama platformunu kullanan tüm kullanıcılar için geçerlidir. 
              Platformu kullanarak bu koşulları kabul etmiş sayılırsınız. Koşulları kabul etmiyorsanız, 
              lütfen platformu kullanmayınız.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Hizmet Tanımı</h2>
            <p className="text-gray-600 leading-relaxed">
              Araç Kiralama, kullanıcıların anlaşmalı rent a car şirketlerinden araç kiralayabilecekleri 
              bir rezervasyon platformudur. Platform, aracılık hizmeti sunmakta olup, araç kiralama sözleşmesi 
              doğrudan kullanıcı ile ilgili rent a car şirketi arasında yapılmaktadır.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Kullanıcı Yükümlülükleri</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Platformu kullanırken aşağıdaki kurallara uymayı kabul edersiniz:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>18 yaşından büyük ve geçerli bir ehliyete sahip olmak</li>
              <li>Doğru ve güncel bilgiler sağlamak</li>
              <li>Hesap güvenliğinizi korumak ve şifrenizi kimseyle paylaşmamak</li>
              <li>Platformu yasalara uygun şekilde kullanmak</li>
              <li>Diğer kullanıcıların haklarına saygı göstermek</li>
              <li>Rezervasyon yaptığınız araçları özenle kullanmak</li>
              <li>Kiralama süresi sonunda aracı zamanında ve temiz teslim etmek</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Rezervasyon ve Ödeme</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Rezervasyon işlemleri aşağıdaki şekilde gerçekleşir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Rezervasyon onayı e-posta ile gönderilir</li>
              <li>Ödeme güvenli ödeme sistemleri üzerinden yapılır</li>
              <li>Rezervasyon değişiklikleri için en az 24 saat önceden bildirim gerekir</li>
              <li>İptal koşulları için İptal ve İade Koşulları sayfasını inceleyiniz</li>
              <li>Fiyatlar güncel döviz kurlarına göre değişebilir</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Araç Teslim ve İade</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Araç teslim ve iade işlemleri:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Araç tesliminde kimlik ve ehliyet kontrolü yapılır</li>
              <li>Araç hasar tespiti yapılır ve tutanak tutulur</li>
              <li>Yakıt seviyesi not edilir</li>
              <li>İade sırasında araç kontrol edilir</li>
              <li>Geç iade durumunda ek ücret uygulanır</li>
              <li>Hasar tespit edilirse sigorta kapsamına göre işlem yapılır</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Sorumluluk ve Garanti</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Platform ve hizmet sağlayıcıların sorumlulukları:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Platform, aracılık hizmeti sunmakta olup araç kalitesinden sorumlu değildir</li>
              <li>Araç ile ilgili sorunlar doğrudan rent a car şirketi ile çözülür</li>
              <li>Platform, teknik aksaklıklardan kaynaklanan kayıplardan sorumlu tutulamaz</li>
              <li>Kullanıcılar, kiralama süresi boyunca araçtan sorumludur</li>
              <li>Trafik cezaları ve ihlalleri kullanıcıya aittir</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Fikri Mülkiyet Hakları</h2>
            <p className="text-gray-600 leading-relaxed">
              Platform üzerindeki tüm içerik, tasarım, logo, yazılım ve diğer materyaller Araç Kiralama'nın 
              mülkiyetindedir. İzinsiz kullanım, kopyalama veya dağıtım yasaktır ve yasal işlem gerektirir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Hesap Askıya Alma ve İptal</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Aşağıdaki durumlarda hesabınız askıya alınabilir veya iptal edilebilir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Kullanım koşullarının ihlali</li>
              <li>Yanlış veya yanıltıcı bilgi sağlanması</li>
              <li>Ödeme sorunları</li>
              <li>Diğer kullanıcılara zarar verici davranışlar</li>
              <li>Yasal olmayan faaliyetler</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Değişiklikler</h2>
            <p className="text-gray-600 leading-relaxed">
              Bu kullanım koşulları zaman zaman güncellenebilir. Önemli değişiklikler yapıldığında kullanıcılar 
              bilgilendirilecektir. Değişikliklerden sonra platformu kullanmaya devam etmeniz, yeni koşulları 
              kabul ettiğiniz anlamına gelir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">10. Uygulanacak Hukuk ve Uyuşmazlıklar</h2>
            <p className="text-gray-600 leading-relaxed">
              Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlıkların çözümünde 
              Ankara Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">11. İletişim</h2>
            <p className="text-gray-600 leading-relaxed">
              Kullanım koşulları hakkında sorularınız için:
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

export default TermsPage;

