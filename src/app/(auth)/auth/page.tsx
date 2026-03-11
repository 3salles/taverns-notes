'use client';

import { TomeScene } from '@/components/animations';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { BookIcon, GoogleIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'motion/react';
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
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
        radial-gradient(ellipse 60% 70% at 35% 55%, rgba(201,76,26,0.13) 0%, transparent 65%),
        radial-gradient(ellipse 40% 40% at 75% 20%, rgba(184,146,42,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 50% 60% at 15% 85%, rgba(100,50,10,0.15) 0%, transparent 55%)
      `,
          }}
        />
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-12">
          <motion.div
            className="absolute top-10 left-10 flex items-center gap-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <BookIcon className="text-ember" />
            <span className="font-display text-[1.05rem] font-bold">
              Taverns & Notes
            </span>
          </motion.div>

          <TomeScene />

          {/* quote */}
          <div className="w-full max-w-90 px-8 py-6 animate-fade-up">
            <p className="mx-auto mb-1 max-w-85 font-display italic text-text-dim leading-relaxed">
              Every great campaign begins with a single note written in the
              dark.
            </p>

            <cite className="font-body text-[0.7rem] uppercase tracking-[0.12em] text-text-muted not-italic">
              {"The Game Master's Creed"}
            </cite>
          </div>
        </div>
      </div>
      <div className="basis-px bg-linear-to-b from-transparent via-border-strong to-transparent" />
      <div className="relative flex w-[45%] items-center justify-center bg-surface overflow-hidden">
        <div
          className="pointer-events-none absolute right-0 top-0 h-50 w-50"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(201,76,26,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="w-full max-w-lg animate-fade-up px-8">
          <header>
            <h1 className="font-display text-3xl font-bold leading-tight mb-1">
              Bem-vindo de volta,
              <br />
              <em className="text-text-muted italic">Aventureiro!</em>
            </h1>
            <p className="mb-8 text-base text-text-dim">
              Entre para continuar sua campanha
            </p>
          </header>

          <Tabs defaultValue="login">
            <TabsList
              variant="line"
              className="mb-7 w-full border-b border-border"
            >
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <Form {...loginForm}>
                  <form className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              size="lg"
                              placeholder="mestre@taverna.com"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input
                              size="lg"
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-end">
                            <Link
                              href="/forgot-password"
                              className="text-sm text-white hover:text-ember 
                              transition-colors"
                            >
                              Esqueceu a senha?
                            </Link>
                          </div>
                        </FormItem>
                      )}
                    />

                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Button
                        type="submit"
                        className="w-full bg-ember hover:bg-ember-lite text-base 
                        h-12 mt-4"
                        size="lg"
                      >
                        Entrar na campanha
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>
            </TabsContent>
            <TabsContent value="signup">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <Form {...loginForm}>
                  <form className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seu nome</FormLabel>

                          <FormControl>
                            <Input
                              size="lg"
                              placeholder="Como te chamamos?"
                              {...field}
                            />
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
                            <Input
                              size="lg"
                              placeholder="mestre@taverna.com"
                              {...field}
                            />
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
                              size="lg"
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Button
                        type="submit"
                        className="w-full bg-ember hover:bg-ember-lite text-base 
                        h-12"
                        size="lg"
                      >
                        Criar conta
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>
            </TabsContent>
          </Tabs>

          <div
            className="my-5 flex items-center gap-3 text-sm tracking-[0.08em] 
          text-text-muted"
          >
            <div className="h-px flex-1 bg-border" />
            ou
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-sm
              border border-border-strong h-11 text-base text-text-dim
              transition-colors hover:border-text-dim hover:text-text cursor-pointer"
          >
            <GoogleIcon />
            Continuar com Google
          </button>
        </div>
      </div>
    </section>
  );
}
