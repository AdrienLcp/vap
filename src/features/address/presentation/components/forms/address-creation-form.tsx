'use client'

import { SaveIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'

import { ROUTES } from '@/domain/navigation'
import { ADDRESS_ERRORS, ADDRESS_FORM_FIELDS } from '@/features/address/domain/address-constants'
import type { AddressCreationData } from '@/features/address/domain/address-entities'
import { AddressCreationSchema } from '@/features/address/domain/address-schemas'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { AddressCityField } from '@/features/address/presentation/components/forms/address-city-field'
import { AddressCountryField } from '@/features/address/presentation/components/forms/address-country-field'
import { AddressDefaultCheckbox } from '@/features/address/presentation/components/forms/address-default-checkbox'
import { AddressPostalCodeField } from '@/features/address/presentation/components/forms/address-postal-code-field'
import { AddressStreetField } from '@/features/address/presentation/components/forms/address-street-field'
import { BAD_REQUEST_STATUS, CREATED_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'
import type { ValueOf } from '@/utils/object-utils'
import type { Issues, ValidationErrors } from '@/utils/validation-utils'

type AddressCreationFormErrors = ValidationErrors<ValueOf<typeof ADDRESS_FORM_FIELDS>>

export const AddressCreationForm: React.FC = () => {
  const [isAddressCreationLoading, setIsAddressCreationLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<AddressCreationFormErrors>(null)

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

    setValidationErrors({
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

      const addressCreationData = {
        city: formData.get(ADDRESS_FORM_FIELDS.CITY),
        country: formData.get(ADDRESS_FORM_FIELDS.COUNTRY),
        isDefault: formData.get(ADDRESS_FORM_FIELDS.IS_DEFAULT) === 'on',
        postalCode: formData.get(ADDRESS_FORM_FIELDS.POSTAL_CODE),
        street: formData.get(ADDRESS_FORM_FIELDS.STREET)
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
          redirect(ROUTES.profile)
          break
        case BAD_REQUEST_STATUS:
          onAddressValidationError(addressCreationResponse.issues)
          break
        default:
          setValidationErrors({ form: t('address.create.error') })
          break
      }

      setIsAddressCreationLoading(false)
    },
    [onAddressValidationError]
  )

  return (
    <Form onSubmit={onAddressCreationFormSubmit} validationErrors={validationErrors}>
      <FieldSet isDisabled={isAddressCreationLoading}>
        <AddressStreetField />

        <AddressPostalCodeField />

        <AddressCityField />

        <AddressCountryField />

        <AddressDefaultCheckbox />
      </FieldSet>

      <FormError errors={validationErrors?.form} />

      <SubmitButton Icon={<SaveIcon />} isPending={isAddressCreationLoading}>
        {t('address.create.title')}
      </SubmitButton>
    </Form>
  )
}
