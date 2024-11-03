# difference

첫번째 배열을 기준으로 두번째 배열과 `중복된 요소를 제외해 고유한 값만을 갖는` 새로운 배열을 반환하는 함수입니다.

기본적으로 `원시 값`에 대해서만 중복 요소를 판단하지만, `iteratee` 함수를 제공하여 각 요소를 변환한 후 결과 값을 기반으로 비교할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/difference/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

### Default
|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/difference|9,251,611.33|0.0001|`fastest`|
|lodash/difference|4,113,377.61|0.0002|`slowest`|

- **modern-kit/difference**
  - `2.25x` faster than **lodash/difference**

### with iteratee
|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/difference|11,133,900.99|0.0001|`fastest`|
|lodash/differenceBy|3,211,808.45|0.0002|`slowest`|

- **modern-kit/difference**
  - `3.47x` faster than **lodash/differenceBy**

## Interface
```ts title="typescript"
const difference: <T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: ((item: T) => U) | undefined
) => T[];
```

## Usage
### Default
```ts title="typescript"
import { difference } from '@modern-kit/utils';

const arr1 = [1, 2, 3, 4];
const arr2 = [2, 4];

difference(arr1, arr2); // [1, 3]
```

### Iteratee
```ts title="typescript"
import { difference } from '@modern-kit/utils';

const arr1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'dylan' },
  { id: 3, name: 'modern' },
  { id: 4, name: 'gromit' },
];
const arr2 = [
  { id: 2, name: 'john' },
  { id: 4, name: 'gromit' },
];

difference(arr1, arr2, (item) => item.id);
/*
  [
    { id: 1, name: 'john' },
    { id: 3, name: 'modern' },
  ]
*/
```