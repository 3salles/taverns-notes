import { z } from 'zod';

export const updateSessionSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  title: z.string().min(1, 'Título é obrigatório'),
  note: z.string().min(1, 'Conteúdo é obrigatório'),
});

export type UpdateSessionDTO = z.infer<typeof updateSessionSchema>;
