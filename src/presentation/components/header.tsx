'use client'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { AuthButton } from '@/features/auth/presentation/components/auth-button'
import { CartButton } from '@/features/cart/presentation/components/cart-button'
import { Logo } from '@/presentation/components/ui/logo'
import { Link } from '@/presentation/components/ui/pressables/link'

import './header.sass'

export const Header: React.FC = () => (
  <header className='header'>
    <Link className='home-link' href={DEFAULT_ROUTE}>
      <Logo />
    </Link>

    <div className='buttons'>
      <CartButton itemCount={0} />

      <AuthButton />
    </div>
  </header>
)
