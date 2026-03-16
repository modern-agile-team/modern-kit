# Range

A type that generates a range between two given numbers. The last number is not included.

- For example, generating a range from 1 to 5 includes `1, 2, 3, 4`.
- Returns `never` if both numbers are equal.
- Returns `never` if the first number is greater than the second number.

<br />

## Interface

```ts title="typescript"
type Range<T, F> = T extends number
  ? F extends number
    ? Exclude<EnumerateNumbers<F>, EnumerateNumbers<T>>
    : never
  : never;
```

<br />

## Type Parameters

| Name | Constraint | Default | Description              |
| ---- | ---------- | ------- | ------------------------ |
| `T`  | -          | -       | Start number             |
| `F`  | -          | -       | End number (exclusive)   |

<br />

## Usage

```ts title="typescript"
import { Range } from '@modern-kit/types';

type RangeExample = Range<1, 5>; // 1 | 2 | 3 | 4
```
