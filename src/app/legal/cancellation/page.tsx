"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const CancellationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16"
      >
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/legal" className="inline-flex items-center gap-2 text-orange-100 hover:text-white mb-6 transition-colors">
            <IoArrowBack />
            Yasal Düzenlemeler
          </Link>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4"
          >
            İptal ve İade Koşulları
          </motion.h1>
          <p className="text-orange-100">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>
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
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Genel Bilgiler</h2>
            <p className="text-gray-600 leading-relaxed">
              Bu sayfa, Araç Kiralama platformu üzerinden yapılan rezervasyonların iptal ve iade koşullarını 
              açıklamaktadır. Rezervasyon yapmadan önce bu koşulları dikkatlice okumanızı öneririz.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. İptal Koşulları</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rezervasyonunuzu iptal etmek istediğinizde aşağıdaki koşullar geçerlidir:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <IoCheckmarkCircle className="text-2xl text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">24 Saat ve Öncesi - Ücretsiz İptal</h3>
                    <p className="text-gray-600">
                      Araç teslim tarihinden 24 saat veya daha fazla süre öncesinde yapılan iptallerde 
                      herhangi bir ücret alınmaz ve ödemenizin tamamı iade edilir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <IoCheckmarkCircle className="text-2xl text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">12-24 Saat Arası - %25 Kesinti</h3>
                    <p className="text-gray-600">
                      Araç teslim tarihinden 12-24 saat öncesinde yapılan iptallerde toplam tutarın 
                      %25'i kesinti olarak alınır, kalan %75'i iade edilir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <IoCheckmarkCircle className="text-2xl text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">6-12 Saat Arası - %50 Kesinti</h3>
                    <p className="text-gray-600">
                      Araç teslim tarihinden 6-12 saat öncesinde yapılan iptallerde toplam tutarın 
                      %50'si kesinti olarak alınır, kalan %50'si iade edilir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <IoCloseCircle className="text-2xl text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">6 Saatten Az - İade Yok</h3>
                    <p className="text-gray-600">
                      Araç teslim tarihinden 6 saatten daha az süre kala yapılan iptallerde ve 
                      rezervasyona gelmeme (no-show) durumlarında iade yapılmaz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. İptal İşlemi Nasıl Yapılır?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Rezervasyonunuzu iptal etmek için aşağıdaki yöntemleri kullanabilirsiniz:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Hesabınıza giriş yaparak "Rezervasyonlarım" bölümünden iptal butonu ile</li>
              <li>Rezervasyon onay e-postasındaki iptal linki ile</li>
              <li>Müşteri hizmetlerimizi arayarak: +90 555 123 45 67</li>
              <li>E-posta göndererek: info@arackiralama.com</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-900 font-semibold">
                💡 İpucu: İptal işleminizin onaylandığına dair e-posta ve SMS bildirimi alacaksınız.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. İade Süreci</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              İade işlemleri aşağıdaki şekilde gerçekleşir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>İade talebi onaylandıktan sonra 5-10 iş günü içinde hesabınıza iade yapılır</li>
              <li>Kredi kartı ile yapılan ödemelerde iade kredi kartınıza yapılır</li>
              <li>Havale/EFT ile yapılan ödemelerde belirttiğiniz hesaba iade yapılır</li>
              <li>İade işlemi tamamlandığında e-posta ile bilgilendirilirsiniz</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Rezervasyon Değişiklikleri</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Rezervasyonunuzda değişiklik yapmak istiyorsanız:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Tarih değişikliği: Araç müsaitliğine göre ücretsiz değişiklik yapılabilir</li>
              <li>Araç değişikliği: Fiyat farkı varsa ek ödeme veya iade yapılır</li>
              <li>Lokasyon değişikliği: Müsaitlik durumuna göre değişiklik yapılabilir</li>
              <li>Değişiklik taleplerinizi en az 12 saat önceden bildirmeniz gerekmektedir</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Özel Durumlar</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Aşağıdaki durumlarda özel iptal koşulları uygulanabilir:
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Sağlık Sorunları</h3>
                <p className="text-gray-600">
                  Doktor raporu ile belgelendirilen ciddi sağlık sorunları durumunda özel değerlendirme yapılır.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Doğal Afetler ve Mücbir Sebepler</h3>
                <p className="text-gray-600">
                  Doğal afet, savaş, terör olayları gibi mücbir sebeplerde tam iade yapılır.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Araç Müsaitliği</h3>
                <p className="text-gray-600">
                  Rent a car şirketinden kaynaklanan araç temin edilememesi durumunda tam iade yapılır.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Erken İade</h2>
            <p className="text-gray-600 leading-relaxed">
              Kiralama süresini tamamlamadan aracı erken iade etmeniz durumunda, kullanılmayan günler için 
              iade yapılmaz. Ancak, mücbir sebep durumlarında özel değerlendirme yapılabilir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Geç İade ve Ek Ücretler</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Aracı belirlenen sürede iade etmemeniz durumunda:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>İlk 1 saat için günlük kiranın %10'u kadar ek ücret alınır</li>
              <li>1-3 saat gecikmede günlük kiranın %25'i kadar ek ücret alınır</li>
              <li>3 saatten fazla gecikmede tam gün ücreti alınır</li>
              <li>Önceden haber verilmesi durumunda ek ücretlerde indirim yapılabilir</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Hasar ve Kayıp Durumları</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Araçta hasar veya kayıp tespit edilmesi durumunda:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Sigorta kapsamındaki hasarlar sigorta şirketi tarafından karşılanır</li>
              <li>Sigorta dışı hasarlar kiracı tarafından karşılanır</li>
              <li>Depozito, hasar bedeli karşılanana kadar iade edilmez</li>
              <li>Hasar durumunda kaza tespit tutanağı ve ilgili belgeler gereklidir</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">10. İletişim</h2>
            <p className="text-gray-600 leading-relaxed">
              İptal ve iade işlemleri hakkında sorularınız için:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700"><strong>Müşteri Hizmetleri:</strong> +90 555 123 45 67</p>
              <p className="text-gray-700"><strong>E-posta:</strong> info@arackiralama.com</p>
              <p className="text-gray-700"><strong>WhatsApp:</strong> +90 555 123 45 67</p>
              <p className="text-gray-700"><strong>Çalışma Saatleri:</strong> Pazartesi - Pazar: 08:00 - 22:00</p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="font-bold text-orange-900 mb-3 text-lg">⚠️ Önemli Hatırlatma</h3>
            <p className="text-orange-800">
              İptal ve iade koşulları, rezervasyon yaptığınız rent a car şirketinin politikalarına göre 
              değişiklik gösterebilir. Rezervasyon yaparken lütfen özel koşulları kontrol ediniz.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CancellationPage;

