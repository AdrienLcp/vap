import { dt, type LanguageMessages } from '@/infrastructure/i18n/lib'

export const fr = {
  appName: 'VAP',
  auth: {
    signUp: {
      title: 'Inscription',
      description: 'Créez un compte pour gérer vos achats',
      form: {
        email: {
          label: 'Email',
          placeholder: 'jean-neige@gmail.com'
        },
        name: {
          label: 'Nom',
          placeholder: 'Jean Neige'
        },
        password: {
          label: 'Mot de passe',
          description: dt('Au moins {characterCount:plural}', {
            plural: { characterCount: { zero: '0 caractère', one: '1 caractère', other: '{?} caractères' } }
          })
        },
        submit: {
          creating: 'Création en cours...',
          label: 'S\'inscrire'
        }
      }
    }
  },
  category: {
    create: {
      errors: {
        categoryNameAlreadyExists: 'Une catégorie avec ce nom existe déjà.',
        categoryNameTooLong: 'Le nom de la catégorie ne doit pas dépasser {max:number} caractères.'
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
      formValidationErrorDefaultMessage: 'Le formulaire contient des erreurs.',
      fieldError: {
        badInput: 'Entrée invalide.',
        lengthValues: 'La valeur doit être comprise entre {min:number} et {max:number} caractères.',
        patternMismatch: 'Le format de la valeur est incorrect.',
        rangeOverflow: 'La valeur dépasse la limite autorisée.',
        rangeUnderflow: 'La valeur est inférieure à la limite autorisée.',
        stepMismatch: 'La valeur ne correspond pas à l\'intervalle requis.',
        tooLong: 'La valeur saisie est trop longue.',
        tooLongValue: 'La valeur saisie doit faire moins de {max:number} caractères.',
        tooShort: 'La valeur saisie est trop courte.',
        tooShortValue: 'La valeur saisie doit faire au moins {min:number} caractères.',
        typeMismatch: 'Le type de la valeur est incorrect.',
        valueMissing: 'Ce champ est requis.'
      }
    }
  }
} as const satisfies LanguageMessages
