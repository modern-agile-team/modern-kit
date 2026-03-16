# PropertyAllPath

Returns all property paths of the given object type as strings separated by `dot(.)`.
All `optional chaining(?)` paths are also included, and for nested objects, all depth paths are expressed as a `union type`.

- **Differences from PropertyPath**
  - Includes both optional and non-optional paths for all properties
  - No depth limit

<br />

## Interface

```ts title="typescript"
type PropertyAllPath<T extends Record<PropertyKey, any>> = {
  [K in keyof T]-?: K extends string
    ? T[K] extends Record<PropertyKey, any> | undefined
      ?
          | `${K}`
          | `${K}.${PropertyAllPath<T[K]>}`
          | `${K}?.${PropertyAllPath<T[K]>}`
      : `${K}`
    : never;
}[keyof T];
```

<br />

## Usage

### Basic Case

```ts title="typescript"
import { PropertyAllPath } from '@modern-kit/types';

type Paths = PropertyAllPath<{ a: string; b: { c: number; d: string } }>;
// "a" | "b" | "b.c" | "b.d" | "b?.c" | "b?.d"
```

<br />

### Non-Object Type Case

```ts title="typescript"
import { PropertyAllPath } from '@modern-kit/types';

type Paths = PropertyAllPath<string>;
// never
```
