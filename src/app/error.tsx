'use client'

import { Error } from '@/presentation/components/ui/error'

type ErrorPageProps = {
  reset: () => void
}

const ErrorPage: React.FC<ErrorPageProps> = ({ reset }) => <Error reset={reset} />
export default ErrorPage
