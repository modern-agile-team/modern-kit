# isFunction

A function that checks whether a given argument is a `function`, and if so, narrows the type of the argument to `Function`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isFunction/index.ts)

## Interface
```ts title="typescript"
const isFunction: (arg: unknown) => arg is Function
```

<br />

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
