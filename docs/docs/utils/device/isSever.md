# isServer

자바스크립트 런타임 환경이 `서버(Node.js)`인지 확인하는 함수입니다.

`true`를 반환 할 경우 클라이언트 환경입니다.

<br />

## Interface
```tsx
const isServer: () => boolean
```

## Usage
```ts
import { isServer } from '@modern-kit/utils';

if (isServer()) {
  /* Node.js 환경이 보장 */
}
```