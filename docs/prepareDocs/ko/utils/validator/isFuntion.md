# isFunction

주어진 인자가 `함수`인지 검사하고, 맞다면 인자의 타입을 `Function`로 좁혀주는 함수입니다.

<br />

## Interface
```tsx title="typescript"
const isFunction: (arg: unknown) => arg is Function
```

## Usage
```ts
import { isFunction } from '@devgrace/utils';

function example() {}

isFunction(() => {}); // true
isFunction(example); // true

isFunction('123'); // false
isFunction(123); // false
isFunction({}); // false
isFunction([]); // false
```
