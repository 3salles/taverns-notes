import { CreateSessionDTO } from '@/core/application/session/create-session.dto';
import { Session } from './session.entity';

export interface SessionRepository {
  create(data: CreateSessionDTO): Promise<void>;
  update(id: string, data: Partial<CreateSessionDTO>): Promise<Session>;
  delete(id: string): Promise<void>;
  findMany(): Promise<Session[]>;
  searchMany(term: string): Promise<Session[]>;
  findById(id: string): Promise<Session | null>;
}
