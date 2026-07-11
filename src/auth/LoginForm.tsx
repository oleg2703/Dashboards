import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'

import  {loginSchema} from '#/validation/login.schema'
import type {LoginFormData} from '#/validation/login.schema'
import { useAuth } from '#/auth/useAuth'
import { toast } from 'react-toastify'
import { Button } from '#/components/ui/Button'
import { Input } from '#/components/ui/Input'


export default function LoginForm() {
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
    const success = await login(data.email, data.password)

    if (!success) {
      toast.error('Invalid email or password')
      return
    }

    toast.success('Welcome back!')

    navigate({
      to: '/dashboard',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label>Email</label>

       <Input
        type="email"
        placeholder="Email"
        {...register('email')}
      />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
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
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full"
      >
        Sign In
      </Button>
    </form>
  )
}