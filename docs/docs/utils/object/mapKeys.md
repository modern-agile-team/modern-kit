# mapKeys

주어진 객체의 각 키를 주어진 `iteratee` 함수 결과에 따라 변환하여 새로운 객체를 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mapKeys/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/mapKeys | 3,983,407.38 | 0.0003 | `fastest` |
| lodash/mapKeys | 3,060,203.94 | 0.0003 | `slowest` |

- **modern-kit/mapKeys**
  - `1.30x` faster than lodash/mapKeys

<br />

## Interface
```ts title="typescript"
function mapKeys<T extends Record<PropertyKey, any>, K extends PropertyKey>(
  obj: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => K
): Record<K, T[keyof T]>;
```

<br />

## Usage
```ts title="typescript"
import { mapKeys } from '@modern-kit/utils';

const obj = { a: 1, b: 2 };

const newObj = mapKeys(obj, ({ key, value }) => key + value);
// { a1: 1, b2: 2 }
```
