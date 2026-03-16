# intersection

`두 배열 내에서 동일하게 존재하는, 교차된 값에 대한` 새로운 배열을 반환하는 함수입니다.

기본적으로 `원시 값`에 대해서만 중복 요소를 판단하며, 필요 시 3번째 인자인 `iteratee` 함수 결과로 교차되는 요소임을 판단할 수 있습니다.

위 함수는 첫번째 배열을 기준으로 `중복된 값을 제거`합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/intersection/index.ts)

<br />

## Benchmark

- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

### Default

| 이름                    | hz           | mean   | 성능      |
| ----------------------- | ------------ | ------ | --------- |
| modern-kit/intersection | 8,649,185.29 | 0.0001 | `fastest` |
| lodash/intersection     | 3,722,050.21 | 0.0003 | `slowest` |

- **modern-kit/intersection**
  - `2.32x` faster than **lodash/intersection**

### with iteratee

| 이름                    | hz            | mean   | 성능      |
| ----------------------- | ------------- | ------ | --------- |
| modern-kit/intersection | 10,210,296.98 | 0.0001 | `fastest` |
| lodash/intersectionBy   | 1,278,057.73  | 0.0002 | `slowest` |

- **modern-kit/intersection**
  - `7.99x` faster than **lodash/intersectionBy**

<br />

## Interface

```ts title="typescript"
function intersection<T, U>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: ((item: T) => U) | undefined
): T[];
```

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { intersection } from '@modern-kit/utils';

intersection([1, 2, 3, 5, 7], [1, 2, 4, 5, 8]); // [1, 2, 5]
```

<br />

### `iteratee` 함수 사용법

```ts title="typescript"
import { intersection } from '@modern-kit/utils';

const testArr1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'gromit' },
];

const testArr2 = [
  { id: 1, name: 'john' },
  { id: 3, name: 'dylan' },
];

intersection(testArr1, testArr2, (item) => item.id);
/*
  [{ id: 1, name: 'John' }];
*/
```
