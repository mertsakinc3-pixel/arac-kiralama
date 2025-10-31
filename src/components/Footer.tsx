"use client";

import Link from "next/link";
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5";
import { IoMailOutline, IoCallOutline, IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="hidden md:block bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Şirket Bilgileri */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Araç Kiralama</h3>
            <p className="text-sm mb-4">
              En uygun fiyatlarla, güvenilir ve kaliteli araç kiralama hizmeti sunuyoruz.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <IoLogoFacebook className="text-2xl" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <IoLogoTwitter className="text-2xl" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <IoLogoInstagram className="text-2xl" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <IoLogoLinkedin className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors text-sm">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/arac-kirala" className="hover:text-white transition-colors text-sm">
                  Araç Kirala
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white transition-colors text-sm">
                  Anlaşmalı Firmalar
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors text-sm">
                  Acil Durum Desteği
                </Link>
              </li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy" className="hover:text-white transition-colors text-sm">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-white transition-colors text-sm">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/legal/kvkk" className="hover:text-white transition-colors text-sm">
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link href="/legal/cancellation" className="hover:text-white transition-colors text-sm">
                  İptal ve İade Koşulları
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <IoLocationOutline className="text-xl mt-1 shrink-0" />
                <span className="text-sm">
                  Atatürk Bulvarı No: 123<br />
                  Çankaya, Ankara
                </span>
              </li>
              <li className="flex items-center gap-3">
                <IoCallOutline className="text-xl shrink-0" />
                <a href="tel:+905551234567" className="text-sm hover:text-white transition-colors">
                  +90 555 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IoMailOutline className="text-xl shrink-0" />
                <a href="mailto:info@arackiralama.com" className="text-sm hover:text-white transition-colors">
                  info@arackiralama.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Araç Kiralama. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

