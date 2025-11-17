import type { NextRequest } from 'next/server'

import { AddressController } from '@/features/address/presentation/controllers/address-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const GET = async () => {
  return nextResponse(AddressController.findUserAddresses())
}

export const POST = async (request: NextRequest) => {
  return nextResponse(AddressController.createUserAddress(request))
}
