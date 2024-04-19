# asyncNoop

Async function that does nothing and returns `Promise<void>`. 

<br />

## Interface
```tsx
const asyncNoop: () => Promise<void>
```

## Usage
```ts
import { asyncNoop } from '@devgrace/utils';

const handleAsyncClick = (callback = asyncNoop) => {
  callback();
};
```