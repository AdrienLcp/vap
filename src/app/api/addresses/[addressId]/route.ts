import type { NextRequest } from 'next/server'

import { AddressController } from '@/features/address/presentation/controllers/address-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type AddressRouteContext = RouteContext<'/api/addresses/[addressId]'>

export const DELETE = async (_request: NextRequest, context: AddressRouteContext) => {
  const { addressId } = await context.params
  return nextResponse(AddressController.deleteUserAddress(addressId))
}

export const GET = async (_request: NextRequest, context: AddressRouteContext) => {
  const { addressId } = await context.params
  return nextResponse(AddressController.findUserAddress(addressId))
}

export const PATCH = async (request: NextRequest, context: AddressRouteContext) => {
  const { addressId } = await context.params
  return nextResponse(AddressController.updateUserAddress(addressId, request))
}
