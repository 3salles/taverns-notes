export interface ISession {
  title: string;
  id: string;
  note: string;
  sessionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ISessionSummary = Pick<ISession, 'id' | 'title' | 'note'>;
