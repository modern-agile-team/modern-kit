# range

`주어진 범위 내의 숫자 배열`을 생성해줍니다.

`인자가 하나`만 들어오는 경우 `1부터 해당 값까지의 숫자 배열을 생성`해줍니다.

`세 번째 인자`로 `간격`을 명시해주면, 시작값부터 끝값까지의 숫자 중 `시작값부터 해당 간격만큼 떨어진 값들을 포함하는 배열을 생성`합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/range/index.ts)

## Interface
```ts title="typescript"
// 함수 오버로딩
function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step?: number): number[];
function range(startOrEnd: number, end?: number, step?: number): number[]
```

## Usage
### Default
```ts title="typescript"
import { range } from '@modern-kit/utils';

const result1 = range(1, 6); // [1, 2, 3, 4, 5, 6]
const result2 = range(1, 6, 2); // [1, 3, 5]
```
