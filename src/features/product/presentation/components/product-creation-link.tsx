'use client'

import { PlusIcon } from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link, type LinkProps } from '@/presentation/components/ui/pressables/link'

export const ProductCreationLink: React.FC<Partial<LinkProps>> = (productCreationLinkProps) => (
  <Link
    href={ROUTES.adminProductCreation}
    Icon={<PlusIcon aria-hidden />}
    variant='filled'
    {...productCreationLinkProps}
  >
    {t('product.creation.link')}
  </Link>
)
