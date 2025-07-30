# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- **TypeScript 5.1+** with strict configuration
- **ESLint** with React and TypeScript rules
- **No React.FC** usage (per ESLint config)
- **CSS Modules** support in React package
- Korean documentation and comments preferred
- Node 18+ and React 18+ requirements

## Key Development Notes

- Packages use workspace protocol (`workspace:^`) for internal dependencies
- All packages build to `dist/` with dual CJS/ESM exports
- Tests are excluded from builds via Lerna ignoreChanges
- Documentation uses Docusaurus with automatic API generation
- Use `yarn` commands consistently (not npm) due to Yarn Berry setup