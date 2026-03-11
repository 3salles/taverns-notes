'use client';

import { motion } from 'motion/react';

export function TomeFlash({ trigger }: { trigger: string }) {
  return (
    <motion.div
      key={trigger}
      className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: [0, 0.9, 0],
        scale: [0.6, 1.4, 0.8],
      }}
      transition={{
        duration: 0.45,
        ease: 'easeOut',
      }}
    >
      <div
        className="h-24 w-24 rounded-full blur-xl"
        style={{
          background:
            'radial-gradient(circle, rgba(184,146,42,0.55) 0%, rgba(201,76,26,0.35) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
