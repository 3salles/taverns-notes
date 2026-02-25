import { CreateSessionDTO } from '@/core/application/session/create-session.dto';
import { ISession } from '@/core/domain/sessions/session.entity';
import { SessionRepository } from '@/core/domain/sessions/session.repository';
import { PrismaClient } from '@/generated/prisma/client';

export class PrismaSessionRepository implements SessionRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateSessionDTO): Promise<void> {
    await this.prisma.session.create({
      data,
    });
  }

  async update(id: string, data: Partial<CreateSessionDTO>): Promise<ISession> {
    const updated = await this.prisma.session.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.note !== undefined ? { note: data.note } : {}),
      },
    });

    return updated;
  }

  async findMany(): Promise<ISession[]> {
    const sessions = await this.prisma.session.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return sessions;
  }

  async searchMany(term?: string): Promise<ISession[]> {
    const q = term?.trim() ?? '';

    const sessions = await this.prisma.session.findMany({
      where: q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { note: { contains: q, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return sessions;
  }

  async findById(id: string): Promise<ISession | null> {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    return session;
  }
}
