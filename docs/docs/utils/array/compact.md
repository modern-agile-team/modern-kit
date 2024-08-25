# compact 

배열에서 `false`, `0`, `''`, `null`, `undefined` 값을 제거하고 새로운 배열을 반환하는 함수입니다.

<br/>

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/compact/index.ts)

## Interface
```ts title="typescript"
type Removable = false | 0 | '' | null | undefined;
type Retained<T> = Exclude<T, Removable>;
const compact: <T>(arr: readonly T[]) => Retained<T>[];
```

## Usage 
```ts title="typescript"
import { compact } from '@modern-kit/utils';

compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// [1, 2, 3, 4, 5]
```