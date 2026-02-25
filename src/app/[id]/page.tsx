import { SessionForm } from '@/components/session';
import { PrismaSessionRepository } from '@/infra/repository/prisma-session.repository';
import { prisma } from '@/lib/prisma';

interface SessionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params;
  const repository = new PrismaSessionRepository(prisma);
  const session = await repository.findById(id);

  return <SessionForm session={session} />;
}
