export const ROUTES = {
  home: '/',

  admin: '/admin',
  adminCategories: '/admin/categories',
  adminProducts: '/admin/products',
  adminProduct: '/admin/products/:productId',

  profile: '/auth/profile',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  forbidden: '/auth/forbidden',
  unauthorized: '/auth/unauthorized',

  notFound: '/not-found'
} as const

export const DEFAULT_ROUTE = ROUTES.home

export const getAdminProductRoute = (productId: string) => {
  return ROUTES.adminProduct.replace(':productId', productId)
}
