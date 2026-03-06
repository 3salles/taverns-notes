import { ISessionSummary } from '@/core/domain/sessions/session.entity';
import { motion } from 'motion/react';
import { SessionCard } from './session-card';

export interface SessionListProps {
  sessions: ISessionSummary[];
}
//TODO - Adicionar atualização de lista ao remover
export const SessionList = ({ sessions }: SessionListProps) => {
  return (
    <motion.ul
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      layout
    >
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </motion.ul>
  );
};
