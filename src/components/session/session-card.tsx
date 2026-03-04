'use client';
import { ISessionSummary } from '@/core/domain/sessions/session.entity';
import { Trash as DeleteIcon, Loader2 as LoadingIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

export interface SessionCardProps {
  session: ISessionSummary;
}

export const SessionCard = ({ session }: SessionCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteSession = () => {
    toast.success('Sessão removida com sucesso!');
  };

  return (
    <>
      <li
        className="p-3 rounded-lg transition-all duration-200 group relative
     hover:bg-gray-700"
      >
        <header className="flex items-start justify-between">
          <Link href={`/${session.id}`} prefetch className="flex-1 min-w-0">
            <h3
              className="font-medium text-sm text-white 
        group-hover:text-accent-300 transition-colors"
            >
              {session.title}
            </h3>

            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {session.note}
            </p>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="icon"
                size="icon"
                title="Remover sessão"
                aria-label="Remover sessão"
              >
                <DeleteIcon className="w-3 h-3" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remover Sessão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja remover esta sessão? Esta ação não pode
                  ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteSession}
                  disabled={isDeleting}
                >
                  {isDeleting && (
                    <LoadingIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </header>
      </li>
    </>
  );
};
