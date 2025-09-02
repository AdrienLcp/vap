export const PARAMS = {
  categoryId: 'categoryId',
  productId: 'productId'
} as const

export const ROUTES = {
  home: '/',

  admin: '/admin',
  adminCategories: '/admin/categories',
  adminCategory: `/admin/categories/:${PARAMS.categoryId}`,
  adminProducts: '/admin/products',
  adminProductCreation: '/admin/create-product',
  adminProduct: `/admin/products/:${PARAMS.productId}`,

  profile: '/auth/profile',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  forbidden: '/auth/forbidden',
  unauthorized: '/auth/unauthorized',

  notFound: '/not-found'
} as const

export const DEFAULT_ROUTE = ROUTES.home

export const getAdminCategoryRoute = (categoryId: string) => {
  return ROUTES.adminCategory.replace(`:${PARAMS.categoryId}`, categoryId)
}

export const getAdminProductRoute = (productId: string) => {
  return ROUTES.adminProduct.replace(`:${PARAMS.productId}`, productId)
}
