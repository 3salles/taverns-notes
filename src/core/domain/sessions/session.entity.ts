export interface Session {
  title: string;
  id: string;
  note: string;
  sessionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionSummary {
  id: string;
  title: string;
  note: string;
}
