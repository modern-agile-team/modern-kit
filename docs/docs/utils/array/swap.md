# swap

배열 내 두 요소의 위치를 교환하며, 옵션에 따라 원본 배열을 수정하거나 새로운 배열을 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/swap/index.ts)

<br />

## Interface

```ts title="typescript"
function swap<T>(
  arr: T[] | readonly T[],
  i: number,
  j: number,
  options?: { immutable?: boolean }
): T[]
```

<br />

## Usage

### 기본 사용법 (원본 배열 수정)

```ts title="typescript"
import { swap } from '@modern-kit/utils';

const arr = [1, 2, 3];
swap(arr, 0, 2); // [3, 2, 1]
console.log(arr); // [3, 2, 1] (원본 배열 수정됨)
```

<br />

### immutable 옵션 (새로운 배열 반환)

```ts title="typescript"
import { swap } from '@modern-kit/utils';

const arr = [1, 2, 3];
const newArr = swap(arr, 0, 2, { immutable: true }); // [3, 2, 1]
console.log(arr);    // [1, 2, 3] (원본 배열 유지)
console.log(newArr); // [3, 2, 1] (새로운 배열 반환)
```
