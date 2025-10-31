"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (loginType === "email") {
      if (!formData.email) {
        newErrors.email = "Email gereklidir";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Geçerli bir email adresi giriniz";
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = "Telefon numarası gereklidir";
      } else if (
        !/^(\+90|0)?[5][0-9]{9}$/.test(formData.phone.replace(/\s/g, ""))
      ) {
        newErrors.phone =
          "Geçerli bir telefon numarası giriniz (örn: 0555 123 45 67)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Mock kullanıcı verisi oluştur
      const userData = {
        name:
          loginType === "email" ? formData.email.split("@")[0] : "Kullanıcı",
        email: loginType === "email" ? formData.email : "",
        phone: loginType === "phone" ? formData.phone : "",
        loginType: loginType,
      };

      // LocalStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(userData));

      // Başarılı giriş mesajı
      alert("Giriş başarılı! Hoş geldiniz.");

      // Ana sayfaya yönlendir
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-start py-16 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Araç Kiralama Giriş
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hesabınıza giriş yapın ve araç kiralamaya devam edin
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Giriş Yap</CardTitle>
            <CardDescription className="text-center">
              Email veya telefon numaranız ile giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Login Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Giriş Türü</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="email-login"
                      name="loginType"
                      value="email"
                      checked={loginType === "email"}
                      onChange={(e) =>
                        setLoginType(e.target.value as "email" | "phone")
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <Label
                      htmlFor="email-login"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Email ile giriş
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="phone-login"
                      name="loginType"
                      value="phone"
                      checked={loginType === "phone"}
                      onChange={(e) =>
                        setLoginType(e.target.value as "email" | "phone")
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <Label
                      htmlFor="phone-login"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Telefon ile giriş
                    </Label>
                  </div>
                </div>
              </div>

              {/* Email or Phone Input */}
              <div className="space-y-2">
                <Label htmlFor={loginType === "email" ? "email" : "phone"}>
                  {loginType === "email" ? "Email Adresi" : "Telefon Numarası"}
                </Label>
                {loginType === "email" ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                ) : (
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0555 123 45 67"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                )}
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Giriş Yap
              </Button>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Hesabınız yok mu?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Kayıt olun
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
