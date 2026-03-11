'use client';

import { AuthHero, LoginForm, RegisterForm } from '@/components/auth';
import { GoogleIcon } from '@/components/ui/icons';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

export default function Auth() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <section className="flex h-screen w-full bg-ink text-text font-body overflow-hidden">
      <AuthHero tab={tab} />

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

          <Tabs
            value={tab}
            onValueChange={(tab) => setTab(tab as 'login' | 'signup')}
          >
            <TabsList
              variant="line"
              className="mb-7 w-full border-b border-border"
            >
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar conta</TabsTrigger>
            </TabsList>

            <motion.div layout className="relative min-h-75">
              <AnimatePresence mode="wait">
                {tab === 'login' ? <LoginForm /> : <RegisterForm />}
              </AnimatePresence>
            </motion.div>
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
            {tab === 'login' ? 'Continuar com Google' : 'Cadastrar com Google'}
          </button>
        </div>
      </div>
    </section>
  );
}
