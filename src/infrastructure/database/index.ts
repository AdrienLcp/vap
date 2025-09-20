import 'server-only'

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export const CartDatabase = prisma.cartItem
export const CategoryDatabase = prisma.category
export const ProductDatabase = prisma.product
export const UserDatabase = prisma.user

export type EntitySelectedFields<T> = Record<keyof T, true>
