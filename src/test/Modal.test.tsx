import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'

import AddCustomerModal  from '#/components/customers/AddCustomerModal'
import type { Customer } from '#/types/customer'

describe('AddCustomerModal', () => {
  it('calls onClose when clicking close button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <AddCustomerModal onClose={onClose} onAdd={function (customer: Omit<Customer, 'id'>): void {
            throw new Error('Function not implemented.')
        } } />,
    )

  await user.click(
  screen.getByRole('button', {
    name: /cancel/i,
  }),
)

expect(onClose).toHaveBeenCalledOnce()

    
  })
})