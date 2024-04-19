# asyncNoop

아무 동작 하지 않고, `Promise<void>`를 반환하는 async 함수입니다.

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