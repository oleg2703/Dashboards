import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'

import { loginSchema } from '#/validation/login.schema'
import type { LoginFormData } from '#/validation/login.schema'
import { useAuth } from '#/auth/useAuth'
import { toast } from 'react-toastify'
import { Button } from '#/components/ui/Button'
import { Input } from '#/components/ui/Input'

export default function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(false)
  const { login, register: registerUser } = useAuth()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    const error = isRegistering
      ? await registerUser(data.email, data.password)
      : await login(data.email, data.password)

    if (error) {
      toast.error(error)
      return
    }

    if (isRegistering) {
      toast.success(
        'Account created. Check your email to confirm your account.',
      )
      setIsRegistering(false)
      return
    }

    toast.success('Welcome back!')

    navigate({
      to: '/dashboard',
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label>Email</label>

        <Input type="email" placeholder="Email" {...register('email')} />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>

        <Input
          type="password"
          placeholder="Password"
          {...register('password')}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        {isRegistering ? 'Create account' : 'Sign In'}
      </Button>

      <button
        type="button"
        className="w-full text-sm text-primary underline"
        onClick={() => setIsRegistering((current) => !current)}
      >
        {isRegistering
          ? 'Already have an account? Sign in'
          : 'New here? Create an account'}
      </button>
    </form>
  )
}
