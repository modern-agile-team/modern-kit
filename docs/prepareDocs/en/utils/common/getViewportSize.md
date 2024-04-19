# getViewportSize

A function that returns `Viewport Size`.
In a server environment, it returns `{ width: 0, height: 0}`.

<br />

## Interface
```tsx
const getViewportSize: () => {
  readonly width: number;
  readonly height: number;
}
```

## Usage
```ts
import { getViewportSize } from '@modern-kit/utils';

const { width, height } = getViewportSize();
```