import { LoaderCircleIcon } from 'lucide-react'

import './spinner.sass'
import { t } from '@/infrastructure/i18n'

export const Spinner: React.FC = () => (
  <>
    <LoaderCircleIcon className='spinner' />
    <span className='sr-only'>{t('components.spinner.label')}</span>
  </>
)
