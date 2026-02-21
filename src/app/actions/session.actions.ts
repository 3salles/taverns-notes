'use server';

import { prisma } from '@/lib/prisma';
import z from 'zod';

import { CreateSessionUseCase } from '@/core/application/session/create-session.use-case';
import { SearchSessionUseCase } from '@/core/application/session/search-session.use-case';
import { ISessionSummary } from '@/core/domain/sessions/session.entity';
import { PrismaSessionRepository } from '@/infra/repository/prisma-session.repository';
import { revalidatePath } from 'next/cache';
import {
  CreateSessionDTO,
  CreateSessionSchema,
} from './../../core/application/session/create-session.dto';

type SearchFromState = {
  success: boolean;
  sessions?: ISessionSummary[];
  message?: string;
};

export async function searchSessionAction(
  _prev: SearchFromState,
  formData: FormData
): Promise<SearchFromState> {
  const term = String(formData.get('q') ?? '').trim();

  const sessionRepository = new PrismaSessionRepository(prisma);
  const sessionUseCase = new SearchSessionUseCase(sessionRepository);

  try {
    const sessions = await sessionUseCase.execute(term);

    const summaries = sessions.map(({ id, title, note }) => ({
      id,
      title,
      note,
    }));

    return {
      success: true,
      sessions: summaries,
    };
  } catch {
    return {
      success: false,
      message: 'Falha ao buscar sessões',
    };
  }
}
{
}

export async function createSessionAction(data: CreateSessionDTO) {
  const validated = CreateSessionSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      success: false,
      message: 'Erro de validação',
      error: fieldErrors,
    };
  }

  try {
    const repository = new PrismaSessionRepository(prisma);
    const useCase = new CreateSessionUseCase(repository);

    await useCase.execute(validated.data);
    revalidatePath('/', 'layout');
  } catch {
    return { success: false, message: 'Falha ao criar sessão' };
  }

  return {
    success: true,
    message: 'Sessão criada com sucesso',
  };
}
