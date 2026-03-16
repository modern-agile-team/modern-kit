# asyncNoop

An async function that does nothing and returns `Promise<void>`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/asyncNoop/index.ts)

<br />

## Interface
```ts title="typescript"
const asyncNoop: () => Promise<void>;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { asyncNoop } from '@modern-kit/utils';

const handleAsyncClick = (callback = asyncNoop) => {
  callback();
};
```
