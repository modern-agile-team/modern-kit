# min

배열에서 `최소값`을 반환하는 함수입니다.

`iteratee` 함수를 제공하는 경우 `iteratee` 함수를 기반으로 배열의 각 요소를 변환한 후 최소값을 가진 항목을 반환합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/min/index.ts)

<br />

## Interface

```ts title="typescript"
// 함수 오버로딩
function min(arr: number[] | readonly number[]): number;

function min<T>(arr: T[] | readonly T[], iteratee: (item: T) => number): T;
```

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { min } from '@modern-kit/utils';

const arr = [5, 2, 9, 1, 5, 6];
const result1 = min(arr); // 1
```

<br />

### `iteratee` 함수 사용법

```ts title="typescript"
import { min } from '@modern-kit/utils';

const arr = [
  { value: 5 },
  { value: 2 },
  { value: 9 },
  { value: 1 },
  { value: 5 },
  { value: 6 },
];
const result = min(arr, (item) => item.value); // { value: 1 }
```
