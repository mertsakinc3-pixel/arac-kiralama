import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hayalinizdeki Aracı Kiralayın
        </h1>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
          Güvenli, hızlı ve ekonomik araç kiralama deneyimi
        </p>
        <Link
          href="/arac-kirala"
          className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg"
        >
          Hemen Kirala
        </Link>
      </div>
    </div>
  );
}

