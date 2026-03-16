# getSafeWindow

A function that safely retrieves the Window object.

Prevents errors that occur when trying to access the window object in a server environment, and safely returns the window object only in client environments.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/getSafeWindow/index.ts)

<br />

## Interface
```ts title="typescript"
function getSafeWindow(): Window
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { getSafeWindow } from '@modern-kit/utils';

const window = getSafeWindow();
window.addEventListener('click', () => {
  console.log('click');
});
```
