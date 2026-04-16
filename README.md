# 🚀 VAP - Vaping E-commerce Platform

> A modern, accessible e-commerce solution for selling vape devices and accessories, built with Next.js 16 and clean architecture principles.

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=lightblue)
![Drizzle](https://img.shields.io/badge/Drizzle-0.45-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Better Auth](https://img.shields.io/badge/Better_Auth-1.6-FF6B6B?style=for-the-badge)
![React Aria Components](https://img.shields.io/badge/React_Aria-1.16-E056FD?style=for-the-badge&logo=adobe&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2.4-4B8BF5?style=for-the-badge&logo=biome)

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
- ✅ User authentication (Google auth + credentials)
- ✅ Order management system
- ✅ Admin dashboard for product management

### 🎨 **User Experience**
- ✅ Responsive design with mobile-first approach
- ✅ Dark/light mode support (only light for now)
- ✅ Smooth animations and transitions
- ✅ Toast notifications

### ♿ **Accessibility First**
- ✅ WCAG 2.1 AA compliance
- ✅ Full keyboard navigation
- ✅ Screen reader optimization
- ✅ High contrast mode support
- ✅ Focus management

### 🌍 **Internationalization**
- ✅ Multi-language support (only French for now)
- ✅ Locale-based formatting

---

## 🏗️ Architecture

This project follows a **feature-first** + **clean architecture** approach for maximum maintainability and scalability.

### 🧱 **Core Principles**
- **Feature-first**: Code organized by business domains rather than technical layers
- **Clean architecture**: Clear separation of concerns with dependency inversion
- **Type safety**: Strict TypeScript with no type casting
- **Result pattern**: Functional error handling without exceptions
- **Single Responsibility**: Each component has one clear purpose

### 🔄 **Data Flow Architecture**
```mermaid
graph TD
    A[Client Components] --> B[Client Services]
    B --> C[API Routes]
    C --> D[Controllers]
    D --> E[Domain Services]
    E --> F[Infrastructure Layer]
    
    G[Server Components] --> H[Controllers Direct]
    H --> E
    F --> I[Database/External APIs]
```

### 🎯 **Server vs Client Components Pattern**

This project uses a clear separation between **Server Components** and **Client Components** with dedicated data access patterns:

#### 🖥️ **Server Components** (Async Functions)
```typescript
// ✅ Server Component - Direct controller access
export const ProductsServerComponent: React.FC = async () => {
  // Server components can be async and call controllers directly
  const productListResponse = await ProductController.findProducts()
  
  if (productListResponse.status !== OK_STATUS) {
    return 'Error while fetching products'
  }
  
  return <ProductList products={productListResponse.data} />
}
```

#### 🌐 **Client Components** (Interactive UI)
```typescript
'use client'

// ✅ Client Component - Use client services with hooks
export const ProductsClientComponent: React.FC = () => {
  const [productList, setProductList] = useState<ProductDTO[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true)
    // Client components use client services via API calls
    const productListResponse = await ProductClient.findProducts()
    
    if (productListResponse.status === OK_STATUS) {
      setProducts(productListResponse.data)
    }
    setIsLoadingProducts(false)
  }, [])

  // in server component, don't forget to add a loading.tsx file or wrap <Suspense> fallback
  if (isLoadingProducts) return <Loader />
  
  return <ProductList products={productList} />
}
```

---

## 🚀 Getting Started

### 📋 **Prerequisites**
- **Node.js** ≥ 20 LTS
- **pnpm** ≥ 10
- **Docker Desktop** (Postgres runs in a container)

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
   cp .env.example .env
   # Edit .env with your configuration (BETTER_AUTH_SECRET, Google OAuth, etc.)
   ```

4. **Start the dev server**
   ```bash
   pnpm dev
   ```

   This single command:
   - boots the Postgres container (`docker compose up -d --wait`)
   - applies pending migrations (`pnpm db:migrate`)
   - starts Next.js with Turbopack

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **(Optional) Seed the database**
   ```bash
   pnpm db:seed
   ```

### 🔧 **Available Scripts**

| Command | Description |
|---------|-------------|
| `pnpm dev` | Boot Postgres + migrate + Next.js dev server |
| `pnpm build` | Build for production |
| `pnpm format` | Format code with Biome |
| `pnpm lint` | Run Biome (lint + format) |
| `pnpm db:generate` | Write a new Drizzle migration from the TS schema |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:seed` | Insert dev fixtures |
| `pnpm db:studio` | Drizzle Studio UI |

---

## 🌍 Internationalization

The project supports multiple languages using a custom i18n implementation.

### 🗺️ **Supported Locales**
- 🇫🇷 **French** (default)

### 📝 **Adding Translations**

1. **Add dictionary files**
   ```
   src/infrastructure/i18n/dictionaries/
   └── fr.ts
   ```

2. **Use in components**
   ```typescript
   import { t } from '@/infrastructure/i18n'
   
   export const MyComponent: React.FC = () => {
     return <h1>{t('welcome.title')}</h1>
   }
   ```

### 🔤 **Client-Side Only Usage**

⚠️ **Important**: The `t` function should **only be used in client components**. This restriction is in place to prepare for future language switching functionality using React context and/or hooks.

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
- **TypeScript** - Type safety and developer experience
- **React** - UI library with Server Components
- **Next.js** - React framework with App Router

### 🎨 **Styling & UI**
- **SASS** - CSS preprocessor with modular architecture
- **React Aria Components** - Accessible UI primitives
- **Lucide React** - Beautiful icons
- **Classnames** - Conditional CSS classes

### 🔐 **Authentication & Security**
- **Better Auth** - Modern authentication library
- **js-sha256** - Cryptographic hashing
- **Zod** - Runtime type validation

### 🗄️ **Database & Backend**
- **Drizzle ORM** - Type-safe SQL builder, schemas dispatched per feature
- **postgres** - Lightweight PostgreSQL driver
- **PostgreSQL 16** - Primary database (runs in Docker)
- **UUID v7** - Time-ordered application-generated IDs
- **Server-only** - Server-side code protection

### 🛠️ **Development Tools**
- **Biome** - Unified formatter, linter, import organizer
- **TypeScript** - Type safety and developer experience
- **Drizzle Kit** - Migration generator + Studio
- **tsx** - TypeScript runner for seed/migrate scripts
- **Turbopack** - Fast development bundler

### 🌐 **Infrastructure**
- **T3 Env** - Environment variable validation
- **Custom i18n** - Internationalization system

---

## 📁 Project Structure

```
vap/
├── 📄 docker-compose.yml         # Postgres container (used by pnpm dev)
├── 📄 drizzle.config.ts          # Drizzle Kit config
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
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
│   │   ├── 📁 database/          # Drizzle client, schema barrel, migrations, seed, migrate runner
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
│       ├── format-utils.ts
│       ├── object-utils.ts
│       └── validation-utils.ts
│
├── 📄 biome.json                 # Biome config (formatter + linter)
├── 📄 next.config.ts             # Next.js configuration
├── 📄 package.json               # Dependencies & scripts
├── 📄 README.md                  # Project documentation
└── 📄 tsconfig.json              # TypeScript configuration
```

### 🏛️ **Feature Architecture Example**

Each feature follows clean architecture principles with clear separation between server and client data access:

```
features/product/
├── 📁 domain/
│   ├── product-constants.ts      # Product constants & enums
│   ├── product-entities.ts       # Product business entities
│   └── product-schemas.ts        # Zod validation schemas
├── 📁 application/
│   ├── hooks/                    # Client-side React hooks
│   └── product-service.ts        # Core business logic
├── 📁 infrastructure/
│   ├── product-schema.ts         # 🗄️ Drizzle table definition
│   ├── product-repository.ts     # Database layer (Drizzle)
│   └── product-client.ts         # 🌐 Client API service
└── 📁 presentation/
    ├── components/               # React UI components
    ├── hooks/                    # UI-specific hooks
    └── product-controller.ts     # 🖥️ Server controller
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### 🔄 **Development Workflow**

1. **Fork & Clone**
   ```bash
   git clone https://github.com/AdrienLcp/vap.git
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
- **Biome enforced** - Single quotes (including JSX), no semicolons, 2-space indent, max line width 100, arrow params no parentheses when single

---

<div align="center">

**Made with ❤️ by [Adrien Lacourpaille](https://github.com/AdrienLcp)**

*Building accessible, modern e-commerce experiences*

</div>
