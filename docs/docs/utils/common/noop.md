# noop

아무 동작 하지 않고, `undefined`를 반환하는 함수입니다.

<br />

## Interface
```tsx
const noop: () => void
```

## Usage
```ts
import { noop } from '@modern-kit/utils';

const handleClick = (callback = noop) => {
  callback();
};
```