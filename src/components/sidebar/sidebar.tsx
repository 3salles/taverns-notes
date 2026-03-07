import { SessionSummary } from '@/core/domain/sessions/session.entity';
import { PrismaSessionRepository } from '@/infra/repository/prisma-session.repository';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';
import { Spinner } from '../ui/spinner';
import { SidebarContent } from './sidebar-content';

export const Sidebar = async () => {
  const sessionRepository = new PrismaSessionRepository(prisma);
  let initialSessions: SessionSummary[] = [];

  try {
    initialSessions = await sessionRepository.findMany();
  } catch {
    initialSessions = [];
  }

  return (
    <Suspense fallback={<Spinner />}>
      <SidebarContent sessions={initialSessions} />
    </Suspense>
  );
};
