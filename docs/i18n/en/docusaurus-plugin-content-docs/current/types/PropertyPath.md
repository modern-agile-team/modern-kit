# PropertyPath

Returns the valid property paths of the given object type as strings separated by `dot(.)`.
Includes `optional chaining(?)` only for optional properties, and for nested objects, all depth paths are expressed as a `union type`.

- **Differences from PropertyAllPath**
  - Depth limit (10 levels)
  - Includes `optional` paths only for actual optional properties

<br />

## Interface

```ts title="typescript"
type PropertyPath<
  T,
  Limit extends unknown[] = []
> = Limit['length'] extends 10
  ? never
  : {
      [K in keyof T & string]: T[K] extends
        | Record<PropertyKey, unknown>
        | undefined
        ?
            | K
            | (T[K] extends Record<PropertyKey, unknown>
                ? `${K}.${PropertyPath<T[K], [...Limit, unknown]>}`
                : `${K}?.${PropertyPath<
                    NonNullable<T[K]>,
                    [...Limit, unknown]
                  >}`)
        : K;
    }[keyof T & string];
```

<br />

## Type Parameters

| Name    | Constraint  | Default | Description                                        |
| ------- | ----------- | ------- | -------------------------------------------------- |
| `T`     | -           | -       | The target object type to extract paths from       |
| `Limit` | `unknown[]` | `[]`    | Internal parameter for limiting recursion depth    |

<br />

## Usage

### Basic Case

```ts title="typescript"
import { PropertyPath } from '@modern-kit/types';

type Paths = PropertyPath<{ a: string; b: { c: number; d: string } }>;
// "a" | "b" | "b.c" | "b.d"
```

<br />

### Optional Property Case

```ts title="typescript"
import { PropertyPath } from '@modern-kit/types';

type Paths = PropertyPath<{ a: string; b?: { c: number; d: string } }>;
// "a" | "b" | "b?.c" | "b?.d"
```
