import Link from "next/link";

export default function CTASection() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 mt-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Hemen Araç Kiralamanın Tam Zamanı!</h2>
        <p className="text-lg mb-6 text-blue-100">
          Binlerce araç seçeneği, uygun fiyatlar ve güvenli kiralama deneyimi için bize katılın.
        </p>
        <Link
          href="/arac-kirala"
          className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg"
        >
          Araç Kirala
        </Link>
      </div>
    </div>
  );
}

