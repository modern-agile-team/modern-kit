# omitBy

`omit` 함수와 유사하지만, 주어진 객체에서 `predicate` 함수를 만족하는 프로퍼티를 제외한 새로운 객체를 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/omitBy/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/omitBy|9,108,836.71|0.0001|`fastest`|
|lodash/omitBy|1,876,976.55|0.0005|-|

- **modern-kit/omitBy**
  - `4.85x` faster than lodash/omitBy

## Interface
```ts title="typescript"
function omitBy<T extends Record<PropertyKey, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T>;
```

## Usage
```ts title="typescript"
import { omitBy } from '@modern-kit/utils';

const obj = { a: 1, b: undefined, c: null, d: '', e: 'str' };
const result = omitBy(obj, (value) => !value);
// { a: 1, e: 'str' }
```