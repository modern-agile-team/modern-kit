# isFunction

A function that checks if the given argument is a `function` and, if so, narrows the argument's type to `Function`.
<br />

## Interface
```tsx title="typescript"
const isFunction: (arg: unknown) => arg is Function
```

## Usage
```ts
import { isFunction } from '@modern-kit/utils';

function example() {}

isFunction(() => {}); // true
isFunction(example); // true

isFunction('123'); // false
isFunction(123); // false
isFunction({}); // false
isFunction([]); // false
```
