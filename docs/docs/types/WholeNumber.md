# WholeNumber

양의 정수에 0을 포함한 숫자를 나타내는 타입입니다. (음이 아닌 정수) 음수이거나 소수일 경우 `never`를 반환합니다.

<br />

## Interface

```ts title="typescript"
type WholeNumber<T extends number> = T extends 0 ? 0 : NaturalNumber<T>;
```

<br />

## Usage

### 유효한 케이스

```ts title="typescript"
import { WholeNumber } from '@modern-kit/types';

type ValidWholeNumber1 = WholeNumber<1>; // 1
type ValidWholeNumber2 = WholeNumber<0>; // 0
```

<br />

### 유효하지 않은 케이스

```ts title="typescript"
import { WholeNumber } from '@modern-kit/types';

type InvalidWholeNumber1 = WholeNumber<-1>;  // never (음수이므로)
type InvalidWholeNumber2 = WholeNumber<1.5>; // never (소수이므로)
```
