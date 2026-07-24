import { describe, expect, it } from 'vitest'

import { buildCustomerSummaries } from '#/api/customers.api'
import type { Customer } from '#/types/customer'
import type { Order } from '#/types/order'

describe('buildCustomerSummaries', () => {
  it('derives ordersCount and totalSpent from the customers orders', () => {
    const customers: Customer[] = [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        isActive: true,
        createdAt: '2024-01-01',
        ordersCount: 0,
        totalSpent: 0,
      },
      {
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        isActive: false,
        createdAt: '2024-01-02',
        ordersCount: 0,
        totalSpent: 0,
      },
    ]

    const orders: Order[] = [
      {
        id: 10,
        customerId: 1,
        amount: 125,
        status: 'paid',
        date: '2024-01-03',
      },
      {
        id: 11,
        customerId: 1,
        amount: 75,
        status: 'pending',
        date: '2024-01-04',
      },
      {
        id: 12,
        customerId: 2,
        amount: 40,
        status: 'paid',
        date: '2024-01-05',
      },
    ]

    expect(buildCustomerSummaries(customers, orders)).toEqual([
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        isActive: true,
        createdAt: '2024-01-01',
        ordersCount: 2,
        totalSpent: 200,
      },
      {
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        isActive: false,
        createdAt: '2024-01-02',
        ordersCount: 1,
        totalSpent: 40,
      },
    ])
  })

  it('keeps zero values for customers with no orders', () => {
    const customers: Customer[] = [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        isActive: true,
        createdAt: '2024-01-01',
        ordersCount: 0,
        totalSpent: 0,
      },
    ]

    expect(buildCustomerSummaries(customers, [])).toEqual([
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        isActive: true,
        createdAt: '2024-01-01',
        ordersCount: 0,
        totalSpent: 0,
      },
    ])
  })

  it('ignores orders for customers that are not in the list', () => {
    const customers: Customer[] = [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        isActive: true,
        createdAt: '2024-01-01',
        ordersCount: 0,
        totalSpent: 0,
      },
    ]

    const orders: Order[] = [
      {
        id: 10,
        customerId: 99,
        amount: 150,
        status: 'paid',
        date: '2024-01-03',
      },
    ]

    expect(buildCustomerSummaries(customers, orders)).toEqual([
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        isActive: true,
        createdAt: '2024-01-01',
        ordersCount: 0,
        totalSpent: 0,
      },
    ])
  })
})
