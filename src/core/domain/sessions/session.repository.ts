import { CreateSessionDTO } from '@/core/application/session/create-session.dto';
import { ISession } from './session.entity';

export interface SessionRepository {
  create(data: CreateSessionDTO): Promise<void>;
  update(id: string, data: Partial<CreateSessionDTO>): Promise<ISession>;
  findMany(): Promise<ISession[]>;
  searchMany(term: string): Promise<ISession[]>;
  findById(id: string): Promise<ISession | null>;
}
