---
description: SASS modules, React Aria and the accessibility floor, where t() may be called
paths:
  - src/**/*.tsx
  - src/**/*.sass
---

# UI

## SASS modules, and nothing else

- A component ships with its `Component.module.sass` next to it.
- No Tailwind, no styled-components, no CSS-in-JS.
- Conditional classes go through `classnames`.
- Global styles live in `src/presentation/styles/`.

## Accessibility is not negotiable

- Every interactive element is a React Aria Component — `Button`, `ListBox`,
  `GridList`, `Form`… Check for an existing primitive before hand-rolling ARIA.
- **Never `<div onClick>`.**
- Explicit label on every field; decorative icons carry `aria-hidden`.
- Keyboard paths are tested: Tab, Enter, Space, arrows.
- AA contrast minimum.

## `t()` is client-only

`t()` comes from `@/infrastructure/i18n` and may only be called from a client
component — the constraint is deliberate, in preparation for a context-based
implementation. A hardcoded string is tolerated in a server component and
nowhere else.

`src/infrastructure/i18n/dictionaries/fr.ts` is the only file in the repo
allowed to contain French.
