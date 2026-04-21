import 'server-only'

import { eq } from 'drizzle-orm'

import { users } from '@/features/auth/infrastructure/auth-schema'
import { stripe } from '@/features/payment/infrastructure/payment-lib'
import { failure, type Result, success } from '@/helpers/result'
import { db } from '@/infrastructure/database'

const findOrCreateStripeCustomer = async (
  userId: string,
  userEmail: string,
  userName: string
): Promise<Result<string>> => {
  try {
    const [existing] = await db
      .select({ stripeCustomerId: users.stripeCustomerId })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (existing?.stripeCustomerId) {
      return success(existing.stripeCustomerId)
    }

    const customer = await stripe.customers.create({
      email: userEmail,
      metadata: { userId },
      name: userName
    })

    await db
      .update(users)
      .set({ stripeCustomerId: customer.id })
      .where(eq(users.id, userId))

    return success(customer.id)
  } catch (error) {
    console.error(
      'Unknown error in StripeCustomerRepository.findOrCreateStripeCustomer:',
      error
    )
    return failure()
  }
}

export const StripeCustomerRepository = {
  findOrCreateStripeCustomer
}
