import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'

import { loginSchema, registrationSchema } from '#/validation/login.schema'
import type {
  LoginFormData,
  RegistrationFormData,
} from '#/validation/login.schema'
import { useAuth } from '#/auth/useAuth'
import { toast } from 'react-toastify'
import { Button } from '#/components/ui/Button'
import { Input } from '#/components/ui/Input'

export default function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(false)

  return isRegistering ? (
    <RegistrationForm onBack={() => setIsRegistering(false)} />
  ) : (
    <SignInForm onRegister={() => setIsRegistering(true)} />
  )
}

function SignInForm({ onRegister }: { onRegister: () => void }) {
  const { login } = useAuth()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    const error = await login(data.email, data.password)

    if (error) {
      toast.error(error)
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

        <Input
          autoComplete="email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>

        <Input
          autoComplete="current-password"
          type="password"
          placeholder="Password"
          {...register('password')}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        Sign In
      </Button>

      <button
        type="button"
        className="w-full text-sm text-primary underline"
        onClick={onRegister}
      >
        New here? Create an account
      </button>
    </form>
  )
}

function RegistrationForm({ onBack }: { onBack: () => void }) {
  const { register: registerUser } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit = async (data: RegistrationFormData) => {
    const result = await registerUser(data.name, data.email, data.password)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success(
      result.requiresEmailConfirmation
        ? 'Account created. Check your email to confirm it.'
        : 'Account created successfully.',
    )

    if (result.requiresEmailConfirmation) {
      onBack()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label>Name</label>
        <Input
          autoComplete="name"
          placeholder="Your name"
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label>Email</label>
        <Input
          autoComplete="email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <Input
          autoComplete="new-password"
          type="password"
          placeholder="At least 8 characters"
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label>Confirm password</label>
        <Input
          autoComplete="new-password"
          type="password"
          placeholder="Repeat password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        Create account
      </Button>

      <button
        type="button"
        className="w-full text-sm text-primary underline"
        onClick={onBack}
      >
        Already have an account? Sign in
      </button>
    </form>
  )
}
