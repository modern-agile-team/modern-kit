# compact 

배열에서 `false`, `0`, `''`, `null`, `undefined` 값을 제거하고 새로운 배열을 반환하는 함수입니다.

<br/>

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/compact/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/compact|7,306,246.60|0.0004|`fastest`|
|lodash/compact|5,472,880.46|0.0006|`slowest`|

- **modern-kit/compact**
  - `1.33x` faster than lodash/compact

## Interface
```ts title="typescript"
type Removable = false | 0 | '' | null | undefined;
type Retained<T> = Exclude<T, Removable>;

const compact: <T>(arr: T[] | readonly T[]) => Retained<T>[];
```

## Usage 
```ts title="typescript"
import { compact } from '@modern-kit/utils';

compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// [1, 2, 3, 4, 5]
```