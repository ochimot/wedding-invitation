'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface GuestWishFormProps {
  guestName: string;
  onSubmitSuccess?: () => void;
}

export default function GuestWishForm({ guestName, onSubmitSuccess }: GuestWishFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    attendance: 'maybe' as 'yes' | 'no' | 'maybe',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          invitationId: guestName,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Cảm ơn lời chúc của bạn! ❤️');
        setFormData({ name: '', message: '', attendance: 'maybe' });
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        setSubmitMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch {
      setSubmitMessage('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
    >
      <h2 className="text-3xl font-serif text-pink-600 mb-6 text-center">
        Gửi Lời Chúc
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Tên của bạn
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-800 placeholder:text-gray-400 transition-colors"
            placeholder="Nhập tên của bạn"
          />
        </div>

        <div>
          <label htmlFor="attendance" className="block text-gray-700 font-medium mb-2">
            Bạn có thể tham dự không?
          </label>
          <select
            id="attendance"
            value={formData.attendance}
            onChange={(e) => setFormData({ ...formData, attendance: e.target.value as 'yes' | 'no' | 'maybe' })}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-800 transition-colors cursor-pointer"
          >
            <option value="maybe">Chưa chắc chắn</option>
            <option value="yes">Có, tôi sẽ đến</option>
            <option value="no">Không thể tham dự</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Lời chúc của bạn
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={4}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-800 placeholder:text-gray-400 resize-none transition-colors"
            placeholder="Gửi lời chúc tốt đẹp đến cô dâu và chú rể..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi lời chúc'}
        </button>

        {submitMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center ${submitMessage.includes('Cảm ơn') ? 'text-green-600' : 'text-red-600'}`}
          >
            {submitMessage}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}
