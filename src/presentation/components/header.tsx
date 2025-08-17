import { AuthButton } from '@/auth/presentation/components/auth-button'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { Logo } from '@/presentation/components/ui/logo'
import { Link } from '@/presentation/components/ui/pressables/link'

import './header.sass'

export const Header: React.FC = () => (
  <header className='header'>
    <Link className='home-link' href={DEFAULT_ROUTE}>
      <Logo />
    </Link>

    <AuthButton />
  </header>
)
