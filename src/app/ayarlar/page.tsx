"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Globe,
  Moon,
  Sun,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AyarlarPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications" | "preferences"
  >("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSaveProfile = () => {
    // Profil bilgilerini kaydet
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      alert("Profil bilgileriniz başarıyla güncellendi!");
    }
  };

  const handleChangePassword = () => {
    alert("Şifre değiştirme özelliği yakında eklenecek!");
  };

  const tabs = [
    { id: "profile", label: "Profil Bilgileri", icon: User },
    { id: "security", label: "Güvenlik", icon: Shield },
    { id: "notifications", label: "Bildirimler", icon: Bell },
    { id: "preferences", label: "Tercihler", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Ayarlar</h1>
          <p className="text-gray-600">
            Hesap bilgilerinizi ve tercihlerinizi yönetin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sol Menü */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sağ İçerik */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profil Bilgileri Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Profil Bilgileri
                  </h2>

                  <div className="space-y-6">
                    {/* Profil Fotoğrafı */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <Button variant="outline" className="mb-2">
                          Fotoğraf Yükle
                        </Button>
                        <p className="text-xs text-gray-500">
                          JPG, PNG veya GIF. Maksimum 2MB.
                        </p>
                      </div>
                    </div>

                    {/* Form Alanları */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Ad Soyad</Label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            id="name"
                            type="text"
                            value={user?.name || ""}
                            onChange={(e) =>
                              setUser({ ...user, name: e.target.value })
                            }
                            className="pl-10"
                            placeholder="Ad Soyad"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">E-posta</Label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            id="email"
                            type="email"
                            value={user?.email || ""}
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                            className="pl-10"
                            placeholder="E-posta"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <div className="relative">
                          <Phone
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            id="phone"
                            type="tel"
                            value={user?.phone || ""}
                            onChange={(e) =>
                              setUser({ ...user, phone: e.target.value })
                            }
                            className="pl-10"
                            placeholder="+90 5XX XXX XX XX"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="city">Şehir</Label>
                        <div className="relative">
                          <MapPin
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            id="city"
                            type="text"
                            value={user?.city || ""}
                            onChange={(e) =>
                              setUser({ ...user, city: e.target.value })
                            }
                            className="pl-10"
                            placeholder="Şehir"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Adres</Label>
                      <textarea
                        id="address"
                        value={user?.address || ""}
                        onChange={(e) =>
                          setUser({ ...user, address: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Adres bilgilerinizi girin"
                      />
                    </div>

                    <Button
                      onClick={handleSaveProfile}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="mr-2" size={18} />
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </div>
              )}

              {/* Güvenlik Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Güvenlik Ayarları
                  </h2>

                  <div className="space-y-6">
                    {/* Şifre Değiştir */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Şifre Değiştir
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="current-password">Mevcut Şifre</Label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="current-password"
                              type="password"
                              className="pl-10"
                              placeholder="Mevcut şifreniz"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="new-password">Yeni Şifre</Label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="new-password"
                              type="password"
                              className="pl-10"
                              placeholder="Yeni şifreniz"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="confirm-password">
                            Yeni Şifre (Tekrar)
                          </Label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="confirm-password"
                              type="password"
                              className="pl-10"
                              placeholder="Yeni şifrenizi tekrar girin"
                            />
                          </div>
                        </div>

                        <Button
                          onClick={handleChangePassword}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Şifreyi Güncelle
                        </Button>
                      </div>
                    </div>

                    {/* İki Faktörlü Doğrulama */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        İki Faktörlü Doğrulama
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Hesabınızı daha güvenli hale getirmek için iki faktörlü
                        doğrulamayı etkinleştirin.
                      </p>
                      <Button variant="outline">Etkinleştir</Button>
                    </div>

                    {/* Aktif Oturumlar */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Aktif Oturumlar
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">
                              Chrome - Windows
                            </p>
                            <p className="text-sm text-gray-600">
                              İstanbul, Türkiye • Şimdi aktif
                            </p>
                          </div>
                          <span className="text-xs text-green-600 font-semibold">
                            Mevcut Oturum
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bildirimler Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Bildirim Ayarları
                  </h2>

                  <div className="space-y-6">
                    {/* E-posta Bildirimleri */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            E-posta Bildirimleri
                          </h3>
                          <p className="text-sm text-gray-600">
                            Rezervasyon ve kampanya bildirimlerini e-posta ile
                            alın
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(e) =>
                              setEmailNotifications(e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="space-y-2 pl-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            defaultChecked
                          />
                          <span className="text-sm text-gray-700">
                            Rezervasyon onayları
                          </span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            defaultChecked
                          />
                          <span className="text-sm text-gray-700">
                            Rezervasyon hatırlatmaları
                          </span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">
                            Kampanya ve indirimler
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* SMS Bildirimleri */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            SMS Bildirimleri
                          </h3>
                          <p className="text-sm text-gray-600">
                            Önemli bildirimler için SMS alın
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={smsNotifications}
                            onChange={(e) =>
                              setSmsNotifications(e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Push Bildirimleri */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Push Bildirimleri
                          </h3>
                          <p className="text-sm text-gray-600">
                            Tarayıcı bildirimleri alın
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pushNotifications}
                            onChange={(e) =>
                              setPushNotifications(e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Save className="mr-2" size={18} />
                      Bildirim Ayarlarını Kaydet
                    </Button>
                  </div>
                </div>
              )}

              {/* Tercihler Tab */}
              {activeTab === "preferences" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Tercihler
                  </h2>

                  <div className="space-y-6">
                    {/* Dil Seçimi */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Dil
                      </h3>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="tr">Türkçe</option>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>

                    {/* Tema */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Tema
                      </h3>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setDarkMode(false)}
                          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            !darkMode
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Sun size={24} />
                          <span className="font-medium">Açık Tema</span>
                        </button>
                        <button
                          onClick={() => setDarkMode(true)}
                          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            darkMode
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Moon size={24} />
                          <span className="font-medium">Koyu Tema</span>
                        </button>
                      </div>
                    </div>

                    {/* Para Birimi */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Para Birimi
                      </h3>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="TRY">TRY (₺)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>

                    {/* Ödeme Yöntemleri */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Kayıtlı Kartlar
                        </h3>
                        <Button variant="outline" size="sm">
                          <CreditCard className="mr-2" size={16} />
                          Kart Ekle
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Henüz kayıtlı kartınız bulunmamaktadır.
                      </p>
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Save className="mr-2" size={18} />
                      Tercihleri Kaydet
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

