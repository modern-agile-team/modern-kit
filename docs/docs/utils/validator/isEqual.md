# isEqual

인자로 주어진 두 값을 `깊은 비교`해서 같은지 다른지 여부를 반환해주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isEqual/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/isEqual|9,128,265.02|0.0001|`fastest`|
|lodash/isEqual|6,979,847.18|0.0001|`slowest`|

- **modern-kit/isEqual**
  - `1.31x` faster than lodash/isEqual

<br />

## Interface
```ts title="typescript"
const isEqual: (source: any, target: any) => boolean
```

<br />

## Usage
```ts title="typescript"
import { isEqual } from '@modern-kit/utils';

const isEqual1 = isEqual(1, 1); // true
const isEqual2 = isEqual({ a: 1}, { a: 1}); // true
const isEqual3 = isEqual([1, 2, 3], [1, 2, 3]); // true

const isEqual4 = isEqual("1", "2"); // false
const isEqual5 = isEqual({ a: 1}, { a: 2}); // false
const isEqual6 = isEqual([1, 2, 3], [1, "2", 3]); // false
```
