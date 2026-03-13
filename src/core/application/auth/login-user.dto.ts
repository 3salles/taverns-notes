import z from 'zod';

export type LoginUserMessages = {
  email: { required: string; invalid: string };
  password: { required: string; min: string };
};

export const loginUserSchema = (messages: LoginUserMessages) =>
  z.object({
    email: z
      .string()
      .min(1, { message: messages.email.required })
      .check(z.email({ error: messages.email.invalid })),
    password: z
      .string()
      .min(1, { message: messages.password.required })
      .min(8, { message: messages.password.min }),
  });

export type LoginUserDTO = z.infer<ReturnType<typeof loginUserSchema>>;
