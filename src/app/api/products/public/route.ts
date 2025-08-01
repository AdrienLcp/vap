import { nextResponse } from '@/infrastructure/api/api-lib'
import { ProductController } from '@/product/product-controller'

export const GET = async () => {
  return nextResponse(ProductController.findPublicProducts())
}
