import { loginUserSchema } from '@/core/application/auth/login-user.dto';
import { Link } from '@/i18n/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export const LoginForm = () => {
  const t = useTranslations('authForm');
  const tAuth = useTranslations('auth');

  const schema = useMemo(
    () =>
      loginUserSchema({
        email: {
          required: tAuth('validation.email.required'),
          invalid: tAuth('validation.email.invalid'),
        },
        password: {
          required: tAuth('validation.password.required'),
          min: tAuth('validation.password.min'),
        },
      }),
    [tAuth]
  );

  const loginForm = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isDirty } = loginForm.formState;

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <Form {...loginForm}>
        <form className="space-y-4" onSubmit={loginForm.handleSubmit(() => {})}>
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    size="lg"
                    placeholder="mestre@taverna.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input
                    size="lg"
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-white hover:text-ember 
                              transition-colors"
                  >
                    {t('forgotPassword')}
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
              disabled={!isDirty}
            >
              {t('enter')}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};
