import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'rounded-lg',
    'font-medium',
    'transition-colors',
    'focus-visible:outline-none',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-blue-600 text-white hover:bg-blue-700',

        outline:
          'border border-border bg-transparent hover:bg-muted',

        secondary:
          'bg-muted hover:bg-muted/80',

        danger:
          'bg-red-600 text-white hover:bg-red-700',

        ghost:
          'hover:bg-muted',
      },

      size: {
        sm: 'h-8 px-3 text-sm',

        md: 'h-10 px-4',

        lg: 'h-12 px-6',

        icon: 'h-10 w-10',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)