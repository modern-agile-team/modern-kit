# isMobile

`모바일 환경`인지 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/isMobile/index.ts)

## Interface
```ts title="typescript"
function isMobile(): boolean
```

## Usage
```ts title="typescript"
import { isMobile } from '@modern-kit/utils';

if (isMobile()) {
  /* 모바일 환경 보장 */
}
```