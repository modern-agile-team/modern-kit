# isBlob

주어진 값이 `Blob` 타입인지 확인하고, 맞다면 인자의 타입을 `Blob`로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isBlob/index.ts)

## Interface
```ts title="typescript"
function isBlob(x: unknown): x is Blob
```

<br />

## Usage
```ts title="typescript"
import { isBlob } from '@modern-kit/utils';

isBlob(new Blob()); // true
isBlob(new Blob(['content'], { type: 'text/plain' })); // true

isBlob('blob'); // false
isBlob(123); // false
isBlob({ a: 1 }); // false
isBlob([1, 2, 3]); // false
isBlob(null); // false
isBlob(undefined); // false
```
