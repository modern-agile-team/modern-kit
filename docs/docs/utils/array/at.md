# at

주어진 배열에서 특정 인덱스의 요소를 반환하는 함수입니다.

[Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) 함수는 최신 스펙 함수이기 때문에 버전 호환성 문제가 발생했을 때 활용할 수 있습니다.

- 참고: [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at#browser_compatibility)

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/at/index.ts)

<br />

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/at | 5,830,795.68 | 0.0003 | `fastest` |
| lodash/nth | 1,801,680.74 | 0.0005 | `slowest` |

- **modern-kit/at**
  - `3.24x` faster than lodash/nth

<br />

## Interface

```ts title="typescript"
function at<T>(arr: T[] | readonly T[], index: number = 0): T | undefined
```

<br />

## Usage

### 양수 인덱스

```ts title="typescript"
import { at } from '@modern-kit/utils';

at([1, 2, 3, 4, 5]); // 1
at([1, 2, 3, 4, 5], 0); // 1
at([1, 2, 3, 4, 5], 1); // 2
at([1, 2, 3, 4, 5], 2); // 3
```

<br />

### 음수 인덱스

```ts title="typescript"
import { at } from '@modern-kit/utils';

at([1, 2, 3, 4, 5], -1); // 5
at([1, 2, 3, 4, 5], -2); // 4
at([1, 2, 3, 4, 5], -3); // 3
```

<br />

### 범위를 벗어난 인덱스

```ts title="typescript"
import { at } from '@modern-kit/utils';

at([1, 2, 3, 4, 5], 3); // undefined
at([1, 2, 3, 4, 5], -4); // undefined
```
