import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Modal } from '#/components/ui/Modal'

describe('Modal', () => {
  it('renders title and children', () => {
    render(
      <Modal title="Test Modal" onClose={vi.fn()}>
        <p>Hello World</p>
      </Modal>,
    )

    expect(screen.getByText('Test Modal')).toBeInTheDocument()

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('calls onClose when clicking close button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <Modal title="Test" onClose={onClose}>
        Content
      </Modal>,
    )

    await user.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    )

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when pressing Escape', () => {
    const onClose = vi.fn()

    render(
      <Modal title="Test" onClose={onClose}>
        Content
      </Modal>,
    )

    fireEvent.keyDown(window, {
      key: 'Escape',
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking backdrop', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <Modal title="Test" onClose={onClose}>
        Content
      </Modal>,
    )

    await user.click(screen.getByTestId('modal-backdrop'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
  it('renders footer', () => {
    render(
      <Modal title="Test" onClose={vi.fn()} footer={<button>Save</button>}>
        Content
      </Modal>,
    )

    expect(
      screen.getByRole('button', {
        name: /save/i,
      }),
    ).toBeInTheDocument()
  })
})
