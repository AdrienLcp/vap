import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const GET = async () => {
  return nextResponse(ProductController.findPublicProducts())
}
