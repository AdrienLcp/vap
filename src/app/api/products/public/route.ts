import { nextResponse } from '@/infrastructure/api/api-lib'
import { ProductController } from '@/product/presentation/controllers/product-controller'

export const GET = async () => {
  return nextResponse(ProductController.findPublicProducts())
}
