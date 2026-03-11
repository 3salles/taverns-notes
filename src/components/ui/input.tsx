import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  [
    'w-full',
    'bg-ink',
    'border border-border-strong',
    'rounded-sm',
    'px-3 py-2',
    'text-text',
    'placeholder:text-text-muted',
    'font-body',
    'text-sm',
    'transition-colors',
    'outline-none',
    'focus:border-ember',
    'focus:ring-4',
    'focus:ring-ember/10',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        default: '',
        transparent: [
          'bg-transparent',
          'border-border',
          'placeholder:text-text-muted',
        ],
      },

      size: {
        sm: 'h-8 text-sm',
        default: 'h-9 text-sm',
        lg: 'h-11 text-base',
      },

      readOnly: {
        true: ['cursor-default', 'focus:border-border-strong', 'focus:ring-0'],
        false: '',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
      readOnly: false,
    },
  }
);

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants>;

function Input({
  variant,
  size,
  className,
  type,
  readOnly,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      readOnly={readOnly}
      className={cn(inputVariants({ variant, size, readOnly }), className)}
      {...props}
    />
  );
}

export { Input };
