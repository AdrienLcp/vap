const PARAMS = {
  categoryId: 'categoryId',
  orderId: 'orderId',
  productId: 'productId',
  userId: 'userId'
} as const

export const ROUTES = {
  home: '/',
  notFound: '/not-found',

  // Admin
  admin: '/admin',
  adminCategories: '/admin/categories',
  adminCategory: `/admin/categories/:${PARAMS.categoryId}`,
  adminCategoryCreation: '/admin/categories/create',
  adminOrders: '/admin/orders',
  adminOrder: `/admin/orders/:${PARAMS.orderId}`,
  adminProduct: `/admin/products/:${PARAMS.productId}`,
  adminProducts: '/admin/products',
  adminProductCreation: '/admin/products/create',
  adminUser: `/admin/users/:${PARAMS.userId}`,
  adminUsers: '/admin/users',

  // Auth
  profile: '/auth/profile',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  forbidden: '/auth/forbidden',
  unauthorized: '/auth/unauthorized',

  // Orders
  order: `/orders/${PARAMS.orderId}`,
  ordering: '/orders/ordering',
  orders: '/orders',

  // Products
  product: `/products/:${PARAMS.productId}`
} as const

export const DEFAULT_ROUTE = ROUTES.home

export const getAdminCategoryRoute = (categoryId: string) => {
  return ROUTES.adminCategory.replace(`:${PARAMS.categoryId}`, categoryId)
}

export const getAdminProductRoute = (productId: string) => {
  return ROUTES.adminProduct.replace(`:${PARAMS.productId}`, productId)
}

export const getAdminUserRoute = (userId: string) => {
  return ROUTES.adminUser.replace(`:${PARAMS.userId}`, userId)
}

export const getProductRoute = (productId: string) => {
  return ROUTES.product.replace(`:${PARAMS.productId}`, productId)
}
