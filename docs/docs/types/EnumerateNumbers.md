# EnumerateNumbers

0부터 N-1까지의 숫자 유니온 타입을 생성합니다. `N`이 `number` 타입이 아닐 경우 `never`를 반환합니다.

<br />

## Interface

```ts title="typescript"
type EnumerateNumbers<N> = N extends number
  ? _EnumerateNumbers<N>
  : never;
```

<br />

## Usage

### 기본 케이스

```ts title="typescript"
import { EnumerateNumbers } from '@modern-kit/types';

type ZeroToFive = EnumerateNumbers<6>; // 0 | 1 | 2 | 3 | 4 | 5
```

<br />

### number 타입이 아닌 경우

```ts title="typescript"
import { EnumerateNumbers } from '@modern-kit/types';

type OtherTypeEnumerate = EnumerateNumbers<'6'>; // never
```
