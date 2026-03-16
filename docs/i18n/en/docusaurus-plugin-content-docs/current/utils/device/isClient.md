# isClient

A function that checks whether the JavaScript runtime environment is a `client (browser)`.

Returns `true` when in a client environment.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/isClient/index.ts)

<br />

## Interface
```ts title="typescript"
function isClient(): boolean
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { isClient } from '@modern-kit/utils';

if (isClient()) {
  /* Browser environment is guaranteed */
}
```
