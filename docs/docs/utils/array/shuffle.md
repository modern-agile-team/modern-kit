# shuffle

배열의 요소들의 순서를 무작위로 섞습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/shuffle/index.ts)

<br />

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/shuffle | 2,874,351.45 | 0.0003 | `fastest` |
| lodash/shuffle | 1,895,677.79 | 0.0005 | `slowest` |

- **modern-kit/shuffle**
  - `1.52x` faster than lodash/shuffle

<br />

## Interface

```ts title="typescript"
function shuffle<T>(arr: T[] | readonly T[]): T[]
```

<br />

## Usage

```ts title="typescript"
import { shuffle } from '@modern-kit/utils';

shuffle([1, 2, 3, 4, 5]); // 무작위로 섞인 배열이 반환됩니다. ex: [3, 5, 1, 3, 2]
```
