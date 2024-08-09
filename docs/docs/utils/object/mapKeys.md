# mapKeys 

주어진 객체의 각 키에 대해 제공된 `변환 함수`를 호출하여 새 객체를 생성하는 함수입니다. 반환된 객체는 원본 객체의 키들을 변환한 후 생성된 새로운 객체입니다.

## Code 

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mapKeys/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/mapKeys|411,676.30|0.0024|`fastest`|
|lodash/mapKeys|386,336.12|0.0026|`slowest`|

- **modern-kit/mapKeys**
  - `1.07x` faster than lodash/mapKeys

## Interface
```ts title="typescript"
function mapKeys<
  T extends Record<PropertyKey, any>,
  U extends PropertyKey
>(
  object: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; object: T }) => U
): Record<U, T[keyof T]>
```

## Usage

```ts title="typescript"
import { mapKeys } from '@modern-kit/utils';

const obj = { a: 1, b: 2 };

const newObj = mapKeys(obj, ({ key, value }) => key + value);
// { a1: 1, b2: 2 }
```