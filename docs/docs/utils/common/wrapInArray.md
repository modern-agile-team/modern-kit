# wrapInArray

배열이 아니라면 래핑된 배열을 반환하고, 배열이라면 래핑하지 않고 반환해주는 함수입니다.

반환된 배열은 `깊은 복사된 새로운 배열`입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/wrapInArray/index.ts)

<br />

## Interface
```ts title="typescript"
const wrapInArray: <T>(value: T | T[]) => T[]
```

<br />

## Usage
```ts title="typescript"
import { wrapInArray } from '@modern-kit/utils';

const wrappedInArray1 = wrapInArray('ModernKit'); // ['ModernKit']
const wrappedInArray2 = wrapInArray([1, 2, 3]); // [1, 2, 3]
```