import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import AddProductModal from '#/components/products/AddProductModal'

describe('AddProductModal', () => {
  it('calls onAdd when submitting valid form', async () => {
    const user = userEvent.setup()

    const onAdd = vi.fn()
    const onClose = vi.fn()

    render(
      <AddProductModal
        onAdd={onAdd}
        onClose={onClose}
      />
    )

    await user.type(
      screen.getByPlaceholderText(/product name/i),
      'MacBook'
    )

    await user.type(
      screen.getByPlaceholderText(/price/i),
      '2500'
    )

    await user.type(
      screen.getByPlaceholderText(/stock/i),
      '10'
    )

    await user.click(
      screen.getByRole('button', {
        name: /add product/i,
      })
    )

    expect(onAdd).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})