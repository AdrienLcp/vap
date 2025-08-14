import type { LanguageMessages } from '@/infrastructure/i18n/lib'

export const fr = {
  appName: 'VAP',
  category: {
    create: {
      errors: {
        categoryNameAlreadyExists: 'Une catégorie avec ce nom existe déjà.'
      },
      form: {
        description: {
          label: 'Description',
          placeholder: 'Description de la catégorie'
        },
        image: {
          label: 'Image',
          placeholder: 'URL de l\'image'
        },
        name: {
          label: 'Catégorie',
          placeholder: 'Nom de la catégorie'
        },
        submit: {
          creating: 'Création en cours...',
          label: 'Créer'
        }
      }
    }
  },
  components: {
    forms: {
      fieldError: {
        badInput: 'Entrée invalide.',
        patternMismatch: 'Le format de la valeur est incorrect.',
        rangeOverflow: 'La valeur dépasse la limite autorisée.',
        rangeUnderflow: 'La valeur est inférieure à la limite autorisée.',
        stepMismatch: 'La valeur ne correspond pas à l\'intervalle requis.',
        tooLong: 'La valeur saisie est trop longue.',
        tooShort: 'La valeur saisie est trop courte.',
        typeMismatch: 'Le type de la valeur est incorrect.',
        valueMissing: 'Ce champ est requis.'
      }
    }
  }
} as const satisfies LanguageMessages
