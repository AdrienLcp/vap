'use client'

import { Fallback } from '@/presentation/components/ui/fallback'

type ErrorPageProps = {
  reset: () => void
}

const ErrorPage: React.FC<ErrorPageProps> = ({ reset }) => <Fallback reset={reset} />

export default ErrorPage
