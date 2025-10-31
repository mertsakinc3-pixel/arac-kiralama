'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    phone2: '',
    userType: 'customer',
    companyName: '',
    companyAddress: '',
    taxNumber: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      userType: value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
    }

    if (formData.userType === 'rentacar_owner') {
      if (!formData.password) {
        newErrors.password = 'Şifre gereklidir';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Şifre en az 6 karakter olmalıdır';
      }
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefon numarası gereklidir';
    }

    if (formData.userType === 'customer') {
      if (!formData.firstName) {
        newErrors.firstName = 'Ad gereklidir';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Soyad gereklidir';
      }
    }

    if (formData.userType === 'rentacar_owner') {
      if (!formData.companyName) {
        newErrors.companyName = 'Şirket adı gereklidir';
      }
      if (!formData.companyAddress) {
        newErrors.companyAddress = 'Şirket adresi gereklidir';
      }
      if (!formData.taxNumber) {
        newErrors.taxNumber = 'Vergi numarası gereklidir';
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
        name: formData.userType === 'customer' 
          ? `${formData.firstName} ${formData.lastName}` 
          : formData.companyName,
        email: formData.email,
        phone: formData.phone,
        userType: formData.userType,
      };

      // LocalStorage'a kaydet
      localStorage.setItem('user', JSON.stringify(userData));

      // Başarılı kayıt mesajı
      alert('Kayıt başarılı! Hoş geldiniz.');

      // Ana sayfaya yönlendir
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradrdntnt-to-br from-blue-50 to-indigo-100 flex flex-col justify-start py-16 sm:px-8 lg:px-12">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <h1 className="text-4xl font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
            KiralamaYeri
          </h1>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Araç Kiralama Kayıt
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hesabınızı oluşturun ve araç kiralamaya başlayın
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Kayıt Ol</CardTitle>
            <CardDescription className="text-center">
              Bilgilerinizi girin ve hesabınızı oluşturun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* User Type */}
              <div className="space-y-2">
                <Label htmlFor="userType">Kullanıcı Tipi</Label>
                <Select value={formData.userType} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kullanıcı tipini seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Müşteri</SelectItem>
                    <SelectItem value="rentacar_owner">Rent a Car Sahibi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Fields */}
              <AnimatePresence>
                {formData.userType === 'customer' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <h3 className="text-sm font-semibold text-green-800">
                          Müşteri Bilgileri
                        </h3>
                      </div>

                      {/* First Name */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Ad</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Adınızı giriniz"
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-600">{errors.firstName}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Soyad</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Soyadınızı giriniz"
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-600">{errors.lastName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@example.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon Numarası</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0555 123 45 67"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rent a Car Owner Fields */}
              <AnimatePresence>
                {formData.userType === 'rentacar_owner' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <h3 className="text-sm font-semibold text-blue-800">
                          Rent a Car Sahibi Bilgileri
                        </h3>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@example.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon Numarası</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0555 123 45 67"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>

                      {/* Second Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone2">İkinci Telefon Numarası</Label>
                        <Input
                          id="phone2"
                          name="phone2"
                          type="tel"
                          autoComplete="tel"
                          value={formData.phone2}
                          onChange={handleInputChange}
                          placeholder="0555 987 65 43"
                          className={errors.phone2 ? 'border-red-500' : ''}
                        />
                        {errors.phone2 && (
                          <p className="text-sm text-red-600">{errors.phone2}</p>
                        )}
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <Label htmlFor="password">Şifre</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="En az 6 karakter"
                          className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && (
                          <p className="text-sm text-red-600">{errors.password}</p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Şirket Adı</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Şirket adınızı giriniz"
                          className={errors.companyName ? 'border-red-500' : ''}
                        />
                        {errors.companyName && (
                          <p className="text-sm text-red-600">{errors.companyName}</p>
                        )}
                      </div>

                      {/* Company Address */}
                      <div className="space-y-2">
                        <Label htmlFor="companyAddress">Şirket Adresi</Label>
                        <Input
                          id="companyAddress"
                          name="companyAddress"
                          type="text"
                          value={formData.companyAddress}
                          onChange={handleInputChange}
                          placeholder="Şirket adresinizi giriniz"
                          className={errors.companyAddress ? 'border-red-500' : ''}
                        />
                        {errors.companyAddress && (
                          <p className="text-sm text-red-600">{errors.companyAddress}</p>
                        )}
                      </div>

                      {/* Tax Number */}
                      <div className="space-y-2">
                        <Label htmlFor="taxNumber">Vergi Numarası</Label>
                        <Input
                          id="taxNumber"
                          name="taxNumber"
                          type="text"
                          value={formData.taxNumber}
                          onChange={handleInputChange}
                          placeholder="Vergi numaranızı giriniz"
                          className={errors.taxNumber ? 'border-red-500' : ''}
                        />
                        {errors.taxNumber && (
                          <p className="text-sm text-red-600">{errors.taxNumber}</p>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Kayıt Ol
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Zaten hesabınız var mı?{' '}
                  <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                    Giriş yapın
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