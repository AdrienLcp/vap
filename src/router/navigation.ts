const PARAMS = {
  productId: 'productId',
}

export type Params = typeof PARAMS

export const ROUTES = {
  home: '/',
  cart: '/cart',
  product: (productId: string) => `/product/${productId}`,

  signUp: '/auth/sign-up',
}

export const DEFAULT_ROUTE = ROUTES.home
