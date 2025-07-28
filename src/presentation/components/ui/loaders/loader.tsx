import classNames from 'classnames'

import { Spinner } from '@/presentation/components/ui/loaders/spinner'

import './loader.sass'

export const Loader: React.FC<React.ComponentProps<'div'>> = ({ className, ...loaderRestProps }) => (
  <div className={classNames('loader', className)} {...loaderRestProps}>
    <Spinner />
  </div>
)
