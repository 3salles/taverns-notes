import { z } from 'zod';

export const createSessionSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  note: z.string().min(1, 'Conteúdo é obrigatório'),
});

export type CreateSessionDTO = z.infer<typeof createSessionSchema>;
