import { prisma } from '@/lib/prisma';
import { SidebarContent } from './sidebar-content';

export const Sidebar = async () => {
  const sessions = await prisma.session.findMany();

  return <SidebarContent sessions={sessions} />;
};
