# chunk

주어진 배열을 지정된 `size`만큼의 작은 배열로 나누어 반환하는 유틸리티 함수입니다.  
`size === 0` 이거나 배열이 비어있는 경우 빈 배열을 반환하며, `size <= array.length`인 경우 전체 배열을 하나의 배열로 감싸서 반환합니다.

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/chunk/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/chunk|5,176,276.00|0.0002|`fastest`|
|lodash/chunk|4,463,170.87|0.0002|`slowest`|

- **modern-kit/chunk**
  - `1.16x` faster than lodash/chunk

## Interface

```ts title="typescript"
function chunk<T>(arr: T[] | readonly T[], size: number): T[][]
```

## Usage

```ts title="typescript"
import { chunk } from '@modern-kit/utils';

const array1 = [1, 2, 3, 4, 5];
const size1 = 2;
chunk(array1, size1); // [[1, 2], [3, 4], [5]]

const array2 = ['a', 'b', 'c', 'd'];
const size2 = 3;
chunk(array2, size2); // [['a', 'b', 'c'], ['d']]

const array3 = [1, 2, 3, 4];
const size3 = 5;
chunk(array3, size3); // [[1, 2, 3, 4]]

const array4 = [];
const size4 = 2;
chunk(array4, size4); // []
```

