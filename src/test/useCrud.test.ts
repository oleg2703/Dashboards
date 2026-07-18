import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useCrud } from '#/hooks/useCrud'

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('useCrud', () => {
  it('calls create mutation', () => {
    const mutate = vi.fn()

    const { result } = renderHook(() =>
      useCrud({
        entityName: 'Product',

        createMutation: {
          mutate,
        } as any,

        updateMutation: {
          mutate: vi.fn(),
        } as any,

        deleteMutation: {
          mutate: vi.fn(),
        } as any,
      }),
    )

    const product = {
      name: 'MacBook',
      price: 2000,
      stock: 10,
      status: 'Active',
      description: '',
    }

    act(() => {
      result.current.handleCreate(product)
    })

    expect(mutate).toHaveBeenCalledTimes(1)
    expect(mutate).toHaveBeenCalledWith(product, expect.any(Object))
  })

  it('calls update mutation', () => {
    const mutate = vi.fn()

    const { result } = renderHook(() =>
      useCrud({
        entityName: 'Product',

        createMutation: {
          mutate: vi.fn(),
        } as any,

        updateMutation: {
          mutate,
        } as any,

        deleteMutation: {
          mutate: vi.fn(),
        } as any,
      }),
    )

    const product = {
      id: 1,
      name: 'MacBook',
      price: 2000,
      stock: 10,
      status: 'Active',
      description: '',
    }

    act(() => {
      result.current.handleUpdate(product)
    })

    expect(mutate).toHaveBeenCalledWith(product, expect.any(Object))
  })

  it('calls delete mutation', () => {
    const mutate = vi.fn()

    const { result } = renderHook(() =>
      useCrud({
        entityName: 'Product',

        createMutation: {
          mutate: vi.fn(),
        } as any,

        updateMutation: {
          mutate: vi.fn(),
        } as any,

        deleteMutation: {
          mutate,
        } as any,
      }),
    )

    act(() => {
      result.current.handleDelete(1)
    })

    expect(mutate).toHaveBeenCalledWith(1, expect.any(Object))
  })
})
