import { dt, type LanguageMessages } from '@/infrastructure/i18n/lib'

export const fr = {
  appName: 'VAP',
  auth: {
    changeEmail: {
      errors: {
        unknown: 'Une erreur inconnue est survenue.'
      },
      form: {
        email: {
          label: 'Nouvel email',
          placeholder: 'jean-neige@gmail.com'
        },
        submit: {
          label: 'Changer email',
          loading: 'Changement en cours...'
        }
      },
      success: 'Votre email a été changé avec succès.'
    },
    changePassword: {
      errors: {
        invalidPassword: 'Le mot de passe actuel est incorrect.',
        invalidPasswordLength: dt('Le mot de passe doit comporter entre {minLength:number} et {maxLength:plural}', {
          plural: {
            maxLength: { zero: '0 caractère', one: '1 caractère', other: '{?} caractères' }
          }
        }),
        unknown: 'Une erreur inconnue est survenue.'
      },
      form: {
        currentPassword: {
          label: 'Mot de passe actuel',
          placeholder: 'Entrez votre mot de passe actuel'
        },
        newPassword: {
          label: 'Nouveau mot de passe',
          placeholder: 'Entrez votre nouveau mot de passe'
        },
        submit: {
          label: 'Confirmer',
          loading: 'Chargement...'
        }
      },
      success: 'Votre mot de passe a été changé avec succès.'
    },
    signIn: {
      errors: {
        invalidCredentials: 'L\'adresse mail et le mot de passe ne correspondent pas.',
        unknown: 'Une erreur inconnue est survenue.'
      },
      form: {
        email: {
          label: 'Email',
          placeholder: 'jean-neige@gmail.com'
        },
        submit: {
          label: 'Se connecter',
          loading: 'Connexion en cours...'
        }
      },
      label: 'Se connecter',
      noAccount: 'Vous n\'avez pas de compte ?',
      signUpHere: 'Inscrivez-vous ici',
      title: 'Connexion'
    },
    signOut: {
      label: 'Se déconnecter',
      errors: {
        unknown: 'Une erreur inconnue est survenue.'
      }
    },
    signUp: {
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      errors: {
        invalidPasswordLength: dt('Le mot de passe doit comporter entre {minLength:number} et {maxLength:plural}', {
          plural: {
            maxLength: { zero: '0 caractère', one: '1 caractère', other: '{?} caractères' }
          }
        }),
        unknown: 'Une erreur inconnue est survenue.',
        userAlreadyExists: 'Un utilisateur avec cet email existe déjà.'
      },
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
          description: dt('Au moins {characterCount:plural}', {
            plural: { characterCount: { zero: '0 caractère', one: '1 caractère', other: '{?} caractères' } }
          }),
          label: 'Mot de passe',
          placeholder: 'Entrez votre mot de passe'
        },
        submit: {
          creating: 'Création en cours...',
          label: 'S\'inscrire'
        }
      },
      signInHere: 'Connectez-vous ici',
      title: 'Inscription'
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
        lengthValues: 'La valeur doit être comprise entre {min:number} et {max:number} caractères.',
        tooLong: 'La valeur saisie est trop longue.',
        tooLongValue: 'La valeur saisie doit faire moins de {max:number} caractères.',
        tooShort: 'La valeur saisie est trop courte.',
        tooShortValue: 'La valeur saisie doit faire au moins {min:number} caractères.',
        valueMissing: 'Ce champ est requis.'
      },
      requiredFields: 'Les champs marqués d\'un * sont requis.'
    }
  }
} as const satisfies LanguageMessages
