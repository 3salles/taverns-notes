import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap',
    'rounded-sm',
    'font-medium',
    'text-sm',
    'transition-colors',
    'cursor-pointer',
    'outline-none',

    'disabled:opacity-50',
    'disabled:cursor-not-allowed',

    '[&_svg]:pointer-events-none',
    '[&_svg:not([class*="size-"])]:size-4',
    '[&_svg]:shrink-0',

    'focus-visible:ring-4',
    'focus-visible:ring-ember/20',
  ],
  {
    variants: {
      variant: {
        default: ['bg-ember', 'text-text', 'hover:bg-ember/90'],

        outline: [
          'border',
          'border-border-strong',
          'bg-surface',
          'text-text',
          'hover:bg-surface-2',
        ],

        ghost: ['text-text', 'hover:bg-surface'],

        link: ['text-ember', 'underline-offset-4', 'hover:underline'],

        destructive: ['bg-red-700', 'text-white', 'hover:bg-red-600'],
      },

      size: {
        sm: 'h-8 px-3 text-sm',
        default: 'h-9 px-4',
        lg: 'h-11 px-6 text-base',
        icon: 'h-9 w-9',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
