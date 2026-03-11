'use client';

import { motion } from 'motion/react';

const SPARKS = [
  { id: 0, left: '22%', top: '35%', dur: 2.8, delay: 0.0 },
  { id: 1, left: '31%', top: '52%', dur: 3.5, delay: 0.7 },
  { id: 2, left: '45%', top: '38%', dur: 2.6, delay: 1.4 },
  { id: 3, left: '58%', top: '61%', dur: 4.1, delay: 0.3 },
  { id: 4, left: '67%', top: '44%', dur: 3.2, delay: 2.1 },
  { id: 5, left: '73%', top: '33%', dur: 2.9, delay: 0.9 },
  { id: 6, left: '38%', top: '68%', dur: 3.7, delay: 1.8 },
  { id: 7, left: '52%', top: '55%', dur: 2.5, delay: 3.2 },
  { id: 8, left: '27%', top: '47%', dur: 4.3, delay: 0.5 },
  { id: 9, left: '61%', top: '39%', dur: 3.0, delay: 2.6 },
  { id: 10, left: '42%', top: '62%', dur: 2.7, delay: 1.1 },
  { id: 11, left: '70%', top: '57%', dur: 3.8, delay: 3.8 },
];

export function TomeSparks() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {SPARKS.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-ember"
          style={{ left: s.left, top: s.top, width: 3, height: 3 }} // ← w e h maiores
          animate={{
            opacity: [0, 1, 0],
            y: [0, -55],
            scale: [1, 0.3],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}
