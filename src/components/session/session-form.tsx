'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import {
  createSessionAction,
  updateSessionAction,
} from '@/app/actions/session.actions';
import {
  CreateSessionDTO,
  createSessionSchema,
} from '@/core/application/session/create-session.dto';
import { ISession } from '@/core/domain/sessions/session.entity';
import { CopyButton } from '../button-actions';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export interface SessionFormProps {
  session?: ISession | null;
}

export const SessionForm = ({ session }: SessionFormProps) => {
  const router = useRouter();

  const sessionForm = useForm<CreateSessionDTO>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      title: session?.title || '',
      note: session?.note || '',
    },
  });
  const content = useWatch({ control: sessionForm.control, name: 'note' });

  const isEdit = !!session?.id;

  const submitSessionForm = async (data: CreateSessionDTO) => {
    const result = isEdit
      ? await updateSessionAction({ id: session.id, ...data })
      : await createSessionAction(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <Form {...sessionForm}>
      <form
        className="space-y-6"
        onSubmit={sessionForm.handleSubmit(submitSessionForm)}
      >
        <header className="flex flex-wrapper gap-2 items-center mb-6 justify-end">
          <CopyButton content={content} />
          <Button type="submit" size="sm">
            Salvar
          </Button>
        </header>

        <FormField
          control={sessionForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Título da sessão"
                  variant="transparent"
                  size="lg"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={sessionForm.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Digite o conteúdo da sessão..."
                  variant="transparent"
                  size="lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
