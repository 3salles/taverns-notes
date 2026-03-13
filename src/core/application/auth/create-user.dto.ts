import z from 'zod';

export type CreateUserMessages = {
  name: { required: string; min: string };
  email: { required: string; invalid: string };
  password: { required: string; min: string };
};

export const createUserSchema = (messages: CreateUserMessages) =>
  z.object({
    name: z
      .string()
      .min(1, { message: messages.name.required })
      .min(2, { message: messages.name.min }),
    email: z
      .string()
      .min(1, { message: messages.email.required })
      .check(z.email({ error: messages.email.invalid })),
    password: z
      .string()
      .min(1, { message: messages.password.required })
      .min(8, { message: messages.password.min }),
  });

export type CreateUserDTO = z.infer<ReturnType<typeof createUserSchema>>;
