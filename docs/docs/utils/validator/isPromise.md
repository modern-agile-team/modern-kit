# isPromise

주어진 인자가 `Promise`인지 검사하는 함수입니다. isPromise가 true를 반환하면 인자를 Promise로 타입을 좁혀줍니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isPromise/index.ts)

## Interface
```ts title="typescript"
function isPromise<T = any>(value: unknown): value is Promise<T>;
```

<br />

## Usage
```ts title="typescript"
import { isPromise } from '@modern-kit/utils';

isPromise(Promise.resolve()); // true
isPromise((async () => {})()); // true

isPromise(() => {}); // false
isPromise('123'); // false
isPromise(true); // false
isPromise({}); // false
isPromise(null); // false
```
