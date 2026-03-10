'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';

interface FloatingHeartsProps {
  count?: number;
}

export default function FloatingHearts({ count = 10 }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<ReactNode[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const newHearts: ReactNode[] = [];
    for (let i = 0; i < count; i++) {
      const randomDelay = Math.random() * 5;
      const randomDuration = 10 + Math.random() * 10;
      const randomX = Math.random() * 100;
      const randomSize = 20 + Math.random() * 20;

      newHearts.push(
        <motion.div
          key={i}
          className="absolute text-pink-300 opacity-40"
          style={{
            left: `${randomX}%`,
            fontSize: `${randomSize}px`,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: randomDuration,
            delay: randomDelay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❤️
        </motion.div>
      );
    }
    setHearts(newHearts);
  }, [count]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts}
    </div>
  );
}
