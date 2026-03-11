'use client';

import { OpenTome } from '@/components/ui/icons';
import { motion } from 'motion/react';
import { PulseRings, TomeSparks } from '../effects';
import { TomeBurst } from './tome-burst';
import { TomeFlash } from './tome-flash';

export function TomeScene({ trigger }: { trigger: string }) {
  return (
    <div className="relative flex h-85 w-85 items-center justify-center">
      <PulseRings />
      <TomeSparks />

      <TomeFlash trigger={trigger} />
      <TomeBurst trigger={trigger} />

      <motion.div
        key={trigger}
        initial={{ rotate: 0, scale: 1 }}
        animate={{
          rotate: [0, -4, 3, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className="relative z-10"
      >
        <OpenTome />
      </motion.div>
    </div>
  );
}
