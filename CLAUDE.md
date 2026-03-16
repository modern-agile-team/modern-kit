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

```
packages/react/src/
  hooks/[hookName]/
    index.ts              # Hook implementation
    [hookName].spec.ts    # Tests (.tsx if JSX needed)
    [hookName].utils.ts   # Internal utilities (optional)
    [hookName].types.ts   # Type definitions (optional)
  components/[ComponentName]/
    index.tsx             # Component implementation
    [ComponentName].spec.tsx
    [ComponentName].utils.ts (optional)
  utils/[utilName]/
    index.ts
    [utilName].spec.ts
  _internal/test/         # Shared test helpers (renderSetup, etc.)

packages/utils/src/
  [category]/[feature]/
    index.ts
    [feature].spec.ts
    [feature].bench.ts    # Benchmark (optional, compared against lodash)
    [feature].test-d.ts   # Type inference validation (optional)
    internal.ts           # Internal helpers (optional)
```

**utils categories:** array, clipboard, common, date, device, file, formatter, math, number, object, regex, storage, string, style, validator

### Build System

- **Lerna** manages the monorepo with independent versioning
- **Yarn Berry** (v4) as package manager
- **Rollup** builds packages to CJS(`.cjs`) / ESM(`.mjs`) / type declarations(`.d.ts`)
- Entry points are auto-discovered from directory structure via `build.utils.mjs`
- **Vitest** for testing with React Testing Library integration

### Export Strategy

```typescript
// Full import
import { useInterval } from '@modern-kit/react';

// SubPath import (better for tree-shaking)
import { useInterval } from '@modern-kit/react/dist/hooks/useInterval';
import { chunk } from '@modern-kit/utils/dist/array/chunk';
```

## TypeScript Conventions

### Generics

```typescript
// Infer array element type
function chunk<T>(arr: T[] | readonly T[], size: number): T[][];

// Object key type safety
function pick<T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K>;

// PropertyKey for grouping
function groupBy<T, K extends PropertyKey>(
  arr: T[],
  iteratee: (item: T) => K
): Record<K, T[]>;
```

### Function Overloads (for optional parameter type branching)

```typescript
// Write individual JSDoc for each overload signature
function countBy<T extends readonly any[]>(arr: T): Record<T[number], number>;
function countBy<T extends readonly any[], K extends PropertyKey>(
  arr: T,
  iteratee: (v: T[number]) => K
): Record<K, number>;
function countBy(arr, iteratee?) {
  /* single implementation */
}
```

### Interface / Type Naming

- Options types: `UseHookNameOptions`, `FunctionNameOptions`
- Return types: `UseHookNameReturnType`
- Event handler related: `EventListenerAvailableElement`, `TargetElement`
- Type-only exports: `export type { ... }`

### Type Guards

```typescript
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
function isRefObject<T>(
  element: TargetElement<T> | null
): element is RefObject<T | null> {
  return !!element && hasProperty(element, 'current');
}
```

## Testing Conventions

