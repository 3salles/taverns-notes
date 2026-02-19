import { ISession } from './session.entity';

export interface SessionRepository {
  findMany(): Promise<ISession[]>;
  searchMany(term: string): Promise<ISession[]>;
}
