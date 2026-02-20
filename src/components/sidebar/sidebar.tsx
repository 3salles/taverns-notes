import { prisma } from '@/lib/prisma';
import { SidebarContent } from './sidebar-content';

export const Sidebar = async () => {
  //TODO - Ajustar para lidar quando não tem conexão com o banco
  const sessions = await prisma.session.findMany();

  return <SidebarContent sessions={sessions} />;
};
