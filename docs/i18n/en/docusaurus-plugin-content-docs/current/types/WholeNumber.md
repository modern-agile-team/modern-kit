# WholeNumber

A type representing numbers including 0 and positive integers (non-negative integers). Returns `never` for negative numbers or decimals.

<br />

## Interface

```ts title="typescript"
type WholeNumber<T extends number> = T extends 0 ? 0 : NaturalNumber<T>;
```

<br />

## Usage

### Valid Case

```ts title="typescript"
import { WholeNumber } from '@modern-kit/types';

type ValidWholeNumber1 = WholeNumber<1>; // 1
type ValidWholeNumber2 = WholeNumber<0>; // 0
```

<br />

### Invalid Case

```ts title="typescript"
import { WholeNumber } from '@modern-kit/types';

type InvalidWholeNumber1 = WholeNumber<-1>;  // never (negative number)
type InvalidWholeNumber2 = WholeNumber<1.5>; // never (decimal number)
```
