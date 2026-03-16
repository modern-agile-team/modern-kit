# subtract

숫자 배열의 요소들을 순차적으로 `뺄셈`하는 함수입니다.

`iteratee` 함수를 제공하는 경우 `iteratee` 함수를 기반으로 배열의 각 요소를 변환한 후 뺄셈합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/subtract/index.ts)

<br />

## Interface

```ts title="typescript"
// 함수 오버로딩
function subtract(arr: number[] | readonly number[]): number;

function subtract<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;
```

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { subtract } from '@modern-kit/utils';

const result1 = subtract([10, 2, 3]); // 5
```

<br />

### `iteratee` 함수 사용법

```ts title="typescript"
import { subtract } from '@modern-kit/utils';

const result2 = subtract(
  [{ value: 10 }, { value: 2 }, { value: 3 }],
  (item) => item.value
); // 5
```
