import { BaseApi } from './base.api'
import type { Customer } from '#/types/customer'

export const customersApi =
  new BaseApi<Customer>(
    'http://localhost:3001/customers'
  )