'use client';

import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

interface InvitationHeaderProps {
  brideName: string;
  groomName: string;
  date: string;
  venue: string;
  eventType?: string;
}

export default function InvitationHeader({ 
  brideName, 
  groomName, 
  date, 
  venue, 
  eventType = 'THIỆP MỜI CƯỚI' 
}: InvitationHeaderProps) {
  return (
    <div className="text-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl font-serif text-pink-500 mb-4 tracking-widest">
          {eventType}
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-pink-600 mb-4">
          {brideName} & {groomName}
        </h1>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
        className="flex justify-center my-6"
      >
        <FaHeart className="text-red-400 text-4xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-gray-700"
      >
        <p className="text-2xl mb-2">{date}</p>
        <p className="text-xl">{venue}</p>
      </motion.div>
    </div>
  );
}
