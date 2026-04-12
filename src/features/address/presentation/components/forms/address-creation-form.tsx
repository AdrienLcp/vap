'use client'

import { SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { ROUTES } from '@/domain/navigation'
import {
  ADDRESS_ERRORS,
  ADDRESS_FORM_FIELDS
} from '@/features/address/domain/address-constants'
import type {
  AddressCreationData,
  AddressFormErrors
} from '@/features/address/domain/address-entities'
import { AddressCreationSchema } from '@/features/address/domain/address-schemas'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { AddressCityField } from '@/features/address/presentation/components/forms/address-city-field'
import { AddressCountryField } from '@/features/address/presentation/components/forms/address-country-field'
import { AddressDefaultSwitch } from '@/features/address/presentation/components/forms/address-default-switch'
import { AddressNameField } from '@/features/address/presentation/components/forms/address-name-field'
import { AddressPostalCodeField } from '@/features/address/presentation/components/forms/address-postal-code-field'
import { AddressStreetField } from '@/features/address/presentation/components/forms/address-street-field'
import { getUniqueStringsArray } from '@/helpers/array'
import type { FormDataShape } from '@/helpers/form'
import type { Issues } from '@/helpers/validation'
import {
  BAD_REQUEST_STATUS,
  CREATED_STATUS
} from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'

export const AddressCreationForm: React.FC = () => {
  const [isAddressCreationLoading, setIsAddressCreationLoading] =
    useState(false)
  const [addressFormErrors, setAddressFormErrors] =
    useState<AddressFormErrors>(null)

  const router = useRouter()

  const onAddressValidationError = useCallback(
    (issues: Issues<AddressCreationData>) => {
      const formErrors: string[] = []
      const nameErrors: string[] = []
      const cityErrors: string[] = []
      const streetErrors: string[] = []
      const postalCodeErrors: string[] = []
      const countryErrors: string[] = []

      for (const issue of issues) {
        switch (issue.message) {
          case ADDRESS_ERRORS.INVALID_NAME:
            nameErrors.push(t('address.fields.name.invalid'))
            break
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
        form: getUniqueStringsArray(formErrors),
        [ADDRESS_FORM_FIELDS.CITY]: getUniqueStringsArray(cityErrors),
        [ADDRESS_FORM_FIELDS.COUNTRY]: getUniqueStringsArray(countryErrors),
        [ADDRESS_FORM_FIELDS.NAME]: getUniqueStringsArray(nameErrors),
        [ADDRESS_FORM_FIELDS.POSTAL_CODE]:
          getUniqueStringsArray(postalCodeErrors),
        [ADDRESS_FORM_FIELDS.STREET]: getUniqueStringsArray(streetErrors)
      })
    },
    []
  )

  const onAddressCreationFormSubmit = useCallback(
    async (formData: FormData) => {
      setIsAddressCreationLoading(true)
      setAddressFormErrors(null)

      const addressCreationData: FormDataShape<AddressCreationData> = {
        city: formData.get(ADDRESS_FORM_FIELDS.CITY),
        country: formData.get(ADDRESS_FORM_FIELDS.COUNTRY),
        isDefault: formData.get(ADDRESS_FORM_FIELDS.IS_DEFAULT) === 'on',
        name: formData.get(ADDRESS_FORM_FIELDS.NAME),
        postalCode: formData.get(ADDRESS_FORM_FIELDS.POSTAL_CODE),
        street: formData.get(ADDRESS_FORM_FIELDS.STREET)
      }

      const addressCreationValidation =
        AddressCreationSchema.safeParse(addressCreationData)

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
          router.push(ROUTES.profile)
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
    [onAddressValidationError, router]
  )

  return (
    <Form
      onSubmit={onAddressCreationFormSubmit}
      validationErrors={addressFormErrors}
    >
      <FieldSet isDisabled={isAddressCreationLoading}>
        <AddressNameField />

        <AddressStreetField />

        <AddressPostalCodeField />

        <AddressCityField />

        <AddressCountryField />

        <AddressDefaultSwitch />
      </FieldSet>

      <FormError errors={addressFormErrors?.form} />

      <SubmitButton
        Icon={<SaveIcon aria-hidden />}
        isPending={isAddressCreationLoading}
      >
        {t('address.create.title')}
      </SubmitButton>
    </Form>
  )
}
