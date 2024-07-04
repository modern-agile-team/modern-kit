# flatten

중첩 배열을 `평탄화`해주는 함수입니다. `depth` 옵션으로 평탄화 깊이를 직접 지정 할 수 있습니다.

JS에서 기본적으로 제공하는 [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)은 성능이 좋지 않습니다.

제공하는 flatten 함수는 `JS의 flat`과 `lodash의 flattenDepth`보다 성능적으로 우수합니다.

![스크린샷 2024-07-05 오전 12 52 52](https://github.com/modern-agile-team/modern-kit/assets/64779472/ec47c879-6346-4f47-8ad1-006c00ce3d71)

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flatten/index.ts)

## Interface
```ts title="typescript"
type FlatArray<Arr, Depth extends number> = {
    "done": Arr,
    "recur": Arr extends ReadonlyArray<infer InnerArr>
        ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
        : Arr
}[Depth extends -1 ? "done" : "recur"];
```
```ts title="typescript"
const flatten: <T, D extends number>(
  arr: T[] | readonly T[],
  depth?: D // default: 1
) => FlatArray<T[], D>[];
```

## Usage
```ts title="typescript"
import { flatten } from '@modern-kit/utils';

const arr = [1, [2, [3, [4, [5]]]]];

flatten(arr, 1); // [1, 2, [3, [4, [5]]]]
flatten(arr, 2); // [1, 2, 3, [4, [5]]]
flatten(arr, 3); // [1, 2, 3, 4, [5]]
flatten(arr, 4); // [1, 2, 3, 4, 5]
```
