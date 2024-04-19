# isClient

자바스크립트 런타임 환경이 `클라이언트(브라우저)`인지 확인하는 함수입니다.

`true`를 반환 할 경우 클라이언트 환경입니다.

<br />

## Interface
```tsx
const isClient: () => boolean
```

## Usage
```ts
import { isClient } from '@modern-kit/utils';

if (isClient()) {
  /* 브라우저 환경이 보장 */
}
```