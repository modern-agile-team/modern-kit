# union

두 배열을 결합 후, `중복 요소를 제외해 고유한 값만을 갖는` 새로운 배열을 반환하는 함수입니다.

기본적으로 `원시 값`에 대해서만 중복 요소를 판단합니다.

2번째 인자인 `iteratee` 함수를 제공하면, 각 요소를 iteratee 반환값에 따라 중복 여부를 판단할 수 있습니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/union/index.ts)

<br />

## Benchmark

- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

### Default

| 이름             | hz           | mean   | 성능      |
| ---------------- | ------------ | ------ | --------- |
| modern-kit/union | 4,409,019.08 | 0.0002 | `fastest` |
| lodash/union     | 3,714,184.11 | 0.0003 | `slowest` |

- **modern-kit/union**
  - `1.19x` faster than **lodash/union**

### with iteratee

| 이름             | hz           | mean   | 성능      |
| ---------------- | ------------ | ------ | --------- |
| modern-kit/union | 3,801,245.65 | 0.0003 | `fastest` |
| lodash/unionBy   | 2,537,527.22 | 0.0004 | `slowest` |

- **modern-kit/union**
  - `1.50x` faster than **lodash/unionBy**

<br />

## Interface

```ts title="typescript"
function union<T>(arr1: T[] | readonly T[], arr2: T[] | readonly T[]): T[];

function union<T, U = T>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[];
```

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { union } from '@modern-kit/utils';

union([1, 2, 3, 4], [1, 2, 3, 5]); // [1, 2, 3, 4, 5]
```

<br />

### `iteratee` 함수 사용법

```ts title="typescript"
import { union } from '@modern-kit/utils';

const arr1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const arr2 = [
  { id: 1, name: 'john' },
  { id: 3, name: 'gromit' },
];

union(arr1, arr2, (item) => item.id);
/*
  [
    { id: 1, name: 'john' },
    { id: 2, name: 'jane' },
    { id: 3, name: 'gromit' }
  ]
*/
```
