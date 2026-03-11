'use client';

import { motion } from 'motion/react';

export function PulseRings() {
  const rings = [340, 275, 215];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {rings.map((size, i) => {
        const color =
          i === 1 ? 'rgba(184,146,42,0.12)' : 'rgba(201,76,26,0.14)';

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              border: `1px solid ${color}`,
            }}
            initial={{ scale: 0.85, opacity: 0.4 }}
            animate={{
              scale: [0.85, 1.08, 0.85],
              opacity: [0.25, 0.6, 0.25],
            }}
            transition={{
              duration: 4,
              delay: i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
