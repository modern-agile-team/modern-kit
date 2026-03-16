# isPromise

A function that checks whether a given argument is a `Promise`. If isPromise returns true, the type of the argument is narrowed to Promise.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isPromise/index.ts)

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
