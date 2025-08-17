import { PersonaMenu } from '@/auth/presentation/components/persona-menu'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { NavBar } from '@/presentation/components/nav-bar'
import { Logo } from '@/presentation/components/ui/logo'
import { Link } from '@/presentation/components/ui/pressables/link'

import './header.sass'

export const Header: React.FC = () => (
  <header className='header'>
    <Link className='home-link' href={DEFAULT_ROUTE}>
      <Logo />
    </Link>

    <div className='content'>
      <NavBar />

      <PersonaMenu />
    </div>
  </header>
)
