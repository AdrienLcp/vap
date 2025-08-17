import { CircleIcon } from 'lucide-react'

import { NavBar } from '@/presentation/components/nav-bar'

import './header.sass'

export const Header: React.FC = () => (
  <header className='header'>
    <CircleIcon className='logo' />

    <NavBar />
  </header>
)
