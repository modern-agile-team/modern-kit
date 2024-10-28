# pickBy

`pick` 함수와 유사하지만, 주어진 객체에서 `predicate` 함수를 만족하는 프로퍼티로 구성된 새로운 객체를 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/pickBy/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/pickBy|7,602,665.15|0.0001|`fastest`|
|lodash/pickBy|1,768,814.92|0.0006|-|

- **modern-kit/pickBy**
  - `4.30x` faster than lodash/pickBy

## Interface
```ts title="typescript"
function pickBy<T extends Record<PropertyKey, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T>;
```

## Usage
```ts title="typescript"
import { pickBy } from '@modern-kit/utils';

const obj = { a: 1, b: undefined, c: null, d: '', e: 'str' };
const result = pickBy(obj, (value) => !value);
// { b: undefined, c: null, d: '' }
```