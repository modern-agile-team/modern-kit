# isServer

A function that checks whether the JavaScript runtime environment is a `server`.

Returns `true` when in a server environment.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/isServer/index.ts)

<br />

## Interface
```ts title="typescript"
function isServer(): boolean
```

<br />

## Usage

```ts title="typescript"
import { isServer } from '@modern-kit/utils';

if (isServer()) {
  /* Node.js environment is guaranteed */
}
```
