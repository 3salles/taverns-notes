import { CreateSessionUseCase } from '@/core/application/session/create-session.use-case';
import { Session } from '@/core/domain/sessions/session.entity';
import { SessionRepository } from '@/core/domain/sessions/session.repository';

describe('CreateSessionUseCase', () => {
  const input: Session = {
    id: '1',
    title: 'Title 01',
    note: 'Content 01',
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionDate: new Date(),
  };

  const repository: SessionRepository = {
    findMany: jest.fn(),
    searchMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
  };

  const makeRepository = () => {
    const base = {
      create: jest.fn(async () => undefined),
    };

    return { ...base } as unknown as SessionRepository;
  };

  it('should create a session with correct data', async () => {
    const repository = makeRepository();

    const useCase = new CreateSessionUseCase(repository);

    await expect(useCase.execute(input)).resolves.toBeUndefined();

    expect(repository.create).toHaveBeenCalledWith(input);
  });

  it('should throw error if create session fails', async () => {
    const create = jest
      .fn()
      .mockRejectedValueOnce(new Error('Repository error'));
    const repositoryWithSpy: SessionRepository = {
      ...repository,
      create,
    };

    const useCase = new CreateSessionUseCase(repositoryWithSpy);

    await expect(useCase.execute(input)).rejects.toThrow('Repository error');
  });
});
