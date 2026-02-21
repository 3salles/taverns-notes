'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  CreateSessionDTO,
  CreateSessionSchema,
} from '@/core/application/session/create-session.dto';

import { createSessionAction } from '@/app/actions/session.actions';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export const SessionForm = () => {
  const router = useRouter();
  const sessionForm = useForm<CreateSessionDTO>({
    resolver: zodResolver(CreateSessionSchema),
    defaultValues: {
      title: '',
      note: '',
    },
  });

  const submitSessionForm = async (data: CreateSessionDTO) => {
    const result = await createSessionAction(data);

    if (!result.success) {
      return;
    }

    router.refresh();
  };

  return (
    <Form {...sessionForm}>
      <form
        className="space-y-6"
        onSubmit={sessionForm.handleSubmit(submitSessionForm)}
      >
        <header className="flex flex-wrapper gap-2 items-center mb-6 justify-end">
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
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
