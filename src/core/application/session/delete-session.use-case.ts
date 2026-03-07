import { SessionRepository } from '@/core/domain/sessions/session.repository';

export class DeleteSessionUseCase {
  constructor(private sessionRepository: SessionRepository) {}

  async execute(id: string): Promise<void> {
    const session = await this.sessionRepository.findById(id);

    if (!session) {
      throw new Error('SESSION_NOT_FOUND');
    }

    await this.sessionRepository.delete(id);
  }
}
