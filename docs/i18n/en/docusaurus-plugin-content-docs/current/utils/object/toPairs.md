# toPairs

A function that converts a given value into an array of `[key, value]` pairs (entries).

It supports objects, arrays, `Map`, and `Set`. Since it works based on `Object.keys`, for objects it includes only the object's own enumerable properties and excludes `symbol` keys. Array indexes and numeric object keys are returned as strings, matching the runtime behavior. For a `Set`, the value is placed in both the key and value positions.

If no value is passed, or `null`/`undefined` is passed, it returns an empty array (`[]`).

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/toPairs/index.ts)

<br />

## Interface

```ts title="typescript"
function toPairs<V>(set?: Set<V>): [V, V][];
function toPairs<K, V>(map?: Map<K, V>): [K, V][];
function toPairs<T>(array?: readonly T[]): [string, T][];
function toPairs<T extends Record<PropertyKey, any>>(
  obj?: T
): [SafeKey<T>, T[SafeKey<T>]][];
```

<br />

## Parameters

| Name  | Type                                                              | Default | Description                                     |
| ----- | ----------------------------------------------------------------- | ------- | ----------------------------------------------- |
| `obj` | `Set<V> \| Map<K, V> \| readonly T[] \| Record<PropertyKey, any>` | -       | The value to convert into `[key, value]` pairs. |

<br />

## Usage

### Object

```ts title="typescript"
import { toPairs } from '@modern-kit/utils';

toPairs({ a: 1, b: 2 });
// [['a', 1], ['b', 2]]  →  ['a' | 'b', number][]

toPairs({ 0: 'x', 1: 'y' });
// [['0', 'x'], ['1', 'y']]  →  ['0' | '1', string][]  (keys are strings)

// When passed as const, keys/values are inferred as literals.
toPairs({ a: 1, b: 2 } as const);
// [['a', 1], ['b', 2]]  →  ['a' | 'b', 1 | 2][]
```

<br />

### Array

```ts title="typescript"
import { toPairs } from '@modern-kit/utils';

// Array indexes (keys) are returned as strings, matching Object.keys.
toPairs([10, 20, 30]);
// [['0', 10], ['1', 20], ['2', 30]]  →  [string, number][]
```

<br />

### Map

```ts title="typescript"
import { toPairs } from '@modern-kit/utils';

toPairs(
  new Map([
    ['a', 1],
    ['b', 2],
  ])
);
// [['a', 1], ['b', 2]]  →  [string, number][]
```

<br />

### Set

```ts title="typescript"
import { toPairs } from '@modern-kit/utils';

// For a Set, the value is placed in both the key and value positions.
toPairs(new Set([1, 2, 3]));
// [[1, 1], [2, 2], [3, 3]]  →  [number, number][]
```
