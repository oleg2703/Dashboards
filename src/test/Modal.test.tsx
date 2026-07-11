import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'

import { Modal } from '#/components/ui/Modal/Modal.tsx'


describe('Modal', () => {
  it('calls onClose when clicking close button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <Modal onClose={onClose}  title={''} children={undefined} />,
    )

    await user.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    )

    expect(onClose).toHaveBeenCalledOnce()
  })
})