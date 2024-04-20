# isMobile

`모바일 환경`인지 확인하는 함수입니다.


<br />

## Interface
```tsx
const isMobile: () => boolean
```

## Usage
```ts
import { isMobile } from '@modern-kit/utils';

if (isMobile()) {
  /* 모바일 환경 보장 */
}
```