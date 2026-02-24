import { ISessionSummary } from '@/core/domain/sessions/session.entity';
import { SessionCard } from './session-card';

export interface SessionListProps {
  sessions: ISessionSummary[];
}
export const SessionList = ({ sessions }: SessionListProps) => {
  return (
    <ul className="space-y-2">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </ul>
  );
};
