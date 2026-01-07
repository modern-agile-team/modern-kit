# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
For coding style and rules, refer to `.cursorrules`.

## Project Overview

Modern-kit is a Korean-language TypeScript monorepo that provides utility libraries for client-side development:
- **@modern-kit/react**: React components and custom hooks
- **@modern-kit/utils**: Utility functions for various use cases
- **@modern-kit/types**: TypeScript utility types

The project supports both CJS and ESM formats and is compatible with Next.js SSR environments.

## Development Commands

**Core development commands (run from root):**
- `yarn build` - Builds all packages, runs lint, typecheck, and tests
- `yarn test` - Runs all tests using Vitest
- `yarn typecheck` - Runs TypeScript type checking across all packages
- `yarn eslint packages` - Lints all packages

**Individual package commands (run from package directories):**
- `yarn test:run` - Runs tests with coverage and typecheck
- `yarn test:bench` - Runs benchmark tests (utils package only)
- `yarn build` - Builds the specific package

**Documentation commands:**
- `yarn start:docs` - Starts documentation development server
- `yarn build:docs` - Builds documentation
- `yarn publish:docs` - Publishes documentation

## Monorepo Architecture

### Package Structure
- **packages/react/**: React hooks and components
  - `/src/hooks/` - Custom React hooks (useInterval, useLocalStorage, etc.)
  - `/src/components/` - React components (Portal, LazyImage, etc.)
  - Uses Rollup for building, Vitest for testing
  
- **packages/utils/**: Pure utility functions
  - `/src/array/`, `/src/common/`, `/src/date/`, etc. - Categorized utilities
  - Includes benchmark testing capabilities
  
- **packages/types/**: TypeScript utility types
  - Type-only exports, no runtime code

### Build System
- **Lerna** manages the monorepo with independent versioning
- **Yarn Berry** (v4) as package manager
- **Rollup** builds packages to both CJS and ESM formats
- **Vitest** for testing with React Testing Library integration

### Export Strategy
Each package supports SubPath imports for tree-shaking:
```typescript
// Full import
import { useInterval } from '@modern-kit/react';

// SubPath import (better for bundling)
import { useInterval } from '@modern-kit/react/hooks/useInterval';
// or with 'node' moduleResolution:
import { useInterval } from '@modern-kit/react/dist/hooks/useInterval';
```

## Testing Practices

- **Vitest** with `--typecheck` flag for all packages
- **React Testing Library** for React components/hooks
- **jsdom** environment for browser API testing
- **Istanbul** coverage reporting
- Benchmark testing available for utils package with `yarn test:bench`

## Code Standards

- **TypeScript 5.1+** with strict mode enabled
- **ESLint** with React and TypeScript rules
- **No React.FC** usage (ESLint rule enforced)
- **No default exports** - use named exports
- **CSS Modules** support in React package
- **Korean language** for documentation, comments, and commit messages
- **Node 24+**, **Yarn 4+**, and **React 18+** requirements
- Always use `yarn` commands (not npm) due to Yarn Berry setup

## Key Development Notes

- Packages use workspace protocol (`workspace:^`) for internal dependencies
- All packages build to `dist/` with dual CJS/ESM exports using Rollup
- Tests are excluded from builds via Lerna ignoreChanges
- Test files: `*.spec.ts` (general), `*.spec.tsx` (with React components)
- Documentation uses Docusaurus (`.md` for utils, `.mdx` for React with interactive examples)
- JSDoc comments with tags: @param, @returns, @example, @throws, etc.
- AAA pattern for tests: Arrange-Act-Assert

## File Structure Convention

```
packages/[package-name]/
  src/
    [category]/
      [feature]/
        index.ts              # Main implementation
        [feature].spec.ts     # Tests
        [feature].utils.ts    # Utilities (if needed)
```

## Naming Conventions

- Files: camelCase or PascalCase (PascalCase for components)
- Variables/Functions: camelCase
- Types/Interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE
- Custom Hooks: `use` prefix
- Test descriptions: Korean language without "should"

## AI Assistant Guidelines

When generating code:
- Maintain consistency with existing patterns
- Generate tests alongside implementation code
- Prioritize type safety (avoid `any`, prefer `unknown` or generics)
- Use `export type` for type-only exports
- Consider tree-shaking in code structure
- Handle SSR environments when using browser APIs
- Write all documentation and comments in Korean