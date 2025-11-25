'use client'

import { SaveIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { ROUTES } from '@/domain/navigation'
import { ADDRESS_ERRORS, ADDRESS_FORM_FIELDS } from '@/features/address/domain/address-constants'
import type {
  AddressCreationData,
  AddressField,
  AddressFormErrors
} from '@/features/address/domain/address-entities'
import { AddressCreationSchema } from '@/features/address/domain/address-schemas'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { AddressCityField } from '@/features/address/presentation/components/forms/address-city-field'
import { AddressCountryField } from '@/features/address/presentation/components/forms/address-country-field'
import { AddressDefaultSwitch } from '@/features/address/presentation/components/forms/address-default-switch'
import { AddressPostalCodeField } from '@/features/address/presentation/components/forms/address-postal-code-field'
import { AddressStreetField } from '@/features/address/presentation/components/forms/address-street-field'
import type { Issues } from '@/helpers/validation'
import { BAD_REQUEST_STATUS, CREATED_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { Link } from '@/presentation/components/ui/pressables/link'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'

export const AddressCreationForm: React.FC = () => {
  const [isAddressCreationLoading, setIsAddressCreationLoading] = useState(false)
  const [addressFormErrors, setAddressFormErrors] = useState<AddressFormErrors>(null)

  const onAddressValidationError = useCallback((issues: Issues<AddressCreationData>) => {
    const formErrors: string[] = []
    const cityErrors: string[] = []
    const streetErrors: string[] = []
    const postalCodeErrors: string[] = []
    const countryErrors: string[] = []

    for (const issue of issues) {
      switch (issue.message) {
        case ADDRESS_ERRORS.INVALID_CITY:
          cityErrors.push(t('address.fields.city.invalid'))
          break
        case ADDRESS_ERRORS.INVALID_STREET:
          streetErrors.push(t('address.fields.street.invalid'))
          break
        case ADDRESS_ERRORS.INVALID_POSTAL_CODE:
          postalCodeErrors.push(t('address.fields.postalCode.invalid'))
          break
        case ADDRESS_ERRORS.INVALID_COUNTRY:
          countryErrors.push(t('address.fields.country.invalid'))
          break
        default:
          formErrors.push(t('address.create.error'))
      }
    }

    setAddressFormErrors({
      form: formErrors,
      [ADDRESS_FORM_FIELDS.CITY]: cityErrors,
      [ADDRESS_FORM_FIELDS.COUNTRY]: countryErrors,
      [ADDRESS_FORM_FIELDS.POSTAL_CODE]: postalCodeErrors,
      [ADDRESS_FORM_FIELDS.STREET]: streetErrors
    })
  }, [])

  const onAddressCreationFormSubmit = useCallback(
    async (formData: FormData) => {
      setIsAddressCreationLoading(true)
      setAddressFormErrors(null)

      const addressCreationData: Record<AddressField, unknown> = {
        [ADDRESS_FORM_FIELDS.CITY]: formData.get(ADDRESS_FORM_FIELDS.CITY),
        [ADDRESS_FORM_FIELDS.COUNTRY]: formData.get(ADDRESS_FORM_FIELDS.COUNTRY),
        [ADDRESS_FORM_FIELDS.IS_DEFAULT]: formData.get(ADDRESS_FORM_FIELDS.IS_DEFAULT) === 'on',
        [ADDRESS_FORM_FIELDS.POSTAL_CODE]: formData.get(ADDRESS_FORM_FIELDS.POSTAL_CODE),
        [ADDRESS_FORM_FIELDS.STREET]: formData.get(ADDRESS_FORM_FIELDS.STREET)
      }

      const addressCreationValidation = AddressCreationSchema.safeParse(addressCreationData)

      if (!addressCreationValidation.success) {
        onAddressValidationError(addressCreationValidation.error.issues)
        setIsAddressCreationLoading(false)
        return
      }

      const addressCreationResponse = await AddressClient.createUserAddress(
        addressCreationValidation.data
      )

      switch (addressCreationResponse.status) {
        case CREATED_STATUS:
          ToastService.success(t('address.create.success'))
          break
        case BAD_REQUEST_STATUS:
          onAddressValidationError(addressCreationResponse.issues)
          break
        default:
          setAddressFormErrors({ form: t('address.create.error') })
          break
      }

      setIsAddressCreationLoading(false)
    },
    [onAddressValidationError]
  )

  return (
    <Form onSubmit={onAddressCreationFormSubmit} validationErrors={addressFormErrors}>
      <FieldSet isDisabled={isAddressCreationLoading}>
        <AddressStreetField />

        <AddressPostalCodeField />

        <AddressCityField />

        <AddressCountryField />

        <AddressDefaultSwitch />
      </FieldSet>

      <FormError errors={addressFormErrors?.form} />

      <SubmitButton Icon={<SaveIcon />} isPending={isAddressCreationLoading}>
        {t('address.create.title')}
      </SubmitButton>

      <Link href={ROUTES.profile} variant='underlined'>
        {t('address.backToProfile')}
      </Link>
    </Form>
  )
}
