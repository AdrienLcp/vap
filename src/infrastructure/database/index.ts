import 'server-only'

import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '@/infrastructure/database/generated'
import { SERVER_ENV } from '@/infrastructure/env/server'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const adapter = new PrismaPg({ connectionString: SERVER_ENV.DATABASE_URL })

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export const AddressDatabase = prisma.address
export const CartDatabase = prisma.cartItem
export const CategoryDatabase = prisma.category
export const OrderDatabase = prisma.order
export const OrderItemDatabase = prisma.orderItem
export const PaymentMethodDatabase = prisma.paymentMethod
export const ProductDatabase = prisma.product
export const UserDatabase = prisma.user

export type EntitySelectedFields<T> = Partial<Record<keyof T, true>>
