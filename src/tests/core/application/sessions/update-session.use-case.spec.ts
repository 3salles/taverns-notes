import { UpdateSessionUseCase } from '@/core/application/session/update-session.use-case';
import { SessionRepository } from '@/core/domain/sessions/session.repository';
import { UpdateSessionDTO } from './../../../../core/application/session/update-session.dto';

const makeRepository = (overrides: Partial<SessionRepository>) => {
  const base = {
    update: jest.fn(async (id, data) => ({
      id,
      title: data.title ?? '',
      note: data.content ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
      sessionDate: new Date(),
    })),
    findById: jest.fn(async () => null),
  };

  return { ...base, ...overrides } as SessionRepository;
};

describe('UpdateSessionUseCase', () => {
  it('should update when session exists', async () => {
    const now = new Date();
    const repository = makeRepository({
      findById: jest.fn().mockResolvedValue({
        id: '1',
        title: 'old title',
        note: 'old content',
        createdAt: now,
        updatedAt: now,
        sessionDate: now,
      }),
      update: jest.fn().mockResolvedValue({
        id: '1',
        title: 'new title',
        note: 'new content',
        createdAt: now,
        updatedAt: now,
        sessionDate: now,
      }),
    });
    const useCase = new UpdateSessionUseCase(repository);
    const input: UpdateSessionDTO = {
      id: '1',
      title: 'new title',
      note: 'new content',
    };

    const result = await useCase.execute(input);

    expect(result.title).toBe(input.title);
    expect(repository.update).toHaveBeenCalledWith(input.id, {
      title: input.title,
      note: input.note,
    });
  });

  it('should throw SESSION_NOT_FOUND  when session does not exist', async () => {
    const repository = makeRepository({
      findById: jest.fn().mockResolvedValue(null),
    });
    const useCase = new UpdateSessionUseCase(repository);
    const input = {
      id: '1',
      title: 'title',
      note: 'content',
    };

    await expect(useCase.execute(input)).rejects.toThrow('SESSION_NOT_FOUND');
  });
});
