# 🚀 VAP - Vaping E-commerce Platform

> A modern, accessible e-commerce solution for selling vape devices and accessories, built with Next.js 15 and clean architecture principles.

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-6.16.2-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-1.3.17-FF6B6B?style=for-the-badge)
![React Aria](https://img.shields.io/badge/React_Aria-1.12.2-E056FD?style=for-the-badge&logo=adobe&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 Table of Contents

- [🎯 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [🌍 Internationalization](#-internationalization)
- [♿ Accessibility](#-accessibility)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Features

### 🛒 **E-commerce Core**
- ✅ Product catalog with categories and filtering
- ✅ Shopping cart with persistent state
- ✅ User authentication (Google OAuth + credentials)
- ✅ Order management system
- ✅ Admin dashboard for product management

### 🎨 **User Experience**
- ✅ Responsive design with mobile-first approach
- ✅ Dark/light mode support
- ✅ Smooth animations and transitions
- ✅ Optimistic UI updates
- ✅ Toast notifications

### ♿ **Accessibility First**
- ✅ WCAG 2.1 AA compliance
- ✅ Full keyboard navigation
- ✅ Screen reader optimization
- ✅ High contrast mode support
- ✅ Focus management

### 🌍 **Internationalization**
- ✅ Multi-language support (French/English)
- ✅ RTL text direction support
- ✅ Locale-based formatting
- ✅ Server-side language detection

---

## 🏗️ Architecture

This project follows a **feature-first** + **clean architecture** approach for maximum maintainability and scalability.

### 🧱 **Core Principles**
- **Feature-first**: Code organized by business domains rather than technical layers
- **Clean architecture**: Clear separation of concerns with dependency inversion
- **Type safety**: Strict TypeScript with no type casting
- **Result pattern**: Functional error handling without exceptions
- **Single Responsibility**: Each component has one clear purpose

### 🔄 **Data Flow**
```mermaid
graph TD
    A[UI Components] --> B[Application Services]
    B --> C[Domain Entities]
    C --> D[Infrastructure Layer]
    D --> E[Database/External APIs]
    
    F[Server Components] --> G[Direct Database Access]
    G --> H[Prisma ORM]
```

---

## 🚀 Getting Started

### 📋 **Prerequisites**
- **Node.js** ≥ 18.17.0
- **pnpm** ≥ 8.0.0
- **PostgreSQL** ≥ 14

### ⚡ **Quick Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdrienLcp/vap.git
   cd vap
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database setup**
   ```bash
   # Run migrations
   pnpm db:migrate
   
   # Seed database (optional)
   pnpm db:seed
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🔧 **Available Scripts**

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript compiler |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:studio` | Open Prisma Studio |

---

## 🌍 Internationalization

The project supports multiple languages using a custom i18n implementation.

### 🗺️ **Supported Locales**
- 🇫🇷 **French** (default)
- 🇺🇸 **English**

### 📝 **Adding Translations**

1. **Add dictionary files**
   ```
   src/infrastructure/i18n/dictionaries/
   ├── fr.json
   └── en.json
   ```

2. **Use in components**
   ```typescript
   import { getDictionary } from '@/infrastructure/i18n'
   
   export async function MyComponent({ locale }: { locale: string }) {
     const t = await getDictionary(locale)
     
     return <h1>{t.welcome.title}</h1>
   }
   ```

3. **URL structure**
   ```
   /                    # French (default)
   /en                  # English
   /en/products         # English products page
   ```

---

## ♿ Accessibility

This project prioritizes accessibility using **React Aria Components** and follows WCAG 2.1 AA guidelines.

### 🎯 **Key Features**
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Comprehensive ARIA labels and descriptions
- **Focus Management**: Logical focus order and visual indicators
- **Color Contrast**: Meets AAA standards where possible

### 🧪 **Testing Accessibility**
```bash
# Run with screen reader
# Use NVDA (Windows), VoiceOver (macOS), or Orca (Linux)

# Keyboard-only navigation
# Tab through all interactive elements

# Color contrast validation
# Use browser dev tools or axe extension
```

---

## 🛠️ Tech Stack

### 🔧 **Core Framework**
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.1** - UI library with Server Components
- **TypeScript 5.9.2** - Type safety and developer experience

### 🎨 **Styling & UI**
- **SASS 1.93.2** - CSS preprocessor with modular architecture
- **React Aria Components 1.12.2** - Accessible UI primitives
- **Lucide React 0.544.0** - Beautiful icons
- **Classnames 2.5.1** - Conditional CSS classes

### 🔐 **Authentication & Security**
- **Better Auth 1.3.17** - Modern authentication library
- **js-sha256 0.11.1** - Cryptographic hashing
- **Zod 4.1.11** - Runtime type validation

### 🗄️ **Database & Backend**
- **Prisma 6.16.2** - Type-safe database ORM
- **PostgreSQL** - Primary database
- **Server-only 0.0.1** - Server-side code protection

### �️ **Development Tools**
- **ESLint 9.36.0** - Code linting and formatting
- **TypeScript ESLint 8.44.1** - TypeScript-specific linting
- **Turbopack** - Fast development bundler

### 🌐 **Infrastructure**
- **T3 Env 0.13.8** - Environment variable validation
- **Custom i18n** - Internationalization system

---

## 📁 Project Structure

```
vap/
├── 📁 prisma/                    # Database schema & migrations
│   ├── schema.prisma
│   └── migrations/
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── 📁 [locale]/          # Internationalized routes
│   │   ├── 📁 api/               # API routes
│   │   ├── 📁 auth/              # Auth pages
│   │   └── 📁 admin/             # Admin dashboard
│   │
│   ├── 📁 features/              # Business features (Clean Architecture)
│   │   ├── 📁 auth/              # Authentication feature
│   │   │   ├── 📁 domain/        # Auth business logic
│   │   │   ├── 📁 application/   # Auth use cases
│   │   │   ├── 📁 infrastructure/# Auth external services
│   │   │   └── 📁 presentation/  # Auth UI components
│   │   │
│   │   ├── 📁 product/           # Product management
│   │   ├── 📁 cart/              # Shopping cart
│   │   ├── 📁 category/          # Product categories
│   │   ├── 📁 user/              # User management
│   │   └── 📁 admin/             # Admin functionality
│   │
│   ├── 📁 domain/                # Shared business entities
│   │   ├── entities.ts           # Core business types
│   │   └── navigation.ts         # Navigation structure
│   │
│   ├── 📁 infrastructure/        # Technical services
│   │   ├── 📁 api/               # HTTP client & utilities
│   │   ├── 📁 database/          # Database helpers
│   │   ├── 📁 env/               # Environment validation
│   │   ├── 📁 i18n/              # Internationalization
│   │   └── 📁 storage/           # Local storage utilities
│   │
│   ├── 📁 presentation/          # Shared UI layer
│   │   ├── 📁 components/        # Reusable components
│   │   │   ├── 📁 ui/            # Base UI components
│   │   │   └── 📁 forms/         # Form components
│   │   ├── 📁 hooks/             # Custom React hooks
│   │   ├── 📁 services/          # UI services (toast, etc.)
│   │   ├── 📁 styles/            # Global SASS styles
│   │   └── 📁 utils/             # UI utilities
│   │
│   ├── 📁 helpers/               # Shared utilities
│   │   └── result.ts             # Result pattern implementation
│   │
│   └── 📁 utils/                 # General utilities
│       ├── array-utils.ts
│       ├── form-utils.ts
│       ├── format-utils.ts
│       ├── object-utils.ts
│       └── validation-utils.ts
│
├── 📄 package.json               # Dependencies & scripts
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 next.config.ts             # Next.js configuration
├── 📄 eslint.config.mjs          # ESLint configuration
└── 📄 README.md                  # Project documentation
```

### 🏛️ **Feature Architecture Example**

Each feature follows clean architecture principles:

```
features/product/
├── 📁 domain/
│   ├── entities.ts               # Product business entities
│   ├── repositories.ts           # Repository interfaces
│   └── services.ts               # Domain services
├── 📁 application/
│   ├── use-cases/                # Application use cases
│   └── services.ts               # Application services
├── 📁 infrastructure/
│   ├── repositories.ts           # Database implementations
│   └── services.ts               # External service integrations
└── 📁 presentation/
    ├── components/               # Product UI components
    ├── hooks/                    # Product-specific hooks
    └── controllers.ts            # Presentation controllers
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### 🔄 **Development Workflow**

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/vap.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Follow Code Standards**
   - Use TypeScript strictly (no `any` types)
   - Follow clean architecture principles
   - Add tests for new features
   - Ensure accessibility compliance

4. **Commit Convention**
   ```bash
   git commit -m "feat: add amazing feature"
   # Types: feat, fix, docs, style, refactor, test, chore
   ```

5. **Submit Pull Request**
   - Describe changes clearly
   - Include screenshots for UI changes
   - Ensure all tests pass

### 📏 **Code Standards**

- **No type casting** - Use proper TypeScript types
- **Result pattern** - Use `Result<T, E>` for error handling
- **Single Responsibility** - One concern per component/function
- **Accessibility first** - Always consider screen readers and keyboard navigation
- **Feature architecture** - Organize by business domain, not technical layers

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by [Adrien Lacourpaille](https://github.com/AdrienLcp)**

*Building accessible, modern e-commerce experiences*

</div>

## Installation

Vous aurez besoin de

- NodeJS
- pnpm
- postgresql


## Initialiser l'application

### Ajouter un .env avec les bonnes valeurs

```
AUTH_GOOGLE_CLIENT_ID="google-client-id"
AUTH_GOOGLE_CLIENT_SECRET="google-client-secret"

BETTER_AUTH_SECRET="better-auth-secret"

DATABASE_URL="database-url"

NEXT_PUBLIC_APP_URL="http://localhost:3000"

```

### Installer les dépendances

```
pnpm install
```

### Base de données

```
pnpm prisma migrate dev
```

Pour voir les données de la base:

```
pnpx prisma studio
```

## Linting

```
pnpm lint
```

## Build

```
pnpm build
```


## Lancer l'application

```
pnpm dev
```
