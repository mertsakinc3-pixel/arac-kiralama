export default function TrustSection() {
  return (
    <div className="w-full max-w-6xl px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Neden Bizi Seçmelisiniz?
        </h2>
        <p className="text-gray-600">Güvenli ve kaliteli hizmet garantisi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 7/24 Müşteri Desteği */}
        <div className="bg-[#2e3d54] rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">7/24 Müşteri Desteği</h3>
          <p className="text-white">
            Her an yanınızdayız. Sorularınız ve sorunlarınız için 7 gün 24 saat destek hattımız aktif.
          </p>
        </div>

        {/* Güvenli Ödeme */}
        <div className="bg-[#C8E6C9] rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-black mb-3">Güvenli Ödeme</h3>
          <p className="text-black">
            256-bit SSL sertifikası ile korunan ödeme sistemi. Kredi kartı bilgileriniz tamamen güvende.
          </p>
        </div>

        {/* Sigorta Dahil */}
        <div className="bg-[#e44900] rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-black mb-3">Sigorta Dahil</h3>
          <p className="text-black">
            Tüm araçlarımız kasko ve trafik sigortası ile korunmaktadır. Ek masraf yok, güvenle sürün.
          </p>
        </div>

        
      </div>
    </div>
  );
}

