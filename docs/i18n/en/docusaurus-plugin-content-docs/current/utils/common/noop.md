# noop

A function that does nothing and returns `undefined`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/noop/index.ts)

<br />

## Interface
```ts title="typescript"
const noop: () => void
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { noop } from '@modern-kit/utils';

const handleClick = (callback = noop) => {
  callback();
};
```
