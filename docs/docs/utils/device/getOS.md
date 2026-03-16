# getOS

`userAgent`를 기반으로 OS 값을 반환하는 함수입니다.

- server: Server 환경
- ios: iOS 환경
- android: Android 환경
- otherMobile: 그 외 모바일(ex: BlackBerry)
- web: Web 환경

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/getOS/index.ts)

<br />

## Interface
```ts title="typescript"
function getOS(): "server" | "ios" | "android" | "otherMobile" | "web"
```

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { getOS } from '@modern-kit/utils';

const os = getOS();
```