### Test File Structure

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('feature name', () => {
  // Arrange-Act-Assert pattern
  it('Korean description of what is being tested', () => {
    const input = ...;            // Arrange
    const result = fn(input);     // Act
    expect(result).toEqual(...);  // Assert
  });
});
```

### Test Description Rules

- **Korean language** required, "should" is forbidden
- Use verb form ending in `"~해야 합니다"`
- Use nested describe blocks to categorize cases (e.g., controlled/uncontrolled mode)

### React Hook Tests (renderHook)

```typescript
import { renderHook } from '@testing-library/react';
const { result, rerender, unmount } = renderHook(() => useMyHook(arg));
```

### React Component Tests (renderSetup)

```typescript
import { renderSetup } from '../../_internal/test/renderSetup';
const { user } = renderSetup(<Component />);  // includes userEvent
await user.click(screen.getByRole('button'));
```

### Timer Mocking

```typescript
beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});
afterEach(() => {
  vi.useRealTimers();
});
vi.advanceTimersByTime(300);
```

### System Time Mocking (date tests)

```typescript
beforeEach(() => {
  vi.setSystemTime(new Date('2025-01-01 12:00:00'));
});
afterEach(() => {
  vi.useRealTimers();
});
```

### Browser API Spying

```typescript
const spy = vi.spyOn(window, 'addEventListener');
expect(spy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
```

### Type Inference Validation (`.test-d.ts`)

```typescript
import { expectTypeOf } from 'vitest';
expectTypeOf(countBy([1, 2, 3] as const)).toEqualTypeOf<
  Record<1 | 2 | 3, number>
>();
```

### Benchmarks (`.bench.ts`, utils only)

```typescript
import { bench, describe } from 'vitest';
import { chunk as chunkLodash } from 'lodash-es';
describe('chunk', () => {
  bench('modern-kit/chunk', () => {
    chunk(arr, 4);
  });
  bench('lodash/chunk', () => {
    chunkLodash(arr, 4);
  });
});
```

## JSDoc Rules

```typescript
/**
 * @description Description of the feature (Korean). Multi-line allowed.
 *
 * @template T - Generic type description
 * @param {Type} paramName - Parameter description (Korean)
 * @param {Type} [optionalParam] - Optional parameter
 * @returns {ReturnType} Return value description
 * - `property`: Description of return object property
 *
 * @example
 * fn(arg1, arg2) // expected result as comment
 *
 * @throws Error description (if applicable)
 * @see https://mdn.io/...
 */
```

- **Overloaded functions**: Write individual JSDoc for each overload signature
- Use `@see` to reference MDN, RFC, or related specs

## Error Handling Patterns

```typescript
// Validate input and throw
if (!Number.isInteger(size) || size < 1) {
  throw new Error('Invalid size Value');
}

// try-catch with safe fallback return
try {
  return await getMIMETypeFromUrl(data);
} catch (err: any) {
  console.error(`Failed to get the MIME type. message: ${err.message}`);
  return '';
}
```

## SSR Patterns

```typescript
// isServer() guard
export function isServer(): boolean {
  return typeof window === 'undefined';
}

// Branch before accessing browser APIs
export function getOS() {
  if (isServer()) return 'server';
  return window.navigator.userAgent.match(/ipad|iphone/i) ? 'ios' : 'web';
}

// In React hooks — use useIsomorphicLayoutEffect, useIsMounted
```

## Code Rules Summary

- **No default exports** — named exports only
- **No React.FC** — enforced by ESLint rule
- **No `any`** — use `unknown` or generics
- **Readonly arrays** — support `T[] | readonly T[]` in parameters
- **Internal dependencies** — use `workspace:^` protocol; `@modern-kit/utils` is available in the react package
- **Package manager** — always use `yarn` (never npm)

## Naming Conventions

- Files: camelCase (hooks/utils) / PascalCase (components)
- Variables/Functions: camelCase
- Types/Interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE
- Custom hooks: `use` prefix required
- Test descriptions: Korean, no "should"

## Documentation (Docusaurus)

- utils docs: `.md` files
- react docs: `.mdx` files (with interactive examples)
- react docs format reference: `.claude/rules/react_docs_mdx_format.md`
- types docs format reference: `.claude/rules/types_docs_md_format.md`
- utils docs format reference: `.claude/rules/utils_docs_md_format.md`
- JSDoc tags: `@param`, `@returns`, `@example`, `@throws`, `@template`, `@see`
- Code comments and commit messages: **Korean**

### i18n — Always write both Korean and English

Every MD/MDX doc file requires two files:

```
# Korean (default locale)
docs/docs/react/hooks/useHookName.mdx
docs/docs/utils/[category]/functionName.md

# English translation
docs/i18n/en/docusaurus-plugin-content-docs/current/react/hooks/useHookName.mdx
docs/i18n/en/docusaurus-plugin-content-docs/current/utils/[category]/functionName.md
```

- Keep the same structure and section headers (`## Code`, `## Interface`, `## Remarks`, `## Usage`, etc.) in both files
- Translate only the prose descriptions — code blocks, type signatures, and file paths remain unchanged
