'use client'

import { LogInIcon, MailIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { useAuth } from '@/features/auth/application/use-auth'
import { AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import type { AuthUserDTO } from '@/features/auth/domain/auth-entities'
import { SignInInfoSchema } from '@/features/auth/domain/auth-schemas'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { UserEmailField } from '@/features/auth/presentation/components/forms/user-email-field'
import { UserPasswordField } from '@/features/auth/presentation/components/forms/user-password-field'
import type { ValueOf } from '@/helpers/object'
import type { ValidationErrors } from '@/helpers/validation'
import {
  BAD_REQUEST_STATUS,
  NO_CONTENT_STATUS,
  OK_STATUS
} from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { RequiredFieldsMessage } from '@/presentation/components/forms/required-fields-message'
import { Button } from '@/presentation/components/ui/pressables/button'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'

type SignInFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const SignInForm: React.FC = () => {
  const [isUserAuthenticationLoading, setIsUserAuthenticationLoading] =
    useState(false)
  const [signInFormErrors, setSignInFormErrors] =
    useState<SignInFormErrors>(null)
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null)
  const [isResendingVerification, setIsResendingVerification] = useState(false)

  const { setUser } = useAuth()
  const router = useRouter()

  const onSignInSuccess = useCallback(
    (authenticatedUser: AuthUserDTO) => {
      setUser(authenticatedUser)
      router.push(DEFAULT_ROUTE)
    },
    [router, setUser]
  )

  const onSignInBadRequest = useCallback(
    (error: 'INVALID_CREDENTIALS' | 'EMAIL_NOT_VERIFIED', email: string) => {
      if (error === 'EMAIL_NOT_VERIFIED') {
        setSignInFormErrors({
          form: t('auth.signIn.errors.emailNotVerified')
        })
        setUnverifiedEmail(email)
        return
      }

      setSignInFormErrors({ form: t('auth.signIn.errors.invalidCredentials') })
      setUnverifiedEmail(null)
    },
    []
  )

  const resendVerificationEmail = useCallback(async () => {
    if (!unverifiedEmail) return

    setIsResendingVerification(true)
    const response = await AuthClient.sendVerificationEmail(unverifiedEmail)
    setIsResendingVerification(false)

    if (response.status === NO_CONTENT_STATUS) {
      ToastService.success(t('auth.signIn.resendVerification.success'))
      setUnverifiedEmail(null)
      setSignInFormErrors(null)
      return
    }

    ToastService.error(t('auth.signIn.errors.unknown'))
  }, [unverifiedEmail])

  const onSignInFormSubmit = useCallback(
    async (formData: FormData) => {
      setIsUserAuthenticationLoading(true)
      setSignInFormErrors(null)
      setUnverifiedEmail(null)

      const credentials = {
        email: formData.get(AUTH_FORM_FIELDS.EMAIL),
        password: formData.get(AUTH_FORM_FIELDS.PASSWORD)
      }

      const credentialsValidation = SignInInfoSchema.safeParse(credentials)

      if (!credentialsValidation.success) {
        onSignInBadRequest('INVALID_CREDENTIALS', '')
        setIsUserAuthenticationLoading(false)
        return
      }

      const signInResponse = await AuthClient.emailSignIn(
        credentialsValidation.data
      )

      setIsUserAuthenticationLoading(false)

      switch (signInResponse.status) {
        case OK_STATUS:
          onSignInSuccess(signInResponse.data)
          break
        case BAD_REQUEST_STATUS:
          onSignInBadRequest(
            signInResponse.issues,
            credentialsValidation.data.email
          )
          break
        default:
          setSignInFormErrors({ form: t('auth.signIn.errors.unknown') })
          break
      }
    },
    [onSignInBadRequest, onSignInSuccess]
  )

  return (
    <Form onSubmit={onSignInFormSubmit} validationErrors={signInFormErrors}>
      <FieldSet isDisabled={isUserAuthenticationLoading}>
        <UserEmailField />

        <UserPasswordField />
      </FieldSet>

      <RequiredFieldsMessage />

      <FormError errors={signInFormErrors?.form} />

      {unverifiedEmail !== null && (
        <Button
          Icon={<MailIcon aria-hidden />}
          isPending={isResendingVerification}
          onPress={resendVerificationEmail}
          variant='transparent'
        >
          {t('auth.signIn.resendVerification.label')}
        </Button>
      )}

      <SubmitButton
        Icon={<LogInIcon aria-hidden />}
        isPending={isUserAuthenticationLoading}
      >
        {({ isPending }) =>
          t(`auth.signIn.submit.${isPending ? 'loading' : 'label'}`)
        }
      </SubmitButton>
    </Form>
  )
}
