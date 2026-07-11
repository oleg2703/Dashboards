import { cva } from 'class-variance-authority'

export const inputVariants = cva(
  [
    'flex',
    'w-full',
    'rounded-lg',
    'border',
    'bg-background',
    'px-3',
    'py-2',
    'text-sm',
    'outline-none',
    'transition-colors',
    'placeholder:text-muted-foreground',
    'focus:border-blue-500',
    'focus:ring-2',
    'focus:ring-blue-500/20',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      },

      inputSize: {
        sm: 'h-9',
        md: 'h-10',
        lg: 'h-12',
      },
    },

    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  },
)