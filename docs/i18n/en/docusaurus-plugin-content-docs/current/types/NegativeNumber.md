# NegativeNumber

A type that checks whether a given number type is `negative`. Returns `never` if it is not a negative number.

<br />

## Interface

```ts title="typescript"
type NegativeNumber<T extends number> = `${T}` extends `-${number}`
  ? T
  : never;
```

<br />

## Usage

### Valid Negative Number Case

```ts title="typescript"
import { NegativeNumber } from '@modern-kit/types';

type ValidNegativeNumber1 = NegativeNumber<-1>; // -1
type ValidNegativeNumber2 = NegativeNumber<-10>; // -10
```

<br />

### Invalid Case

```ts title="typescript"
import { NegativeNumber } from '@modern-kit/types';

type InvalidNegativeNumber1 = NegativeNumber<1>;   // never
type InvalidNegativeNumber2 = NegativeNumber<0>;   // never
type InvalidNegativeNumber3 = NegativeNumber<1.5>; // never
```
