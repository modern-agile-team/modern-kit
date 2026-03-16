# isWindow

A function that checks whether a given argument is the `window` object, and if so, narrows the type of the argument to `Window`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isWindow/index.ts)

## Interface
```ts title="typescript"
function isWindow(element: unknown): element is Window
```

<br />

## Usage
```ts title="typescript"
import { isWindow } from '@modern-kit/utils';

const div = document.createElement('div');

isWindow(window); // true

isWindow(window.document); // false
isWindow({}); // false
isWindow(div); // false
isWindow(1); // false
isWindow(''); // false
```
