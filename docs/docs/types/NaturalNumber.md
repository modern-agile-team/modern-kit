# NaturalNumber

자연수를 나타내는 타입입니다. (0보다 큰 양의 정수)

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

### 유효한 자연수인 경우

```ts title="typescript"
import { NaturalNumber } from '@modern-kit/types';

type ValidNaturalNumber1 = NaturalNumber<1>; // 1
type ValidNaturalNumber2 = NaturalNumber<10>; // 10
```

<br />

### 유효하지 않은 경우

```ts title="typescript"
import { NaturalNumber } from '@modern-kit/types';

type InvalidNaturalNumber1 = NaturalNumber<0>; // never
type InvalidNaturalNumber2 = NaturalNumber<-1>; // never
type InvalidNaturalNumber3 = NaturalNumber<1.5>; // never
```
