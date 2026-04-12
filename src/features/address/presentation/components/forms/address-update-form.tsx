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
  AddressDTO,
  AddressFormErrors,
  AddressUpdateData
} from '@/features/address/domain/address-entities'
import { AddressUpdateSchema } from '@/features/address/domain/address-schemas'
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
  OK_STATUS
} from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'

type AddressUpdateFormProps = {
  address: AddressDTO
}

export const AddressUpdateForm: React.FC<AddressUpdateFormProps> = ({
  address
}) => {
  const [isAddressUpdating, setIsAddressUpdating] = useState(false)
  const [addressFormErrors, setAddressFormErrors] =
    useState<AddressFormErrors>(null)

  const router = useRouter()

  const onAddressValidationError = useCallback(
    (issues: Issues<AddressUpdateData>) => {
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

  const onAddressUpdateFormSubmit = useCallback(
    async (formData: FormData) => {
      setIsAddressUpdating(true)
      setAddressFormErrors(null)

      const addressUpdateData: FormDataShape<AddressUpdateData> = {
        city: formData.get(ADDRESS_FORM_FIELDS.CITY),
        country: formData.get(ADDRESS_FORM_FIELDS.COUNTRY),
        isDefault: formData.get(ADDRESS_FORM_FIELDS.IS_DEFAULT) === 'on',
        name: formData.get(ADDRESS_FORM_FIELDS.NAME),
        postalCode: formData.get(ADDRESS_FORM_FIELDS.POSTAL_CODE),
        street: formData.get(ADDRESS_FORM_FIELDS.STREET)
      }

      const addressUpdateValidation =
        AddressUpdateSchema.safeParse(addressUpdateData)

      if (!addressUpdateValidation.success) {
        onAddressValidationError(addressUpdateValidation.error.issues)
        setIsAddressUpdating(false)
        return
      }

      const addressUpdateResponse = await AddressClient.updateUserAddress(
        address.id,
        addressUpdateValidation.data
      )

      switch (addressUpdateResponse.status) {
        case OK_STATUS:
          ToastService.success(t('address.update.success'))
          router.push(ROUTES.profile)
          break
        case BAD_REQUEST_STATUS:
          onAddressValidationError(addressUpdateResponse.issues)
          break
        default:
          setAddressFormErrors({ form: t('address.update.error') })
          break
      }

      setIsAddressUpdating(false)
    },
    [address.id, onAddressValidationError, router]
  )

  return (
    <Form
      autoComplete='on'
      onSubmit={onAddressUpdateFormSubmit}
      validationErrors={addressFormErrors}
    >
      <FieldSet isDisabled={isAddressUpdating}>
        <AddressNameField defaultValue={address.name} />

        <AddressStreetField defaultValue={address.street} />

        <AddressPostalCodeField defaultValue={address.postalCode} />

        <AddressCityField defaultValue={address.city} />

        <AddressCountryField defaultValue={address.country} />

        <AddressDefaultSwitch isSelected={address.isDefault} />
      </FieldSet>

      <FormError errors={addressFormErrors?.form} />

      <SubmitButton
        Icon={<SaveIcon aria-hidden />}
        isPending={isAddressUpdating}
      >
        {t('address.update.submit')}
      </SubmitButton>
    </Form>
  )
}
