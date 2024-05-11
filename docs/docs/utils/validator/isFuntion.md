# isFunction

주어진 인자가 `함수`인지 검사하고, 맞다면 인자의 타입을 `Function`로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isFunction/index.ts)

## Interface
```ts title="typescript"
const isFunction: (arg: unknown) => arg is Function
```

## Usage
```ts title="typescript"
import { isFunction } from '@modern-kit/utils';

function example() {}

isFunction(() => {}); // true
isFunction(example); // true

isFunction('123'); // false
isFunction(123); // false
isFunction({}); // false
isFunction([]); // false
```
