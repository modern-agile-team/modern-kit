# isClient

자바스크립트 런타임 환경이 `클라이언트(브라우저)`인지 확인하는 함수입니다.

`true`를 반환 할 경우 클라이언트 환경입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/isClient/index.ts)

## Interface
```ts title="typescript"
const isClient: () => boolean
```

## Usage
```ts title="typescript"
import { isClient } from '@modern-kit/utils';

if (isClient()) {
  /* 브라우저 환경이 보장 */
}
```