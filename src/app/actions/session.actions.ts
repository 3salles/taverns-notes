'use server';

import { prisma } from '@/lib/prisma';
import z from 'zod';

import { CreateSessionUseCase } from '@/core/application/session/create-session.use-case';
import { SearchSessionUseCase } from '@/core/application/session/search-session.use-case';
import {
  UpdateSessionDTO,
  updateSessionSchema,
} from '@/core/application/session/update-session.dto';
import { UpdateSessionUseCase } from '@/core/application/session/update-session.use-case';
import { ISessionSummary } from '@/core/domain/sessions/session.entity';
import { PrismaSessionRepository } from '@/infra/repository/prisma-session.repository';
import {
  CreateSessionDTO,
  createSessionSchema,
} from './../../core/application/session/create-session.dto';

interface SearchFromState {
  success: boolean;
  sessions?: ISessionSummary[];
  message?: string;
}

interface FormState extends SearchFromState {
  errors?: unknown;
}

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

export async function createSessionAction(
  data: CreateSessionDTO
): Promise<FormState> {
  const validated = createSessionSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      success: false,
      message: 'Erro de validação',
      errors: fieldErrors,
    };
  }

  try {
    const repository = new PrismaSessionRepository(prisma);
    const useCase = new CreateSessionUseCase(repository);

    await useCase.execute(validated.data);
  } catch {
    return { success: false, message: 'Falha ao criar sessão' };
  }

  return {
    success: true,
    message: 'Sessão criada com sucesso!',
  };
}

export async function updateSessionAction(
  data: UpdateSessionDTO
): Promise<FormState> {
  const validated = updateSessionSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      success: false,
      message: 'Erro de validação',
      errors: fieldErrors,
    };
  }

  try {
    const repository = new PrismaSessionRepository(prisma);
    const useCase = new UpdateSessionUseCase(repository);
    await useCase.execute(validated.data);

    return {
      success: true,
      message: 'Sessão atualizada com sucesso!',
    };
  } catch (error) {
    const _error = error as Error;

    if (_error.message === 'ERROR_NOT_FOUND') {
      return {
        success: false,
        message: 'Sessão não encontrada',
      };
    }

    return { success: false, message: 'Falha ao atualizar sessão' };
  }
}
