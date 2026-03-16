# findKey

객체에서 조건에 부합하는 key를 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/findKey/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/findKey | 18,629,221.40 | 0.0001 | `fastest` |
| lodash/findKey | 6,807,578.65 | 0.0001 | `slowest` |

- **modern-kit/findKey**
  - `2.74x` faster than lodash/findKey

<br />

## Interface
```ts title="typescript"
function findKey<T extends Record<PropertyKey, any>>(
  obj: T,
  predicate: (predicateData: {
    value: T[keyof T];
    key: keyof T;
    obj: T;
  }) => boolean
): string | undefined;
```

<br />

## Usage
```ts title="typescript"
import { findKey } from '@modern-kit/utils';

const obj = {
   bike: { active: true },
   plane: { active: true },
   car: { active: false },
};

findKey(obj, (item) => item.active); // 'bike'
```
