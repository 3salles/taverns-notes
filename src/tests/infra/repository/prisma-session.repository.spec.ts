import { ISession } from '@/core/domain/sessions/session.entity';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaSessionRepository } from '@/infra/repository/prisma-session.repository';
import { CreateSessionDTO } from './../../../core/application/session/create-session.dto';
import { UpdateSessionDTO } from './../../../core/application/session/update-session.dto';

interface SessionDelegateMock {
  create: jest.MockedFunction<
    (args: { data: CreateSessionDTO }) => Promise<void>
  >;
  update: jest.MockedFunction<
    (args: {
      where: { id: string };
      data: UpdateSessionDTO;
    }) => Promise<ISession>
  >;
  findMany: jest.MockedFunction<
    (args: {
      orderBy?: { createdAt: 'asc' | 'desc' };
      where?: {
        OR: Array<{
          title?: { contains: string; mode: 'insensitive' };
          note?: { contains: string; mode: 'insensitive' };
        }>;
      };
    }) => Promise<ISession[]>
  >;
  findUnique: jest.MockedFunction<
    (args: { where: { id: string } }) => Promise<ISession | null>
  >;
}

interface PrismaMock {
  session: SessionDelegateMock;
}

function createMockPrisma() {
  const mock: PrismaMock = {
    session: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  return mock as unknown as PrismaClient & PrismaMock;
}

describe('PrismaSessionRepository', () => {
  let prisma: ReturnType<typeof createMockPrisma>;
  let repository: PrismaSessionRepository;

  beforeEach(() => {
    prisma = createMockPrisma();
    repository = new PrismaSessionRepository(prisma);
  });

  describe('findMany', () => {
    it('should order by createdAt desc and map results', async () => {
      const now = new Date();
      const input = [
        {
          id: '1',
          title: 'Title 01',
          note: 'Content 01',
          createdAt: now,
          updatedAt: now,
          sessionDate: now,
        },
        {
          id: '2',
          title: 'Title 02',
          note: 'Content 02',
          createdAt: now,
          updatedAt: now,
          sessionDate: now,
        },
      ];
      prisma.session.findMany.mockResolvedValue(input);

      const results = await repository.findMany();

      expect(prisma.session.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
      expect(results).toMatchObject(input);
    });
  });

  describe('searchMany', () => {
    it('should search by empty term and do not send where', async () => {
      const now = new Date();
      const input = [
        {
          id: '1',
          title: 'Title 01',
          note: 'Content 01',
          createdAt: now,
          updatedAt: now,
          sessionDate: now,
        },
      ];
      prisma.session.findMany.mockResolvedValue(input);

      const results = await repository.searchMany('    ');
      expect(prisma.session.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: { createdAt: 'desc' },
      });
      expect(results).toMatchObject(input);
    });

    it('should search by term and use OR in where', async () => {
      const now = new Date();
      const input = [
        {
          id: '1',
          title: 'Title 01',
          note: 'Content 01',
          createdAt: now,
          updatedAt: now,
          sessionDate: now,
        },
      ];
      prisma.session.findMany.mockResolvedValue(input);

      const results = await repository.searchMany(' title 01   ');
      expect(prisma.session.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { title: { contains: 'title 01', mode: 'insensitive' } },
            { note: { contains: 'title 01', mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(results).toMatchObject(input);
    });

    it('should handle undefined term and return all sessions', async () => {
      const now = new Date();
      const input = [
        {
          id: '1',
          title: 'Title 01',
          note: 'Content 01',
          createdAt: now,
          updatedAt: now,
          sessionDate: now,
        },
      ];
      prisma.session.findMany.mockResolvedValue(input);

      const results = await repository.searchMany(undefined);

      expect(prisma.session.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: { createdAt: 'desc' },
      });
      expect(results).toMatchObject(input);
    });
  });

  describe('create', () => {
    it('should call the method with args correctly', async () => {
      const input = {
        title: 'Title',
        note: 'Note',
        sessionDate: new Date(),
      };

      await repository.create(input);

      expect(prisma.session.create).toHaveBeenCalledWith({ data: input });
    });
  });

  describe('update', () => {
    it('should update and return session', async () => {
      const now = new Date();
      const inputData = {
        id: '1',
        title: 'new title',
        note: 'new note',
        updatedAt: now,
        createdAt: now,
        sessionDate: now,
      };

      prisma.session.update.mockResolvedValue(inputData);

      const result = await repository.update(inputData.id, {
        title: inputData.title,
        note: inputData.note,
      });

      expect(prisma.session.update).toHaveBeenCalledWith({
        where: { id: inputData.id },
        data: { title: inputData.title, note: inputData.note },
      });
      expect(result).toEqual(inputData);
    });

    it('should update only specific field (ex.: only title)', async () => {
      const now = new Date();
      const inputData = {
        id: '1',
        title: 'new title',
        note: '',
        updatedAt: now,
        createdAt: now,
        sessionDate: now,
      };

      await repository.update(inputData.id, { title: inputData.title });
      const call = prisma.session.update.mock.calls[0][0];

      expect(call.where).toEqual({ id: inputData.id });
      expect(call.data).toEqual({ title: inputData.title });
      expect('content' in call.data).toBe(false);
    });

    it('should update only specific field (ex.: only note)', async () => {
      const now = new Date();
      const inputData = {
        id: '1',
        title: '',
        note: 'new note',
        updatedAt: now,
        createdAt: now,
        sessionDate: now,
      };

      await repository.update(inputData.id, { note: inputData.note });
      const call = prisma.session.update.mock.calls[0][0];

      expect(call.where).toEqual({ id: inputData.id });
      expect(call.data).toEqual({ note: inputData.note });
      expect('title' in call.data).toBe(false);
    });
  });

  describe('findById', () => {
    it('should return session when it exists', async () => {
      const now = new Date();
      const inputData = {
        id: '1',
        title: 'title',
        note: 'note',
        updatedAt: now,
        createdAt: now,
        sessionDate: now,
      };

      prisma.session.findUnique.mockResolvedValue(inputData);

      const result = await repository.findById(inputData.id);

      expect(prisma.session.findUnique).toHaveBeenCalledWith({
        where: { id: inputData.id },
      });
      expect(result).toEqual(inputData);
    });

    it('should return null when session does not exists', async () => {
      prisma.session.findUnique.mockResolvedValue(null);

      const result = await repository.findById('1');

      expect(result).toBeNull();
    });
  });
});
