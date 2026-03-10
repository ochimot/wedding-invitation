'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const galleryImages = [
  '/images/w1.jpg',
  '/images/w2.jpg',
  '/images/w3.jpg',
  '/images/w4.jpg',
  '/images/w7.jpg',
  '/images/w8.jpg',
  '/images/w9.jpg',
  '/images/w10.jpg',
  '/images/w11.jpg',
  '/images/w12.jpg',
];

export default function Gallery() {
  return (
    <section className="py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-pink-600 text-center mb-12"
        >
          Khoảnh Khắc Đáng Nhớ
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            >
              <Image
                src={image}
                alt={`Wedding photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-pink-600/0 group-hover:bg-pink-600/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
