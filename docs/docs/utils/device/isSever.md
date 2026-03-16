# isServer

자바스크립트 런타임 환경이 `서버`인지 확인하는 함수입니다.

`true`를 반환 할 경우 서버 환경입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/isServer/index.ts)

<br />

## Interface
```ts title="typescript"
function isServer(): boolean
```

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { isServer } from '@modern-kit/utils';

if (isServer()) {
  /* Node.js 환경이 보장 */
}
```