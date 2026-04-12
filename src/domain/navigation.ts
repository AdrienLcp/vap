const PARAMS = {
  addressId: 'addressId',
  categoryId: 'categoryId',
  orderId: 'orderId',
  productId: 'productId',
  userId: 'userId'
} as const

export const ROUTES = {
  address: `/auth/addresses/:${PARAMS.addressId}`,
  addressCreation: '/auth/addresses/create',

  admin: '/admin',
  adminCategories: '/admin/categories',
  adminCategory: `/admin/categories/:${PARAMS.categoryId}`,
  adminCategoryCreation: '/admin/categories/create',
  adminEmails: '/admin/emails',
  adminOrder: `/admin/orders/:${PARAMS.orderId}`,
  adminOrders: '/admin/orders',
  adminProduct: `/admin/products/:${PARAMS.productId}`,
  adminProductCreation: '/admin/products/create',
  adminProducts: '/admin/products',
  adminUser: `/admin/users/:${PARAMS.userId}`,
  adminUsers: '/admin/users',

  checkout: '/checkout',
  checkoutCancel: '/checkout/cancel',
  checkoutSuccess: '/checkout/success',

  forbidden: '/auth/forbidden',
  home: '/',
  notFound: '/not-found',

  order: `/orders/${PARAMS.orderId}`,
  ordering: '/orders/ordering',
  orders: '/orders',

  product: `/products/:${PARAMS.productId}`,

  profile: '/auth/profile',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  unauthorized: '/auth/unauthorized'
} as const

export const DEFAULT_ROUTE = ROUTES.home

export const getAddressRoute = (addressId: string) => {
  return ROUTES.address.replace(`:${PARAMS.addressId}`, addressId)
}

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
