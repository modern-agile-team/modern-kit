# mapValues

주어진 객체의 각 value를 주어진 `iteratee` 함수 결과에 따라 변환하여 새로운 객체를 반환합니다.

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mapValues/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/mapValues|6,203,964.88|0.0003|`fastest`|
|lodash/mapValues|4,557,524.77|0.0004|`slowest`|

- **modern-kit/mapValues**
  - `1.36x` faster than lodash/mapValues

## Interface
```ts title="typescript"
function mapValues<T extends Record<PropertyKey, any>, V>(
  obj: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => V
): Record<keyof T, V>;
```

## Usage

```ts title="typescript"
import { mapValues } from '@modern-kit/utils';

const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
};

const newUsers = mapValues(users, ({ value }) => value.age);
// { fred: 40, pebbles: 1 }
```