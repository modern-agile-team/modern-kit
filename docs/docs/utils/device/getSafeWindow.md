# getSafeWindow

Window 객체를 안전하게 가져오는 함수입니다.

서버 환경에서 window 객체에 접근하려고 할 때 발생하는 에러를 방지하고, 클라이언트 환경에서만 안전하게 window 객체를 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/getSafeWindow/index.ts)

## Interface
```ts title="typescript"
function getSafeWindow(): Window
```

## Usage
```ts title="typescript"
import { getSafeWindow } from '@modern-kit/utils';

const window = getSafeWindow();
window.addEventListener('click', () => {
  console.log('click');
});
```