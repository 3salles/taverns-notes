'use client';

import { motion } from 'motion/react';

const PARTICLES = [
  { id: 0, x: -40, delay: 0.0, rune: '✧', size: 18 },
  { id: 1, x: -25, delay: 0.05, rune: 'ᚱ', size: 16 },
  { id: 2, x: -10, delay: 0.1, rune: 'ᚨ', size: 22 },
  { id: 3, x: 10, delay: 0.15, rune: '✦', size: 20 },
  { id: 4, x: 25, delay: 0.2, rune: 'ᛟ', size: 17 },
  { id: 5, x: 40, delay: 0.25, rune: 'ᛞ', size: 21 },
];

export function TomeBurst({ trigger }: { trigger: string }) {
  return (
    <div
      key={trigger}
      className="pointer-events-none absolute left-1/2 top-[35%] -translate-x-1/2"
    >
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          style={{ fontSize: p.size }}
          className="absolute font-display text-gold
          drop-shadow-[0_0_6px_rgba(184,146,42,0.6)]"
          initial={{
            opacity: 0,
            x: p.x,
            y: 0,
            scale: 0.6,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: -80,
            scale: [0.6, 1, 0.6],
            rotate: [0, 20, -20],
          }}
          transition={{
            duration: 1.2,
            delay: p.delay,
            ease: 'easeOut',
          }}
        >
          {p.rune}
        </motion.span>
      ))}
    </div>
  );
}
