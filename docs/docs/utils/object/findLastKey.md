# findLastKey

객체에서 조건에 부합하는 마지막 key를 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/findLastKey/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/findLastKey | 19,157,255.73 | 0.0001 | `fastest` |
| lodash/findLastKey | 7,387,616.57 | 0.0001 | `slowest` |

- **modern-kit/findLastKey**
  - `2.59x` faster than lodash/findLastKey

<br />

## Interface
```ts title="typescript"
function findLastKey<T extends Record<PropertyKey, any>>(
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
import { findLastKey } from '@modern-kit/utils';

const obj = {
   bike: { active: true },
   car: { active: false },
   plane: { active: true },
};
findLastKey(obj, (item) => item.active); // 'plane'
```
