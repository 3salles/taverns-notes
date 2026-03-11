'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function Auth() {
  const loginForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <section className="flex h-screen w-full bg-ink text-text font-body overflow-hidden">
      <div className="relative flex basis-[55%] items-center justify-center overflow-hidden">
        Left panel Illustration
      </div>
      <div className="basis-px bg-linear-to-b from-transparent via-border-strong to-transparent" />
      <div className="relative flex flex-1 items-center justify-center bg-surface overflow-hidden">
        <div
          className="pointer-events-none absolute right-0 top-0 h-50 w-50"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(201,76,26,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="w-full max-w-90 p-8 animate-fade-up">
          <header>
            <h1 className="font-display text-2xl font-bold leading-tight mb-1">
              Bem-vindo de volta, <br />
              <em className="text-text-dim italic">Aventureiro!</em>
            </h1>
            <p className="mb-8 text-[0.88rem] text-text-dim">
              Entre para continuar sua campanha
            </p>
          </header>

          <Tabs defaultValue="login">
            <TabsList variant="line" className="mb-7">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Form {...loginForm}>
                <form className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="mestre@taverna.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>

                        <Link
                          href="/forgot-password"
                          className="text-right text-xs text-text-muted hover:text-ember-lite transition-colors"
                        >
                          Esqueceu a senha?
                        </Link>

                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-ember hover:bg-ember-lite"
                  >
                    Entrar na campanha
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="signup">
              <Form {...loginForm}>
                <form className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seu nome</FormLabel>

                        <FormControl>
                          <Input placeholder="Como te chamamos?" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>

                        <FormControl>
                          <Input placeholder="mestre@taverna.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>

                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-ember hover:bg-ember-lite"
                  >
                    Criar conta
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div
            className="my-5 flex items-center gap-3 text-[0.76rem] 
          tracking-[0.08em] text-text-muted"
          >
            <div className="h-px flex-1 bg-border" />
            ou
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-sm
        border border-border-strong py-2.5 text-[0.85rem] text-text-dim
        transition-colors hover:border-text-dim hover:text-text"
          >
            Continuar com Google
          </button>
        </div>
      </div>
    </section>
  );
}
