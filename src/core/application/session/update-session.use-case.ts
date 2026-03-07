import { Session } from '@/core/domain/sessions/session.entity';
import { SessionRepository } from '@/core/domain/sessions/session.repository';
import { UpdateSessionDTO } from './update-session.dto';

export class UpdateSessionUseCase {
  constructor(private sessionRepository: SessionRepository) {}

  async execute(data: UpdateSessionDTO): Promise<Session> {
    const exists = await this.sessionRepository.findById(data.id);

    if (!exists) {
      throw new Error('SESSION_NOT_FOUND');
    }

    return this.sessionRepository.update(data.id, {
      title: data.title,
      note: data.note,
    });
  }
}
