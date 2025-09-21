import classNames from 'classnames'
import { RefreshCwIcon } from 'lucide-react'
import { VisuallyHidden } from 'react-aria-components'

import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'

import './fallback.sass'

export const FallbackWrapper: React.FC<React.ComponentProps<'section'>> = ({ className, ...errorWrapperRestProps }) => (
  <section className={classNames('fallback-wrapper', className)} {...errorWrapperRestProps} />
)

export const FallbackTitle: React.FC<React.ComponentProps<'h1'>> = ({ className, ...errorTitleRestProps }) => (
  <h1 className={classNames('fallback-title', className)} {...errorTitleRestProps} />
)

export const FallbackDescription: React.FC<React.ComponentProps<'p'>> = ({ className, ...errorDescriptionRestProps }) => (
  <p className={classNames('fallback-description', className)} {...errorDescriptionRestProps} />
)

export const FallbackActions: React.FC<React.ComponentProps<'div'>> = ({ className, ...errorActionsRestProps }) => (
  <div className={classNames('fallback-actions', className)} {...errorActionsRestProps} />
)

type FallbackProps = {
  reset: () => void
}

export const Fallback: React.FC<FallbackProps> = ({ reset }) => (
  <FallbackWrapper>
    <FallbackTitle>{t('components.fallback.title')}</FallbackTitle>

    <FallbackDescription>{t('components.fallback.description')}</FallbackDescription>

    <Button
      className='fallback-button'
      Icon={<RefreshCwIcon aria-hidden />}
      onPress={reset}
      variant='filled'
    >
      {t('components.fallback.resetButton')}

      <VisuallyHidden>
        {t('components.fallback.title')}
      </VisuallyHidden>
    </Button>
  </FallbackWrapper>
)
