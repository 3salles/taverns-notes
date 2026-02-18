'use client';

import {
  Plus as AddIcon,
  ArrowLeftToLine,
  ArrowRightToLine,
  X as CloseButton,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, startTransition, useState } from 'react';
import { Logo } from '../logo';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
interface ISession {
  title: string;
  id: string;
  note: string;
}
export interface SidebarContentProps {
  sessions: ISession[];
}

export const SidebarContent = ({ sessions }: SidebarContentProps) => {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [query, setQuery] = useState('');

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const handleNewSession = () => router.push('/new');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    startTransition(() => {
      const url = newQuery ? `/?q=${encodeURIComponent(newQuery)}` : '/';

      router.push(url, { scroll: false });
    });
  };

  //REFACTOR - Adicionar early return para melhor legibilidade
  return (
    <aside
      className={`border-r border-gray-700 flex flex-col h-full bg-gray-800 
    transition-[transform,width] duration-300 ease-in-out fixed md:relative 
    left-0 top-0 z-50 md:z-auto w-[80vw] sm:w-[320px] ${isCollapsed ? 'md:w-18' : 'md:w-[384px]'}`}
    >
      {isCollapsed && (
        <>
          <section className="px-2 py-6">
            <header className="flex items-center justify-center mb-6">
              <Button
                variant="icon"
                aria-label="Expandir sidebar"
                title="Expandir sidebar"
                className="hidden md:inline-flex p-2 hover:bg-gray-700 focus:outline-none focus:ring-2 
                focus:ring-accent-500 rounded-lg transition-colors"
                onClick={toggleSidebar}
              >
                <ArrowRightToLine className="w-5 h-5 text-gray-100" />
              </Button>
            </header>
          </section>
        </>
      )}

      {!isCollapsed && (
        <>
          <section className="p-6">
            <div className="md:hidden mb-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="secondary"
                  aria-label="Fechar menu"
                  title="Fechar menu"
                >
                  <CloseButton className="w-5 h-5 text-gray-100" />
                </Button>
              </div>
            </div>
            <div className="flex w-full items-center justify-between mb-6">
              <header className="flex w-full items-center justify-between">
                <Logo />
                <Button
                  aria-label="Minimizar sidebar"
                  title="Minimizar sidebar"
                  variant="icon"
                  className="hidden md:inline-flex p-2 
                hover:bg-gray-700 focus:outline-none focus:ring-2 
                focus:ring-accent-500 rounded-lg transition-colors"
                  onClick={toggleSidebar}
                >
                  <ArrowLeftToLine className="w-5 h-5 text-gray-100" />
                </Button>
              </header>
            </div>

            <section className="mb-5">
              <form action="">
                <Input
                  name="q"
                  type="text"
                  placeholder="Buscar sessões..."
                  autoFocus
                  onChange={handleQueryChange}
                  value={query}
                />
              </form>
            </section>

            <div>
              <Button className="w-full " size="lg" onClick={handleNewSession}>
                <AddIcon className="w-5 h-5 mr-2" />
                Nova Sessão
              </Button>
            </div>
          </section>
        </>
      )}

      {sessions.map((session) => (
        <p key={session.id}>{session.title}</p>
      ))}
    </aside>
  );
};
