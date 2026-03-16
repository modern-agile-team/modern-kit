# identity

A function that returns the value passed as an argument as-is.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/identity/index.ts)

<br />

## Interface
```ts title="typescript"
const identity: <T>(value: T) => T;
```

<br />

## Usage
```ts title="typescript"
import { identity } from '@modern-kit/utils';

identity(1); // 1
identity('foo'); // 'foo'
identity([]); // []
```
