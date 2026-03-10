'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { src: '/images/slide1.jpg', alt: 'Wedding Slide 1' },
  { src: '/images/slide2.jpg', alt: 'Wedding Slide 2' },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [guestName, setGuestName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      // Default to groom side
      router.push(`/invitation?mode=groom&guest=${encodeURIComponent(guestName)}`);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].src}
            alt={slides[currentSlide].alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif mb-4 text-center"
        >
          Đại & Trân
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl mb-8 text-center"
        >
          Trân trọng kính mời quý khách tham dự hôn lễ của chúng tôi
        </motion.p>

        <motion.form
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onSubmit={handleSubmit}
          className="w-full max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            <label htmlFor="guestName" className="block text-gray-700 font-medium mb-3 text-center">
              Tên của bạn
            </label>
            <input
              type="text"
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-800 placeholder:text-gray-400 transition-colors mb-4"
              placeholder="Nhập tên của bạn"
            />
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Xem Thiệp Mời
            </button>
          </div>
        </motion.form>

        {/* Slide Indicators */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
