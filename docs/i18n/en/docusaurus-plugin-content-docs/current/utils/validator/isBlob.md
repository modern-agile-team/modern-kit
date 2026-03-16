# isBlob

A function that checks whether a given value is of type `Blob`, and if so, narrows the type of the argument to `Blob`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isBlob/index.ts)

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
