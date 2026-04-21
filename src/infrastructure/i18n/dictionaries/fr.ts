import { dt, type LanguageMessages } from '@/infrastructure/i18n/lib'

export const fr = {
  address: {
    backToProfile: 'Retour à mon profil',
    card: {
      deleteAddressError:
        "Une erreur est survenue lors de la suppression de l'adresse",
      deleteButtonAriaLabel: 'Supprimer cette adresse',
      editLinkAriaLabel: 'Modifier cette adresse',
      isDefault: 'Adresse par défaut',
      makeDefault: 'Définir comme adresse par défaut',
      updateDefaultAddressError:
        "Une erreur est survenue lors de la définition de l'adresse par défaut."
    },
    create: {
      error: "Une erreur est survenue lors de la création de l'adresse.",
      link: 'Ajouter une adresse',
      submit: 'Créer',
      success: "L'adresse a été créée avec succès.",
      title: 'Créer une adresse'
    },
    fields: {
      city: {
        invalid: "La ville fournie n'est pas valide.",
        label: 'Ville',
        placeholder: 'Entrez la ville'
      },
      country: {
        invalid: "Le pays fourni n'est pas valide.",
        label: 'Pays',
        placeholder: 'Entrez le pays'
      },
      isDefault: {
        label: 'Définir comme adresse par défaut'
      },
      name: {
        invalid: "Le nom fourni n'est pas valide.",
        label: 'Nom',
        placeholder: 'Donnez un nom à votre adresse'
      },
      postalCode: {
        invalid: "Le code postal fourni n'est pas valide.",
        label: 'Code postal',
        placeholder: 'Entrez le code postal'
      },
      street: {
        invalid: "La rue fournie n'est pas valide.",
        label: 'Adresse',
        placeholder: 'Numéro et nom de la rue'
      }
    },
    list: {
      ariaLabel: 'Liste des adresses',
      empty: "Vous n'avez pas encore ajouté d'adresse.",
      error: 'Une erreur est survenue lors du chargement des adresses.'
    },
    update: {
      error: "Une erreur est survenue lors de la mise à jour de l'adresse.",
      submit: 'Mettre à jour',
      success: "L'adresse a été mise à jour avec succès.",
      title: 'Modifier mon adresse'
    }
  },
  admin: {
    nav: {
      admin: 'Administration',
      categories: 'Catégories',
      emails: 'Emails',
      listAriaLabel: "Liens d'administration",
      orders: 'Commandes',
      products: 'Produits',
      users: 'Utilisateurs'
    }
  },
  appName: 'VAP',
  auth: {
    changeEmail: {
      errors: {
        invalidEmail: "L'email fourni n'est pas valide.",
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
        invalidPasswordLength: dt(
          'Le mot de passe doit comporter entre {minLength:number} et {maxLength:plural}',
          {
            plural: {
              maxLength: {
                one: '1 caractère',
                other: '{?} caractères',
                zero: '0 caractère'
              }
            }
          }
        ),
        newPasswordRequired: 'Le nouveau mot de passe est requis.',
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
    deleteAccount: {
      emailHint:
        "Un email de confirmation va être envoyé à votre adresse. Cliquez sur le lien qu'il contient pour supprimer définitivement votre compte.",
      emailSent:
        'Un email de confirmation vous a été envoyé. Cliquez sur le lien pour finaliser la suppression.',
      errors: {
        unknown: 'Une erreur inconnue est survenue.'
      },
      form: {
        cancel: 'Annuler',
        submit: {
          label: 'Envoyer le mail de confirmation',
          loading: 'Envoi en cours...'
        }
      },
      title: 'Supprimer le compte',
      warning:
        'Cette action est irréversible. Toutes vos données seront définitivement supprimées.'
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
          plural: {
            characterCount: {
              one: '1 caractère',
              other: '{?} caractères',
              zero: '0 caractère'
            }
          }
        }),
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe'
      }
    },
    forbidden: {
      description: "Vous n'avez pas la permission d'accéder à cette page.",
      linkLabel: "Retour à l'accueil",
      title: 'Accès interdit'
    },
    persona: {
      admin: 'Administration',
      profile: 'Profil',
      signOut: 'Se déconnecter'
    },
    profile: {
      addresses: 'Adresses',
      changeEmail: "Changer l'email",
      changePassword: 'Changer le mot de passe',
      deleteAccount: 'Supprimer le compte',
      title: 'Mon profil'
    },
    signIn: {
      errors: {
        emailNotVerified:
          "Votre adresse email n'est pas vérifiée. Consultez votre boîte mail pour valider votre compte.",
        invalidCredentials:
          "L'adresse mail et le mot de passe ne correspondent pas.",
        unknown: 'Une erreur inconnue est survenue.'
      },
      label: 'Se connecter',
      noAccount: "Vous n'avez pas de compte ?",
      resendVerification: {
        label: 'Renvoyer le mail de vérification',
        success: 'Email de vérification renvoyé. Vérifiez votre boîte mail.'
      },
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
        invalidEmail: "L'email n'est pas valide.",
        invalidPasswordLength: dt(
          'Le mot de passe doit comporter entre {minLength:number} et {maxLength:plural}',
          {
            plural: {
              maxLength: {
                one: '1 caractère',
                other: '{?} caractères',
                zero: '0 caractère'
              }
            }
          }
        ),
        unknown: 'Une erreur inconnue est survenue.',
        userAlreadyExists: 'Un utilisateur avec cet email existe déjà.',
        userNameRequired: "Le nom d'utilisateur est requis."
      },
      signInHere: 'Connectez-vous ici',
      submit: {
        creating: 'Création en cours...',
        label: "S'inscrire"
      },
      title: "S'inscrire"
    },
    social: {
      google: 'Continuer avec Google'
    },
    unauthorized: {
      description: "Vous n'êtes pas autorisé à accéder à cette page.",
      linkLabel: "Retour à l'accueil",
      title: 'Accès non autorisé'
    }
  },
  cart: {
    ariaLabel: 'Panier',
    button: {
      ariaLabel: 'Panier',
      itemCountTooltip: dt('{itemCount:plural} dans le panier', {
        plural: {
          itemCount: {
            one: '1 article',
            other: '{?} articles',
            zero: 'Aucun article'
          }
        }
      })
    },
    clear: {
      error: 'Une erreur est survenue lors du vidage du panier.',
      label: 'Vider le panier'
    },
    item: {
      deleteError:
        "Une erreur est survenue lors de la suppression de l'article du panier.",
      quantity: 'Quantité : {quantity:number}',
      totalPrice: 'Prix total : {totalPrice}',
      unitPrice: "Prix à l'unité : {unitPrice}"
    },
    list: {
      empty: 'Votre panier est vide.',
      error:
        'Une erreur est survenue lors du chargement des articles du panier.'
    },
    pay: 'Payer',
    reviewTitle: 'Résumé et validation',
    title: dt('Votre panier ({itemCount:plural})', {
      plural: {
        itemCount: {
          one: '1 article',
          other: '{?} articles',
          zero: 'Aucun article'
        }
      }
    }),
    totalPrice: 'Prix total : {totalPrice}'
  },
  category: {
    card: {
      delete: 'Supprimer',
      edit: 'Éditer',
      menuAriaLabel: 'Menu de la catégorie',
      showCategorySheet: 'Voir la fiche catégorie'
    },
    creation: {
      link: 'Créer une catégorie',
      submit: {
        creating: 'Création en cours...',
        label: 'Créer'
      },
      success: 'La catégorie "{categoryName}" a été créée avec succès.',
      title: 'Créer une catégorie'
    },
    delete: {
      error: 'Une erreur est survenue lors de la suppression de la catégorie.',
      label: 'Supprimer la catégorie',
      success: 'La catégorie a été supprimée avec succès.'
    },
    errors: {
      categoryNameAlreadyExists: 'Une catégorie avec ce nom existe déjà.',
      categoryNameRequired: 'Le nom de la catégorie est requis.',
      categoryNameTooLong:
        'Le nom de la catégorie ne doit pas dépasser {max:number} caractères.'
    },
    fields: {
      description: {
        label: 'Description',
        placeholder: 'Description de la catégorie'
      },
      image: {
        label: 'Image',
        placeholder: "URL de l'image"
      },
      name: {
        label: 'Nom',
        placeholder: 'Nom de la catégorie'
      }
    },
    imageAlt: 'Image de la catégorie',
    list: {
      ariaLabel: 'Liste des catégories',
      empty: 'Aucune catégorie disponible.'
    },
    update: {
      submit: {
        label: 'Mettre à jour',
        updating: 'Mise à jour en cours...'
      },
      success: 'La catégorie "{categoryName}" a été mise à jour avec succès.'
    }
  },
  checkout: {
    addAddress: 'Ajouter une adresse',
    addressLabel: 'Adresse de livraison',
    cancel: {
      backToCart: 'Retour au panier',
      description:
        'Votre paiement a été annulé. Votre panier est toujours disponible.',
      title: 'Paiement annulé'
    },
    emptyCart: 'Votre panier est vide.',
    error: 'Une erreur est survenue lors du paiement.',
    itemsTitle: 'Articles',
    noAddress: "Vous n'avez pas encore ajouté d'adresse de livraison.",
    pay: 'Payer',
    payAriaLabel: 'Procéder au paiement',
    selectAddress: 'Sélectionnez une adresse',
    shippingFree: 'Offerte',
    shippingLabel: 'Livraison',
    shippingLineItem: 'Frais de livraison',
    subtotalLabel: 'Sous-total',
    success: {
      backHome: "Retour à l'accueil",
      description: 'Votre commande a bien été enregistrée. Merci !',
      orderNumber: 'Commande #{orderSuffix}',
      pending:
        'Votre paiement est en cours de validation. Cela ne prend généralement que quelques secondes.',
      title: 'Paiement confirmé'
    },
    title: 'Résumé et validation',
    totalLabel: 'Total'
  },
  components: {
    fallback: {
      description:
        'Veuillez réessayer plus tard ou contacter le support si le problème persiste.',
      resetButton: 'Réessayer',
      title: 'Une erreur est survenue'
    },
    forms: {
      fieldError: {
        lengthValues:
          'La valeur doit être comprise entre {min:number} et {max:number} caractères.',
        tooLong: 'La valeur saisie est trop longue.',
        tooLongValue:
          'La valeur saisie doit faire moins de {max:number} caractères.',
        tooShort: 'La valeur saisie est trop courte.',
        tooShortValue:
          'La valeur saisie doit faire au moins {min:number} caractères.',
        valueMissing: 'Ce champ est requis.'
      },
      formValidationErrorDefaultMessage: 'Le formulaire contient des erreurs.',
      requiredFields: {
        mark: '*',
        message: "Les champs marqués d'un {mark} sont requis."
      },
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
  email: {
    admin: {
      bodyLabel: 'Contenu',
      recipients: {
        admins: 'Administrateurs',
        all: 'Tous les utilisateurs',
        superAdmins: 'Super administrateurs',
        users: 'Utilisateurs'
      },
      recipientsLabel: 'Destinataires',
      sendButton: 'Envoyer',
      sendError: "Une erreur est survenue lors de l'envoi de l'email.",
      sendSuccess: dt('Email envoyé à {count:number} destinataire(s).', {}),
      subjectLabel: 'Objet',
      title: 'Envoyer un email'
    },
    layout: {
      footer: 'VAP — Votre boutique en ligne'
    },
    templates: {
      accountDeletion: {
        cta: 'Supprimer mon compte',
        greeting: 'Bonjour {userName},',
        hint: "Cette action est irréversible. Toutes vos données seront effacées. Si vous n'avez pas fait cette demande, ignorez cet email — votre compte restera intact.",
        intro:
          'Vous avez demandé la suppression définitive de votre compte. Pour confirmer cette action, cliquez sur le lien ci-dessous.',
        preview: 'Confirmez la suppression de votre compte',
        subject: 'Confirmez la suppression de votre compte',
        title: 'Suppression de votre compte'
      },
      paymentConfirmation: {
        greeting: 'Bonjour {userName},',
        intro:
          'Votre paiement pour la commande #{orderSuffix} a bien été reçu. Merci pour votre achat !',
        item: dt('{name} × {quantity:number} — {price:number}', {
          number: {
            price: { currency: 'EUR', style: 'currency' }
          }
        }),
        preview: 'Confirmation de commande #{orderSuffix}',
        shipping: dt('Livraison : {shipping:number}', {
          number: {
            shipping: { currency: 'EUR', style: 'currency' }
          }
        }),
        shippingFree: 'Livraison : offerte',
        subject: 'Confirmation de commande #{orderSuffix}',
        summary: 'Récapitulatif',
        title: 'Paiement confirmé',
        total: dt('Total : {total:number}', {
          number: {
            total: { currency: 'EUR', style: 'currency' }
          }
        })
      },
      resetPassword: {
        cta: 'Réinitialiser mon mot de passe',
        greeting: 'Bonjour {userName},',
        hint: "Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email.",
        intro:
          'Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour en choisir un nouveau.',
        preview: 'Réinitialisation de votre mot de passe',
        subject: 'Réinitialisation de votre mot de passe',
        title: 'Réinitialisation du mot de passe'
      },
      verification: {
        cta: 'Vérifier mon email',
        greeting: 'Bonjour {userName},',
        hint: "Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.",
        intro:
          'Cliquez sur le lien ci-dessous pour vérifier votre adresse email.',
        preview: 'Vérifiez votre adresse email',
        subject: 'Vérifiez votre adresse email',
        title: 'Vérification de votre email'
      },
      welcome: {
        cta: 'Parcourir la boutique',
        intro: 'Merci de vous être inscrit sur VAP. Votre compte est prêt.',
        preview: 'Bienvenue sur VAP, {userName} !',
        secondary:
          'Découvrez nos produits et commencez vos achats dès maintenant.',
        subject: 'Bienvenue sur VAP !',
        title: 'Bienvenue, {userName} !'
      }
    }
  },
  errors: {
    unknown: 'Une erreur inconnue est survenue.'
  },
  icons: {
    googleAltText: 'Logo Google'
  },
  order: {
    admin: {
      customerEmail: 'Client',
      date: 'Date',
      empty: 'Aucune commande pour le moment.',
      itemsTitle: 'Articles',
      orderId: 'Commande',
      productName: 'Produit',
      quantity: 'Quantité',
      shippingCost: 'Livraison',
      statusLabel: 'Statut',
      statusUpdateError:
        'Une erreur est survenue lors de la mise à jour du statut.',
      statusUpdateSuccess: 'Le statut a été mis à jour.',
      stripePaymentIntentId: 'Payment Intent',
      stripeSessionId: 'Session Stripe',
      tableAriaLabel: 'Liste des commandes',
      title: 'Commandes',
      totalPrice: 'Total',
      unitPrice: 'Prix unitaire'
    },
    status: {
      CANCELLED: 'Annulée',
      COMPLETED: 'Terminée',
      PAID: 'Payée',
      PENDING: 'En attente',
      SHIPPED: 'Expédiée'
    }
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
      unknownError:
        'Une erreur inconnue est survenue durant la création du produit.'
    },
    delete: {
      error: 'Une erreur est survenue lors de la suppression du produit.',
      label: 'Supprimer le produit',
      success: 'Le produit a été supprimé avec succès.'
    },
    fields: {
      category: {
        label: 'Catégorie',
        placeholder: 'Sélectionnez une catégorie'
      },
      description: {
        errors: {
          tooLong:
            'La description du produit ne doit pas dépasser {max:number} caractères.'
        },
        label: 'Description',
        placeholder: 'Décrivez le produit'
      },
      discountedPrice: {
        description: 'Ajouter un prix ici pour créer une réduction',
        errors: {
          tooHigh:
            'Le prix réduit du produit ne doit pas dépasser {max:number}.',
          tooLow:
            'Le prix réduit du produit doit être au moins de {min:number}.'
        },
        label: 'Prix réduit'
      },
      imageUrl: {
        errors: {
          invalidUrl: "L'URL de l'image n'est pas valide."
        },
        label: "URL de l'image"
      },
      name: {
        errors: {
          required: 'Le nom du produit est requis.',
          tooLong:
            'Le nom du produit ne doit pas dépasser {max:number} caractères.'
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
          tooLong:
            'Le SKU du produit ne doit pas dépasser {max:number} caractères.'
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
    filters: {
      categories: {
        label: 'Catégories',
        placeholder: 'Filtrer par catégories'
      },
      price: {
        label: 'Prix',
        maxPriceAriaLabel: 'Prix maximum',
        minPriceAriaLabel: 'Prix minimum'
      },
      search: {
        label: 'Rechercher un produit',
        placeholder: 'Filtrer les produits par nom, catégorie, ...'
      }
    },
    imageAlt: 'Image du produit',
    list: {
      ariaLabel: 'Liste des produits',
      empty: 'Aucun produit disponible.',
      loadError: 'Une erreur est survenue lors du chargement des produits.'
    },
    quantitySelector: {
      ariaLabel: 'Sélecteur de quantité',
      decrease: 'Diminuer la quantité',
      error: 'Une erreur est survenue lors de la mise à jour de la quantité.',
      increase: 'Augmenter la quantité'
    },
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
      unknownError:
        'Une erreur inconnue est survenue durant la mise à jour du produit.'
    }
  },
  user: {
    avatar: {
      alt: 'Avatar de {userName}',
      defaultAlt: "Avatar de l'utilisateur"
    },
    list: {
      roleFilter: {
        label: 'Rôles',
        placeholder: 'Filtrer par rôles'
      },
      search: {
        error: 'Une erreur est survenue lors de la recherche des utilisateurs.',
        label: 'Rechercher des utilisateurs',
        placeholder: 'Rechercher par email'
      },
      table: {
        ariaLabel: 'Liste des utilisateurs',
        columns: {
          email: 'Email',
          name: 'Nom',
          role: 'Rôle'
        },
        empty: 'Aucun utilisateur trouvé.',
        error: 'Une erreur est survenue lors du chargement des utilisateurs.'
      }
    },
    roles: {
      admin: 'Administrateur',
      customer: 'Client',
      superAdmin: 'Super Administrateur'
    }
  }
} as const satisfies LanguageMessages
