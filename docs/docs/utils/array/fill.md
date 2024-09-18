# fill

배열을 지정한 값으로 채웁니다.

시작점과 끝점에 대한 인자를 받으면 해당하는 범위의 인덱스만 지정한 값으로 변경합니다.

native fill 함수와 다르게 원본 배열을 수정하지 않고 새로운 배열을 반환합니다.

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/fill/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/fill|7,944,868.54|0.0001|`fastest`|
|js built-in/fill|7,067,972.90|0.0001|-|
|lodash/fill|2,568,241.58|0.0004|`slowest`|

- **modern-kit/fill**
  - `1.12x` faster than js built-in/fill
  - `3.09x` faster than lodash/fill


## Interface
```ts title="typescript"
function fill<T, U>(arr: T[] | readonly T[], target: U): U[];
function fill<T, U>(
  arr: T[] | readonly T[],
  target: U,
  start: number,
): (T | U)[];
function fill<T, U>(
  arr: T[] | readonly T[],
  target: U,
  start: number,
  end: number,
): (T | U)[] 
```

## Usage
```ts title="typescript"
import { fill } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
console.log(fill(arr, 'a')); // ['a', 'a', 'a', 'a', 'a']
console.log(fill(arr, 'a', 2);); // [1, 2, 'a', 'a', 'a']
console.log(fill(arr, 'a', 2, 3)); // [1, 2, 'a', 'a', 5]
```