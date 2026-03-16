# get

A function that returns the value at a specified path in a given object in a type-safe manner.
You can access deeply nested properties using dot notation.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/get/index.ts)

<br />

## Interface
```ts title="typescript"
function get<T extends Record<PropertyKey, any>, K extends PropertyPath<T>>(
  obj: T,
  path: K,
  defaultValue?: GetByPath<T, K>
): GetByPath<T, K>;
```
- [GetByPath type reference](https://github.com/modern-agile-team/modern-kit/blob/main/packages/types/src/GetByPath/index.ts)
- [PropertyPath type reference](https://github.com/modern-agile-team/modern-kit/blob/main/packages/types/src/PropertyPath/index.ts)

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { get } from '@modern-kit/utils';

const obj: { a: { b: { c: number } } } = { a: { b: { c: 1 } } };

// Single property access
get(obj, 'a'); // { b: { c: 1 } }

// Nested property access
get(obj, 'a.b'); // { c: 1 }
get(obj, 'a.b.c'); // 1
```

<br />

### Optional Property Access
```ts title="typescript"
const obj: { a: { b?: { c: number } } } = { a: { b: { c: 1 } } };

// Optional property access
get(obj, 'a.b');
// value: { c: 1 }
// type: { c: 1 } | undefined

get(obj, 'a.b?.c');
// value: 1
// type: 1 | undefined
```

<br />

### Default Value
```ts title="typescript"
const obj: { a?: { b?: { c?: number } } } = {};

get(obj, 'a', { b: { c: 1 } }); // { b: { c: 1 } }
get(obj, 'a?.b', { c: 1 }); // { c: 1 }
get(obj, 'a?.b?.c', 1); // 1
```
