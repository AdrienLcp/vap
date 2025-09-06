import { LoaderCircleIcon } from 'lucide-react'
import { VisuallyHidden } from 'react-aria-components'

import { t } from '@/infrastructure/i18n'

import './spinner.sass'

export const Spinner: React.FC = () => (
  <>
    <LoaderCircleIcon className='spinner' />
    <VisuallyHidden>{t('components.spinner.label')}</VisuallyHidden>
  </>
)
