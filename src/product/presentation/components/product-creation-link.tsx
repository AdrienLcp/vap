'use client'

import { PlusIcon } from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link, type LinkProps } from '@/presentation/components/ui/pressables/link'

export const ProductCreationLink: React.FC<Partial<LinkProps>> = (productCreationLinkProps) => (
  <Link
    {...productCreationLinkProps}
    href={ROUTES.adminProductCreation}
    Icon={<PlusIcon />}
    variant='filled'
  >
    {t('product.creation.link')}
  </Link>
)
