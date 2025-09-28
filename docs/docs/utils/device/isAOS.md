# isAOS

현재 장치가 `AOS(Android)` 장치인지 여부를 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/isAOS/index.ts)

## Interface
```ts title="typescript"
function isAOS(): boolean
```

## Usage
```ts title="typescript"
import { isAOS } from '@modern-kit/utils';

if (isAOS()) {
  /* AOS 장치인 경우 실행 */
}
```