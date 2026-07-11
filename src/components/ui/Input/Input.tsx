import {
  forwardRef
  
} from 'react'
import type {InputHTMLAttributes} from 'react';

import type { VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/cn'
import { inputVariants } from './inputVariants'

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(function Input(
  {
    className,
    variant,
    inputSize,
    ...props
  },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        inputVariants({
          variant,
          inputSize,
        }),
        className,
      )}
      {...props}
    />
  )
})