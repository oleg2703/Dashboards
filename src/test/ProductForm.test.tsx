import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import AddProductModal from '#/components/products/AddProductModal'

describe('ProductForm', () => {
  it('submits valid form', async () => {
    const user = userEvent.setup()

    const onAdd = vi.fn()
    const onClose = vi.fn()

    render(<AddProductModal onAdd={onAdd} onClose={onClose} />)

    await user.type(screen.getByPlaceholderText(/product name/i), 'MacBook Pro')

    await user.clear(screen.getByPlaceholderText(/price/i))

    await user.type(screen.getByPlaceholderText(/price/i), '2500')

    await user.clear(screen.getByPlaceholderText(/stock/i))

    await user.type(screen.getByPlaceholderText(/stock/i), '10')

    await user.click(
      screen.getByRole('button', {
        name: /add product/i,
      }),
    )

    expect(onAdd).toHaveBeenCalledTimes(1)

    expect(onAdd).toHaveBeenCalledWith({
      name: 'MacBook Pro',
      price: 2500,
      stock: 10,
      status: 'Active',
      description: '',
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('shows validation errors', async () => {
    const user = userEvent.setup()

    render(<AddProductModal onAdd={vi.fn()} onClose={vi.fn()} />)

    await user.click(
      screen.getByRole('button', {
        name: /add product/i,
      }),
    )

    expect(screen.getByText(/name/i)).toBeInTheDocument()
  })
})
