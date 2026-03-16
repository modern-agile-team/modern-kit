# NaturalNumber

A type representing a natural number. (A positive integer greater than 0)

<br />

## Interface

```ts title="typescript"
type NaturalNumber<T extends number> = `${T}` extends
  | `${number}.${number}`
  | `-${string}`
  | '0'
  ? never
  : T;
```

<br />

## Usage

### Valid Natural Number

```ts title="typescript"
import { NaturalNumber } from '@modern-kit/types';

type ValidNaturalNumber1 = NaturalNumber<1>; // 1
type ValidNaturalNumber2 = NaturalNumber<10>; // 10
```

<br />

### Invalid Case

```ts title="typescript"
import { NaturalNumber } from '@modern-kit/types';

type InvalidNaturalNumber1 = NaturalNumber<0>; // never
type InvalidNaturalNumber2 = NaturalNumber<-1>; // never
type InvalidNaturalNumber3 = NaturalNumber<1.5>; // never
```
