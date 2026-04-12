import { Stripe } from 'stripe'

import { SERVER_ENV } from '@/infrastructure/env/server'

export const stripe = new Stripe(SERVER_ENV.STRIPE_API_KEY)
