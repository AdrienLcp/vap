const PARAMS = {
  categoryId: 'categoryId',
  productId: 'productId'
} as const

export const ROUTES = {
  home: '/',
  notFound: '/not-found',

  // Admin
  admin: '/admin',
  adminCategories: '/admin/categories',
  adminCategory: `/admin/categories/:${PARAMS.categoryId}`,
  adminCategoryCreation: '/admin/categories/create',
  adminProducts: '/admin/products',
  adminProductCreation: '/admin/products/create',
  adminProduct: `/admin/products/:${PARAMS.productId}`,

  // Auth
  profile: '/auth/profile',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  forbidden: '/auth/forbidden',
  unauthorized: '/auth/unauthorized',

  // Order
  order: '/order',

  // Public product
  product: `/products/:${PARAMS.productId}`
} as const

export const DEFAULT_ROUTE = ROUTES.home

export const getAdminCategoryRoute = (categoryId: string) => {
  return ROUTES.adminCategory.replace(`:${PARAMS.categoryId}`, categoryId)
}

export const getAdminProductRoute = (productId: string) => {
  return ROUTES.adminProduct.replace(`:${PARAMS.productId}`, productId)
}

export const getProductRoute = (productId: string) => {
  return ROUTES.product.replace(`:${PARAMS.productId}`, productId)
}
