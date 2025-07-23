# isIOS

현재 장치가 `iOS` 장치인지 여부를 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/isIOS/index.ts)

## Interface
```ts title="typescript"
const isIOS: () => boolean
```

## Usage
```ts title="typescript"
import { isIOS } from '@modern-kit/utils';

if (isIOS()) {
  /* iOS 장치인 경우 실행 */
}
```