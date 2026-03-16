# size

주어진 값의 크기를 반환합니다. 크기는 값의 유형에 따라 결정됩니다:
  - `문자열`의 경우, 문자 수를 반환합니다.
  - `배열`, `NodeList` 및 `HTMLCollection`의 경우, 요소의 수를 반환합니다.
  - `Set` 및 `Map`의 경우, 항목 수를 반환합니다.
  - 일반 객체의 경우, `자체 열거 가능한 속성의 수`를 반환합니다.
  - 그 외 숫자, WeakMap, WeakSet 등의 타입은 허용하지 않습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/size/index.ts)

<br />

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| ---- | ------------ | ------ | --------- |
| modern-kit/size | 868,075.34 | 0.0012 | `fastest` |
| lodash/size | 232,384.63 | 0.0043 | `slowest` |

- **modern-kit/size**
  - `3.74x` faster than lodash/size

<br />

## Interface
```ts title="typescript"
function size(value: string | Record<PropertyKey, any>): number
```

<br />

## Usage
### 기본 사용법
```ts title="typescript"
import { size } from '@modern-kit/utils';

size('12345'); // 5

size([1, 2, 3, 4, 5]); // 5

size(new Set([1, 2, 3, 4, 5])); // 5

size({ a: 1, b: 2, c: 3, d: 4, e: 5 }); // 5
```