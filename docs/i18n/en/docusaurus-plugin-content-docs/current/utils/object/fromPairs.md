# fromPairs

A function that converts an array of `[key, value]` pair entries into an object.

It performs the opposite of `toPairs`, returning an object whose keys are the first element of each pair and whose values are the second element.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/fromPairs/index.ts)

<br />

## Interface

```ts title="typescript"
function fromPairs<T extends [PropertyKey, any][]>(
  pairs: T
): Record<T[number][0], T[number][1]>;
```

<br />

## Parameters

| Name    | Type                   | Default | Description                                                  |
| ------- | ---------------------- | ------- | ------------------------------------------------------------ |
| `pairs` | `[PropertyKey, any][]` | -       | The array of `[key, value]` pairs to convert into an object. |

<br />

## Returns

| Type                                 | Description                                     |
| ------------------------------------ | ----------------------------------------------- |
| `Record<T[number][0], T[number][1]>` | Returns an object with each pair as a property. |

<br />

## Usage

```ts title="typescript"
import { fromPairs } from '@modern-kit/utils';

fromPairs([
  ['a', 1],
  ['b', 2],
]);
// { a: 1, b: 2 }  →  Record<string, number>

// When passed as const, keys/values are inferred as literals.
fromPairs([
  ['a', 1],
  ['b', 2],
] as const);
// { a: 1, b: 2 }  →  Record<'a' | 'b', 1 | 2>
```
