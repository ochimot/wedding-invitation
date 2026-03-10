'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';

interface Wish {
  _id: string;
  name: string;
  message: string;
  attendance?: 'yes' | 'no' | 'maybe';
  createdAt: string;
}

interface WishesListProps {
  invitationId: string;
  refresh?: number;
  showStats?: boolean;
}

export default function WishesList({ invitationId, refresh = 0, showStats = false }: WishesListProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch(`/api/wishes?invitationId=${invitationId}`);
        const result = await response.json();

        if (result.success) {
          setWishes(result.data);
        }
      } catch (error: unknown) {
        console.error('Failed to fetch wishes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
  }, [invitationId, refresh]);

  const stats = {
    total: wishes.length,
    attending: wishes.filter(w => w.attendance === 'yes').length,
    notAttending: wishes.filter(w => w.attendance === 'no').length,
    maybe: wishes.filter(w => w.attendance === 'maybe').length,
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        <p className="text-gray-500 mt-4">Đang tải lời chúc...</p>
      </div>
    );
  }

  if (wishes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center">
          <FaHeart className="text-pink-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Statistics Cards */}
      {showStats && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
          <FaUsers className="text-pink-500 text-3xl mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          <p className="text-sm text-gray-600">Tổng lời chúc</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
          <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-800">{stats.attending}</p>
          <p className="text-sm text-gray-600">Sẽ tham dự</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
          <FaTimesCircle className="text-gray-500 text-3xl mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-800">{stats.notAttending}</p>
          <p className="text-sm text-gray-600">Không thể đến</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
          <FaQuestionCircle className="text-blue-500 text-3xl mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-800">{stats.maybe}</p>
          <p className="text-sm text-gray-600">Chưa chắc chắn</p>
        </div>
      </motion.div>
      )}

      {/* Wishes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wishes.map((wish, index) => (
          <motion.div
            key={wish._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-3 mb-3">
              <FaHeart className="text-pink-400 mt-1 flex-shrink-0" />
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
                    {wish.attendance === 'yes' && <FaCheckCircle className="text-xs" />}
                    {wish.attendance === 'no' && <FaTimesCircle className="text-xs" />}
                    {wish.attendance === 'maybe' && <FaQuestionCircle className="text-xs" />}
                    {wish.attendance === 'yes' ? 'Sẽ tham dự' : wish.attendance === 'no' ? 'Không thể tham dự' : 'Chưa chắc chắn'}
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
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
