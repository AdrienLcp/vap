'use client'

import { AuthButton } from '@/auth/presentation/components/auth-button'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { Logo } from '@/presentation/components/ui/logo'
import { Link } from '@/presentation/components/ui/pressables/link'

import './header.sass'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

const test = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam similique laborum, dolorem aliquid reiciendis enim deserunt tempora quod cupiditate dolore ipsam, magni facere, doloremque laudantium recusandae! Eos assumenda aperiam, itaque aut dolor ad, obcaecati quis temporibus totam quod natus atque, repellendus mollitia nostrum dolorem ex sed! Odio nihil quae architecto!'
const test2 = 'Lorem ipsum dolor sit amet'

export const Header: React.FC = () => (
  <header className='header'>
    <Link className='home-link' href={DEFAULT_ROUTE}>
      <Logo />
    </Link>

    <Button onPress={() => ToastService.success(test, { duration: 50000 })}>
      toast
    </Button>

    <Button onPress={() => ToastService.success(test2, { duration: 50000 })}>
      toast2
    </Button>

    <AuthButton />
  </header>
)
