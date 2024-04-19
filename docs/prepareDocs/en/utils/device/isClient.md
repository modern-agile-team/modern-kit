# isClient

A function to check if the JavaScript runtime environment is a `Client(browser)`.

If it returns `true`, it is a client environment.

<br />

## Interface
```tsx
const isClient: () => boolean
```

## Usage
```ts
import { isClient } from '@modern-kit/utils';

if (isClient()) {
  /* client environment */
}
```