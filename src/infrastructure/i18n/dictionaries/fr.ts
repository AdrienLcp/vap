import { dt, type LanguageMessages } from '@/infrastructure/i18n/lib'

export const fr = {
  appName: 'VAP',
  test: {
    messageCount: dt('{messages:plural}', {
      plural: {
        messages: {
          zero: 'Vous n\'avez aucun message',
          one: 'Vous avez {?} message',
          other: 'Vous avez {?} messages'
        }
      }
    })
  },
  category: {
    create: {
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
  }
} as const satisfies LanguageMessages
