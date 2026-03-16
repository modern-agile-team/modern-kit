# GetByPath

Returns the type of the value at a specified path within the given object type.
You can access nested object property types using `dot notation`.

If the object type has optional keys, you must use `optional (?) path` to access them. When accessing via an optional path, `undefined` is included in the returned type.

Setting the `isUndefinable` parameter to `true` also includes `undefined` in the returned type.

<br />

## Interface

```ts title="typescript"
type GetByPath<
  T extends Record<PropertyKey, unknown>,
  P extends PropertyPath<T>,
  isUndefinable extends boolean = false
> = P extends `${infer LeftPath}.${infer RightPath}`
  ? LeftPath extends `${infer OptionalLeft}?`
    ? NonNullable<T[OptionalLeft]> extends Record<PropertyKey, unknown>
      ? GetByPath<NonNullable<T[OptionalLeft]>, RightPath, true>
      : never
    : T[LeftPath] extends Record<PropertyKey, unknown>
    ? GetByPath<T[LeftPath], RightPath, isUndefinable>
    : never
  : isUndefinable extends false
  ? T[P]
  : T[P] | undefined;
```

<br />

## Type Parameters

| Name            | Constraint                        | Default | Description                                                      |
| --------------- | --------------------------------- | ------- | ---------------------------------------------------------------- |
| `T`             | `Record<PropertyKey, unknown>`    | -       | The object type to query                                         |
| `P`             | `PropertyPath<T>`                 | -       | The property path expressed in dot notation                      |
| `isUndefinable` | `boolean`                         | `false` | Whether to include `undefined` in the return type for the path   |

<br />

## Usage

### Basic Case

```ts title="typescript"
import { GetByPath } from '@modern-kit/types';

type Example1 = GetByPath<{ a: { b: { c: 1 } } }, 'a'> // { b: { c: 1 } }
type Example2 = GetByPath<{ a: { b: { c: 1 } } }, 'a.b'> // { c: 1 }
type Example3 = GetByPath<{ a: { b: { c: 1 } } }, 'a.b.c'> // 1
```

<br />

### Optional Property Case

```ts title="typescript"
import { GetByPath } from '@modern-kit/types';

type Example4 = GetByPath<{ a: { b?: { c: 1 } } }, 'a.b?.c'> // 1 | undefined
```

<br />

### isUndefinable Case

```ts title="typescript"
import { GetByPath } from '@modern-kit/types';

type Example5 = GetByPath<{ a: { b: { c: 1 } } }, 'a.b.c', true> // 1 | undefined
```
