"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    rating: 5,
    comment: "Harika bir deneyimdi! Araç temiz ve bakımlıydı. Kesinlikle tekrar kiralayacağım.",
    date: "15 Ekim 2024",
    avatar: "https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=0D8ABC&color=fff"
  },
  {
    id: 2,
    name: "Zeynep Kaya",
    rating: 5,
    comment: "Müşteri hizmetleri çok iyiydi. Tüm sorularıma hızlıca cevap verdiler. Teşekkürler!",
    date: "10 Ekim 2024",
    avatar: "https://ui-avatars.com/api/?name=Zeynep+Kaya&background=F59E0B&color=fff"
  },
  {
    id: 3,
    name: "Mehmet Demir",
    rating: 4,
    comment: "Fiyatlar uygun ve araç seçenekleri çok fazla. Sadece teslim alma süreci biraz uzun sürdü.",
    date: "5 Ekim 2024",
    avatar: "https://ui-avatars.com/api/?name=Mehmet+Demir&background=10B981&color=fff"
  },
  {
    id: 4,
    name: "Ayşe Şahin",
    rating: 5,
    comment: "İlk defa araç kiralıyordum, her şey çok kolay ve anlaşılırdı. Teşekkürler!",
    date: "1 Ekim 2024",
    avatar: "https://ui-avatars.com/api/?name=Ayse+Sahin&background=8B5CF6&color=fff"
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full bg-gray-50 py-16 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-gray-600">Binlerce mutlu müşterimizin deneyimleri</p>
        </div>

        <div className="relative bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center">
            <Image
              src={testimonials[currentTestimonial].avatar}
              alt={testimonials[currentTestimonial].name}
              width={80}
              height={80}
              className="rounded-full mb-4"
            />
            <div className="flex mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 text-center text-lg mb-4 italic">
              &quot;{testimonials[currentTestimonial].comment}&quot;
            </p>
            <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
            <p className="text-sm text-gray-500">{testimonials[currentTestimonial].date}</p>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md"
            aria-label="Önceki yorum"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md"
            aria-label="Sonraki yorum"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Yorum ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

