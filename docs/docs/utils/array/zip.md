# zip

여러 배열을 결합하여 튜플 형태의 배열을 반환합니다.

입력 배열들의 길이가 서로 다르다면, 결과 배열은 가장 긴 입력 배열의 길이를 가집니다.

누락된 요소에 대해서는 undefined 값이 사용됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/zip/index.ts)

<br />

## Interface

```ts title="typescript"
function zip<T extends (readonly unknown[])[]>(
  ...arrs: T
): Array<{
  [K in keyof T]: T[K] extends (infer U)[] ? U : never;
}>;
```

<br />

## Usage

```ts title="typescript"
import { zip } from '@modern-kit/utils';

const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const arr3 = [true, false, true];
const arr4 = [null, null];

zip(arr1);
// [[1], [2], [3]]
zip(arr1, arr2);
// [[1, 'a'], [2, 'b'], [3, 'c']]
zip(arr1, arr2, arr3);
// [[1, 'a', true], [2, 'b', false], [3, 'c', true]]
zip(arr1, arr2, arr3, arr4);
// [[1, 'a', true, null], [2, 'b', false, null], [3, 'c', true, undefined]]
```
