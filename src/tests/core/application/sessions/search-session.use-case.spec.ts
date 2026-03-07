import { SearchSessionUseCase } from '@/core/application/session/search-session.use-case';
import { Session } from '@/core/domain/sessions/session.entity';
import { SessionRepository } from '@/core/domain/sessions/session.repository';

describe('SearchSessionUseCase', () => {
  const input: Session[] = [
    {
      id: '1',
      title: 'Title 01',
      note: 'Content 01',
      createdAt: new Date(),
      updatedAt: new Date(),
      sessionDate: new Date(),
    },
    {
      id: '2',
      title: 'Title 02',
      note: 'Content 02',
      createdAt: new Date(),
      updatedAt: new Date(),
      sessionDate: new Date(),
    },
  ];

  const repository: SessionRepository = {
    findMany: async () => input,
    searchMany: async (term) =>
      input.filter(
        (session) =>
          session.title.toLowerCase().includes(term.toLocaleLowerCase()) ||
          session.note.toLowerCase().includes(term.toLocaleLowerCase())
      ),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
  };

  it('should return all sessions when term is empty', async () => {
    const useCase = new SearchSessionUseCase(repository);

    const results = await useCase.execute('');

    expect(results).toHaveLength(2);
  });

  it('should filter session list by searched term result', async () => {
    const useCase = new SearchSessionUseCase(repository);
    const query = 'title 01';

    const results = await useCase.execute(query);

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('1');
  });

  it('should trim the spaces in the term and return all sessions list', async () => {
    const findMany = jest.fn().mockResolvedValue(input);
    const searchMany = jest.fn().mockResolvedValue([]);
    const repositoryWithSpies: SessionRepository = {
      ...repository,
      findMany,
      searchMany,
    };

    const useCase = new SearchSessionUseCase(repositoryWithSpies);
    const query = '   ';

    const results = await useCase.execute(query);

    expect(results).toHaveLength(2);
    expect(findMany).toHaveBeenCalledTimes(1);
    expect(searchMany).not.toHaveBeenCalled();
  });

  it('should search term with blank spaces using trim', async () => {
    const firstElement = input.slice(0, 1);
    const findMany = jest.fn().mockResolvedValue(input);
    const searchMany = jest.fn().mockResolvedValue(firstElement);
    const repositoryWithSpies: SessionRepository = {
      ...repository,
      findMany,
      searchMany,
    };

    const useCase = new SearchSessionUseCase(repositoryWithSpies);
    const query = 'title 02   ';

    const results = await useCase.execute(query);

    expect(results).toMatchObject(firstElement);
    expect(searchMany).toHaveBeenCalledWith(query.trim());
    expect(findMany).not.toHaveBeenCalled();
  });

  it('should treat undefined or null term and return complete session list', async () => {
    const findMany = jest.fn().mockResolvedValue(input);
    const searchMany = jest.fn().mockResolvedValue([]);
    const repositoryWithSpies: SessionRepository = {
      ...repository,
      findMany,
      searchMany,
    };

    const useCase = new SearchSessionUseCase(repositoryWithSpies);
    const query = undefined as unknown as string;

    const results = await useCase.execute(query);

    expect(results).toMatchObject(input);
    expect(findMany).toHaveBeenCalledTimes(1);
    expect(searchMany).not.toHaveBeenCalled();
  });
});
