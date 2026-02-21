import { CreateSessionDTO } from '@/core/application/session/create-session.dto';
import { ISession } from '@/core/domain/sessions/session.entity';
import { SessionRepository } from '@/core/domain/sessions/session.repository';
import { PrismaClient } from '@/generated/prisma/client';

export class PrismaSessionRepository implements SessionRepository {
  constructor(private prisma: PrismaClient) {}

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

  async create(data: CreateSessionDTO): Promise<void> {
    //TODO - Adicionar sessionDate quando existir input
    await this.prisma.session.create({
      data: { ...data, sessionDate: new Date() },
    });
  }
}
