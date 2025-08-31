import { dt, type LanguageMessages } from '@/infrastructure/i18n/lib'

export const fr = {
  admin: {
    nav: {
      admin: 'Administration',
      products: 'Produits',
      categories: 'Catégories'
    }
  },
  appName: 'VAP',
  auth: {
    changeEmail: {
      errors: {
        unknown: 'Une erreur inconnue est survenue.'
      },
      submit: {
        label: 'Changer email',
        loading: 'Changement en cours...'
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
          label: 'Changer le mot de passe',
          loading: 'Chargement...'
        }
      },
      success: 'Votre mot de passe a été changé avec succès.'
    },
    fields: {
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
      }
    },
    persona: {
      admin: 'Admin',
      profile: 'Profil',
      signOut: 'Se déconnecter'
    },
    profile: {
      changeEmail: 'Changer l\'email',
      changePassword: 'Changer le mot de passe',
      title: 'Mon profil'
    },
    signIn: {
      errors: {
        invalidCredentials: 'L\'adresse mail et le mot de passe ne correspondent pas.',
        unknown: 'Une erreur inconnue est survenue.'
      },
      label: 'Se connecter',
      noAccount: 'Vous n\'avez pas de compte ?',
      signUpHere: 'Inscrivez-vous ici',
      submit: {
        label: 'Se connecter',
        loading: 'Connexion en cours...'
      },
      title: 'Se connecter'
    },
    signOut: {
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
      signInHere: 'Connectez-vous ici',
      submit: {
        creating: 'Création en cours...',
        label: 'S\'inscrire'
      },
      title: 'S\'inscrire'
    },
    unauthorized: {
      description: 'Vous n\'êtes pas autorisé à accéder à cette page.',
      linkLabel: 'Retour à l\'accueil',
      title: 'Accès non autorisé'
    }
  },
  category: {
    creation: {
      errors: {
        categoryNameAlreadyExists: 'Une catégorie avec ce nom existe déjà.',
        categoryNameTooLong: 'Le nom de la catégorie ne doit pas dépasser {max:number} caractères.'
      },
      submit: {
        creating: 'Création en cours...',
        label: 'Créer'
      },
      success: 'La catégorie "{categoryName}" a été créée avec succès.',
      title: 'Créer une catégorie'
    },
    fields: {
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
      }
    },
    imageAlt: 'Image de la catégorie',
    update: {
      errors: {
        categoryNameAlreadyExists: 'Une catégorie avec ce nom existe déjà.',
        categoryNameTooLong: 'Le nom de la catégorie ne doit pas dépasser {max:number} caractères.'
      },
      submit: {
        label: 'Mettre à jour',
        updating: 'Mise à jour en cours...'
      },
      success: 'La catégorie "{categoryName}" a été mise à jour avec succès.'
    }
  },
  components: {
    error: {
      description: 'Veuillez réessayer plus tard ou contacter le support si le problème persiste.',
      resetButton: 'Réessayer',
      title: 'Une erreur est survenue'
    },
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
      requiredFields: 'Les champs marqués d\'un * sont requis.',
      select: {
        defaultPlaceholder: 'Sélectionnez une option'
      }
    },
    spinner: {
      label: 'Chargement en cours...'
    },
    toaster: {
      closeButtonLabel: 'Fermer'
    }
  },
  errors: {
    unknown: 'Une erreur inconnue est survenue.'
  },
  product: {
    card: {
      delete: 'Supprimer',
      edit: 'Éditer',
      menuAriaLabel: 'Menu du produit',
      showProductSheet: 'Voir la fiche produit'
    },
    creation: {
      link: 'Créer un produit',
      submit: {
        creating: 'Création en cours...',
        label: 'Créer le produit'
      },
      success: '"{productName}" a été créé avec succès.',
      title: 'Créer un produit',
      unknownError: 'Une erreur inconnue est survenue durant la création du produit.'
    },
    fields: {
      category: {
        label: 'Catégorie',
        placeholder: 'Sélectionnez une catégorie'
      },
      description: {
        errors: {
          tooLong: 'La description du produit ne doit pas dépasser {max:number} caractères.'
        },
        label: 'Description',
        placeholder: 'Décrivez le produit'
      },
      discountedPrice: {
        description: 'Ajouter un prix ici pour créer une réduction',
        errors: {
          tooHigh: 'Le prix réduit du produit ne doit pas dépasser {max:number}.',
          tooLow: 'Le prix réduit du produit doit être au moins de {min:number}.'
        },
        label: 'Prix réduit'
      },
      imageUrl: {
        errors: {
          invalidUrl: 'L\'URL de l\'image n\'est pas valide.'
        },
        label: 'URL de l\'image'
      },
      name: {
        errors: {
          required: 'Le nom du produit est requis.',
          tooLong: 'Le nom du produit ne doit pas dépasser {max:number} caractères.'
        },
        label: 'Nom',
        placeholder: 'Nom du produit'
      },
      price: {
        errors: {
          tooHigh: 'Le prix du produit ne doit pas dépasser {max:number}.',
          tooLow: 'Le prix du produit doit être au moins de {min:number}.'
        },
        label: 'Prix'
      },
      sku: {
        description: 'Code unique du produit',
        errors: {
          alreadyExists: 'Un produit avec ce SKU existe déjà.',
          required: 'Le SKU du produit est requis.',
          tooLong: 'Le SKU du produit ne doit pas dépasser {max:number} caractères.'
        },
        label: 'SKU'
      },
      status: {
        label: 'Statut'
      },
      stock: {
        description: 'Quantité en stock',
        errors: {
          tooLow: 'Le stock du produit doit être au moins de {min:number}.'
        },
        label: 'Stock'
      }
    },
    imageAlt: 'Image du produit',
    status: {
      active: 'Actif',
      featured: 'En vedette',
      inactive: 'Inactif'
    },
    update: {
      submit: {
        label: 'Mettre à jour le produit',
        updating: 'Mise à jour en cours...'
      },
      success: '"{productName}" a été mis à jour avec succès.',
      unknownError: 'Une erreur inconnue est survenue durant la mise à jour du produit.'
    }
  },
  user: {
    avatar: {
      alt: 'Avatar de {userName}',
      defaultAlt: 'Avatar de l\'utilisateur'
    }
  }
} as const satisfies LanguageMessages
