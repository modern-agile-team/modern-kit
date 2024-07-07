# difference

첫번째 배열을 기준으로 두번째 배열과 `중복된 요소를 제외해 고유한 값만을 갖는` 새로운 배열을 반환하는 함수입니다.

기본적으로 `원시 값`에 대해서만 중복 요소를 판단하며, 필요 시 3번째 인자인 `iteratee` 함수 결과로 중복 요소임을 판단 할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/difference/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/difference|2,768,995.87|0.0004|`fastest`|
|lodash/differenceBy|1,538,329.26|0.0007|`slowest`|

- **modern-kit/difference**
  - `1.80x` faster than lodash/differenceBy

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

difference([1, 2, 3, 4], [1, 2, 3, 5]); // [4] 
```

### Iteratee
```ts title="typescript"
import { difference } from '@modern-kit/utils';

const firstArr = [
  { id: 1, name: 'john' },
  { id: 2, name: 'dylan' },
];
const secondArr = [
  { id: 1, name: 'john' },
  { id: 3, name: 'gromit' },
];

difference(firstArr, secondArr, (item) => item.id);
/*
  [
    { id: 2, name: 'dylan' },
  ]
*/
```