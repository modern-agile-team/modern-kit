# EnumerateNumbers

Generates a union type of numbers from 0 to N-1. Returns `never` if `N` is not a `number` type.

<br />

## Interface

```ts title="typescript"
type EnumerateNumbers<N> = N extends number
  ? _EnumerateNumbers<N>
  : never;
```

<br />

## Usage

### Basic Case

```ts title="typescript"
import { EnumerateNumbers } from '@modern-kit/types';

type ZeroToFive = EnumerateNumbers<6>; // 0 | 1 | 2 | 3 | 4 | 5
```

<br />

### Non-number Type

```ts title="typescript"
import { EnumerateNumbers } from '@modern-kit/types';

type OtherTypeEnumerate = EnumerateNumbers<'6'>; // never
```
