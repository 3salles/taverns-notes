import { Session } from '@/core/domain/sessions/session.entity';
import { SessionRepository } from '@/core/domain/sessions/session.repository';

export class SearchSessionUseCase {
  constructor(private sessionRepository: SessionRepository) {}

  async execute(term?: string): Promise<Session[]> {
    const q = term?.trim() ?? '';

    if (!q) {
      return this.sessionRepository.findMany();
    }

    return this.sessionRepository.searchMany(q);
  }
}
