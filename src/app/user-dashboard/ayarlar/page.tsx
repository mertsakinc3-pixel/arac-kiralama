/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
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

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const tabs = [
    { id: "profile", label: "Profil Bilgileri", icon: User },
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
                    {/* Form Alanları */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Ad</Label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            id="firstName"
                            type="text"
                            value={user?.firstName || ""}
                            onChange={(e) =>
                              setUser({ ...user, firstName: e.target.value })
                            }
                            className="pl-10"
                            placeholder="Adınız"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="lastName">Soyad</Label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            id="lastName"
                            type="text"
                            value={user?.lastName || ""}
                            onChange={(e) =>
                              setUser({ ...user, lastName: e.target.value })
                            }
                            className="pl-10"
                            placeholder="Soyadınız"
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

              {/* Tercihler Tab */}
              {activeTab === "preferences" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Tercihler
                  </h2>

                  <div className="space-y-6">
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
