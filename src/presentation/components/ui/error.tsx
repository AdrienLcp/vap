import classNames from 'classnames'
import { RefreshCwIcon } from 'lucide-react'

import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'

import './error.sass'

export const ErrorWrapper: React.FC<React.ComponentProps<'section'>> = ({ className, ...errorWrapperRestProps }) => (
  <section className={classNames('error-wrapper', className)} {...errorWrapperRestProps} />
)

export const ErrorTitle: React.FC<React.ComponentProps<'h1'>> = ({ className, ...errorTitleRestProps }) => (
  <h1 className={classNames('error-title', className)} {...errorTitleRestProps} />
)

export const ErrorDescription: React.FC<React.ComponentProps<'p'>> = ({ className, ...errorDescriptionRestProps }) => (
  <p className={classNames('error-description', className)} {...errorDescriptionRestProps} />
)

export const ErrorActions: React.FC<React.ComponentProps<'div'>> = ({ className, ...errorActionsRestProps }) => (
  <div className={classNames('error-actions', className)} {...errorActionsRestProps} />
)

type ErrorProps = {
  reset: () => void
}

export const Error: React.FC<ErrorProps> = ({ reset }) => (
  <ErrorWrapper className='error'>
    <ErrorTitle>{t('components.error.title')}</ErrorTitle>

    <ErrorDescription>{t('components.error.description')}</ErrorDescription>

    <Button
      Icon={<RefreshCwIcon />}
      onPress={reset}
      variant='filled'
    >
      {t('components.error.resetButton')}

      <span className='sr-only'>
        {t('components.error.title')}
      </span>
    </Button>
  </ErrorWrapper>
)
