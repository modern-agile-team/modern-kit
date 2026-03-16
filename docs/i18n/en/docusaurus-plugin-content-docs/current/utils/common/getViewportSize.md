# getViewportSize

A function that returns the current `Viewport Size`.
In a server environment, it returns `{ width: 0, height: 0 }`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/getViewportSize/index.tsx)

<br />

## Interface
```ts title="typescript"
const getViewportSize: () => {
  readonly width: number;
  readonly height: number;
}
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { getViewportSize } from '@modern-kit/utils';

const { width, height } = getViewportSize();
```
