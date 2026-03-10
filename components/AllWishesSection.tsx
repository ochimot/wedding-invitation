'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Wish {
  _id: string;
  name: string;
  message: string;
  attendance?: 'yes' | 'no' | 'maybe';
  createdAt: string;
}

export default function AllWishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWishes = async () => {
      try {
        const response = await fetch('/api/wishes');
        const result = await response.json();

        if (result.success) {
          setWishes(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch wishes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWishes();
  }, []);

  const stats = {
    total: wishes.length,
    attending: wishes.filter(w => w.attendance === 'yes').length,
    notAttending: wishes.filter(w => w.attendance === 'no').length,
    maybe: wishes.filter(w => w.attendance === 'maybe').length,
  };

  return (
    <section className="py-16 px-4 relative z-10 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-2">
              💌 Tất Cả Lời Chúc 💌
            </h2>
            <p className="text-pink-100">
              Những lời chúc tốt đẹp từ tất cả mọi người
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            <p className="text-gray-500 mt-4">Đang tải lời chúc...</p>
          </div>
        ) : wishes.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center">
            <p className="text-gray-600 text-lg">Chưa có lời chúc nào.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
                <div className="text-pink-500 text-3xl mb-2">📝</div>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-sm text-gray-600">Tổng lời chúc</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
                <div className="text-green-500 text-3xl mb-2">✅</div>
                <p className="text-3xl font-bold text-gray-800">{stats.attending}</p>
                <p className="text-sm text-gray-600">Sẽ tham dự</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
                <div className="text-gray-500 text-3xl mb-2">❌</div>
                <p className="text-3xl font-bold text-gray-800">{stats.notAttending}</p>
                <p className="text-sm text-gray-600">Không thể đến</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
                <div className="text-blue-500 text-3xl mb-2">❓</div>
                <p className="text-3xl font-bold text-gray-800">{stats.maybe}</p>
                <p className="text-sm text-gray-600">Chưa chắc chắn</p>
              </div>
            </div>

            {/* Wishes Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-pink-400 text-xl">❤️</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{wish.name}</h3>
                      {wish.attendance && (
                        <span className={`inline-flex items-center gap-1 text-xs mt-1 ${
                          wish.attendance === 'yes' 
                            ? 'text-green-600' 
                            : wish.attendance === 'no' 
                            ? 'text-gray-500' 
                            : 'text-blue-500'
                        }`}>
                          {wish.attendance === 'yes' ? '✅ Sẽ tham dự' : wish.attendance === 'no' ? '❌ Không thể tham dự' : '❓ Chưa chắc chắn'}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">&quot;{wish.message}&quot;</p>
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(wish.createdAt).toLocaleDateString('vi-VN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
