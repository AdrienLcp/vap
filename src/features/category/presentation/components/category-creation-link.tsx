'use client'

import { PlusIcon } from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link, type LinkProps } from '@/presentation/components/ui/pressables/link'

export const CategoryCreationLink: React.FC<Partial<LinkProps>> = (categoryCreationLinkProps) => (
  <Link
    href={ROUTES.adminCategoryCreation}
    Icon={<PlusIcon aria-hidden />}
    variant='filled'
    {...categoryCreationLinkProps}
  >
    {t('category.creation.link')}
  </Link>
)
