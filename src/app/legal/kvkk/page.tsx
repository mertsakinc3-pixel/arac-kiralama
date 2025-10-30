"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

const KVKKPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16"
      >
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/legal" className="inline-flex items-center gap-2 text-purple-100 hover:text-white mb-6 transition-colors">
            <IoArrowBack />
            Yasal Düzenlemeler
          </Link>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4"
          >
            KVKK Aydınlatma Metni
          </motion.h1>
          <p className="text-purple-100">6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>
          <p className="text-purple-100 mt-2">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>
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
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Veri Sorumlusu</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; 
              veri sorumlusu olarak Araç Kiralama tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-gray-700"><strong>Şirket Ünvanı:</strong> Araç Kiralama A.Ş.</p>
              <p className="text-gray-700"><strong>Adres:</strong> Atatürk Bulvarı No: 123, Çankaya, Ankara</p>
              <p className="text-gray-700"><strong>E-posta:</strong> kvkk@arackiralama.com</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. İşlenen Kişisel Veriler</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Araç kiralama hizmetimizi kullanırken aşağıdaki kişisel verileriniz işlenebilmektedir:
            </p>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-purple-500 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-2">Kimlik Bilgileri</h3>
                <p className="text-gray-600">Ad, soyad, TC kimlik numarası, doğum tarihi, pasaport bilgileri</p>
              </div>
              <div className="p-4 border-l-4 border-purple-500 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-2">İletişim Bilgileri</h3>
                <p className="text-gray-600">Telefon numarası, e-posta adresi, adres bilgileri</p>
              </div>
              <div className="p-4 border-l-4 border-purple-500 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-2">Ehliyet Bilgileri</h3>
                <p className="text-gray-600">Ehliyet numarası, ehliyet tarihi, ehliyet sınıfı</p>
              </div>
              <div className="p-4 border-l-4 border-purple-500 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-2">Finansal Bilgiler</h3>
                <p className="text-gray-600">Kredi kartı bilgileri, fatura bilgileri, ödeme geçmişi</p>
              </div>
              <div className="p-4 border-l-4 border-purple-500 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-2">İşlem Güvenliği Bilgileri</h3>
                <p className="text-gray-600">IP adresi, çerez kayıtları, güvenlik soruları</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Kişisel Verilerin İşlenme Amaçları</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Araç kiralama sözleşmesinin kurulması ve ifası</li>
              <li>Rezervasyon işlemlerinin gerçekleştirilmesi</li>
              <li>Müşteri ilişkileri yönetimi ve müşteri memnuniyetinin sağlanması</li>
              <li>Ödeme ve faturalandırma işlemlerinin yapılması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>İstatistiksel analiz ve raporlama faaliyetleri</li>
              <li>Pazarlama ve tanıtım faaliyetleri (açık rıza verilmesi halinde)</li>
              <li>Güvenlik ve dolandırıcılık önleme</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Kişisel Verilerin Aktarılması</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Anlaşmalı rent a car şirketlerine</li>
              <li>Ödeme kuruluşlarına ve bankalara</li>
              <li>Yasal yükümlülükler çerçevesinde kamu kurum ve kuruluşlarına</li>
              <li>Hizmet aldığımız tedarikçi ve iş ortaklarına</li>
              <li>Denetim ve danışmanlık hizmeti aldığımız kurumlara</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              aktarılabilmektedir. Kişisel verileriniz yurt dışına aktarılmadan önce KVKK'nın 9. maddesi 
              uyarınca gerekli tedbirler alınmaktadır.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kişisel verileriniz, elektronik ve fiziksel ortamda, web sitesi, mobil uygulama, çağrı merkezi, 
              e-posta, sosyal medya gibi kanallar aracılığıyla toplanmaktadır.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Sözleşmenin kurulması veya ifası için gerekli olması</li>
              <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması</li>
              <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması</li>
              <li>Açık rıza verilmesi</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              hukuki sebeplerine dayanılarak işlenmektedir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Kişisel Veri Sahibinin KVKK'nın 11. Maddesinde Sayılan Hakları</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              KVKK'nın 11. maddesi uyarınca, kişisel veri sahipleri olarak aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme, silme ve yok edilme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Başvuru Yöntemi</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yöntemlerle başvuruda bulunabilirsiniz:
            </p>
            <div className="p-4 bg-purple-50 rounded-lg space-y-2">
              <p className="text-gray-700"><strong>Yazılı Başvuru:</strong> Atatürk Bulvarı No: 123, Çankaya, Ankara adresine kimliğinizi tespit edici belgeler ile</p>
              <p className="text-gray-700"><strong>E-posta:</strong> kvkk@arackiralama.com adresine kayıtlı elektronik posta (KEP) adresi veya güvenli elektronik imza ile</p>
              <p className="text-gray-700"><strong>Başvuru Formu:</strong> Web sitemizde yer alan KVKK başvuru formunu doldurarak</p>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4">
              Başvurularınız, talebin niteliğine göre en geç 30 gün içinde ücretsiz olarak sonuçlandırılacaktır. 
              Ancak, işlemin ayrıca bir maliyeti gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafından 
              belirlenen tarifedeki ücret alınabilir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. İletişim</h2>
            <p className="text-gray-600 leading-relaxed">
              KVKK kapsamındaki haklarınız ve kişisel verilerinizin işlenmesi hakkında detaylı bilgi için:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700"><strong>KVKK E-posta:</strong> kvkk@arackiralama.com</p>
              <p className="text-gray-700"><strong>Genel E-posta:</strong> info@arackiralama.com</p>
              <p className="text-gray-700"><strong>Telefon:</strong> +90 555 123 45 67</p>
              <p className="text-gray-700"><strong>Adres:</strong> Atatürk Bulvarı No: 123, Çankaya, Ankara</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default KVKKPage;

