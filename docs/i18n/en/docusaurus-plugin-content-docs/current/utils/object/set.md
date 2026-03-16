# set

Updates a specific path in an object and returns a new object.

You can access deeply nested properties using `dot notation`.
If the object type has optional properties, you must access them using `optional (?)` path notation.

Setting the `immutable` option to `true` returns a new object without modifying the original.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/set/index.ts)

<br />

## Interface
```ts title="typescript"
export function set<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>,
  V extends GetByPath<T, P>
>(obj: T, path: P, value: V, options?: { immutable?: boolean }): T;

export function set<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>,
  V extends (value: GetByPath<T, P>) => GetByPath<T, P>
>(obj: T, path: P, updater: V, options?: { immutable?: boolean }): T;
```
- [GetByPath type reference](https://github.com/modern-agile-team/modern-kit/blob/main/packages/types/src/GetByPath/index.ts)
- [PropertyPath type reference](https://github.com/modern-agile-team/modern-kit/blob/main/packages/types/src/PropertyPath/index.ts)

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { set } from '@modern-kit/utils';

const obj: { a: { b: number } } = { a: { b: 1 } };

set(obj, 'a.b', 2); // obj: { a: { b: 2 } }

// Update using an updater function
set(obj, 'a.b', (value) => value + 1); // obj: { a: { b: 3 } }
```

<br />

### Optional Property Access
```ts title="typescript"
const obj: { a: { b?: { c: number } } } = { a: { b: { c: 1 } } };

set(obj, 'a.b?.c', 2); // obj: { a: { b: { c: 2 } } }

// Update using an updater function
set(obj, 'a.b', (value) => value + 1); // obj: { a: { b: { c: 3 } } }
```

<br />

### Immutable Update
```ts title="typescript"
const originalObj: { a: { b: number } } = { a: { b: 1 } };
const updatedObj = set(originalObj, 'a.b', 2, { immutable: true });
// originalObj: { a: { b: 1 } }
// updatedObj: { a: { b: 2 } }
```
