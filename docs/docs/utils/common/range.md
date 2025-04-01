# range

시작 값(start)에서 종료 값(end)까지 주어진 간격(step)에 따라 숫자의 배열을 생성합니다.

- step은 1 이상의 정수여야 합니다.

동작은 다음과 같은 4가지 경우로 구분됩니다:

1. 종료 값(end)만 제공될 경우 0부터 종료 값-1까지의 1씩 증가하는 배열을 생성합니다.

2. 시작 값(start)과 종료 값(end)이 제공될 때 시작 값부터 종료 값까지 1씩 증가하는 배열을 생성합니다.

3. 시작 값(start)과 종료 값(end), step 값이 제공될 때 시작 값부터 종료 값까지 step 값을 간격으로 구성된 배열을 생성합니다.

4. start가 end보다 클 경우 내림차순 배열을 생성합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/range/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/range|4,628,798.60|0.0002|`fastest`|
|lodash/range|1,842,731.58|0.0003|`slowest`|

- **modern-kit/range**
  - `2.51x` faster than lodash/range

## Interface
```ts title="typescript"
// 함수 오버로딩
function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
```

## Usage
```ts title="typescript"
import { range } from '@modern-kit/utils';

// 기본 사용
const result1 = range(5); // [0, 1, 2, 3, 4]
const result2 = range(1, 6); // [1, 2, 3, 4, 5]
const result3 = range(1, 6, 2); // [1, 3, 5]
```
```ts title="typescript"
import { range } from '@modern-kit/utils';

// 내림차순 배열
const result5 = range(10, 5); // [10, 9, 8, 7, 6]
const result6 = range(10, 0, 2); // [10, 8, 6, 4, 2]
```
```ts title="typescript"
import { range } from '@modern-kit/utils';

// 음수 범위 처리
const result7 = range(-5); // [0, -1, -2, -3, -4]
const result8 = range(-10, -5); // [-10, -9, -8, -7, -6]
const result9 = range(-10, 0, 2); // [-10, -8, -6, -4, -2]
```