import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '#/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('calls onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Save</Button>)

    await user.click(screen.getByRole('button', { name: /save/i }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled', () => {
    render(<Button disabled>Save</Button>)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Button loading>Save</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Loading...')
  })

  it('is disabled while loading', () => {
    render(<Button loading>Save</Button>)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders left icon', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">L</span>}>Save</Button>,
    )

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('renders right icon', () => {
    render(
      <Button rightIcon={<span data-testid="right-icon">R</span>}>Save</Button>,
    )

    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })
})
