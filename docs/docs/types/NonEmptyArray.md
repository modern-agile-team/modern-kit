# NonEmptyArray

최소 `1개 이상`의 요소를 보장하는 배열을 나타내는 타입입니다. 빈 배열이 아닌 배열을 나타내는 타입입니다.

<br />

## Interface

```ts title="typescript"
type NonEmptyArray<T> = [T, ...T[]];
```

<br />

## Usage

```ts title="typescript"
import { NonEmptyArray } from '@modern-kit/types';

const valid: NonEmptyArray<number> = [1, 2, 3];

const invalid: NonEmptyArray<number> = []; // Error
```
