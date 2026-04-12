import type { NextRequest } from 'next/server'

import { AddressController } from '@/features/address/presentation/controllers/address-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type AddressRouteContext =
  RouteContext<'/api/addresses/[addressId]/set-default'>

export const PATCH = async (
  _request: NextRequest,
  context: AddressRouteContext
) => {
  const { addressId } = await context.params
  return nextResponse(AddressController.setUserDefaultAddress(addressId))
}
