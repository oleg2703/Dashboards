import type { ButtonHTMLAttributes, ReactNode } from 'react'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/cn'
import { buttonVariants } from './buttonVariants'

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Button({
  children,
  className,
  variant,
  size,
  loading,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon}

      {loading ? 'Loading...' : children}

      {rightIcon}
    </button>
  )
}
