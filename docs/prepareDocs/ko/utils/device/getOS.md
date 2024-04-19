# getOS

`userAgent`를 기반으로 OS 값을 반환하는 함수입니다.

- server: Server 환경
- ios: iOS 환경
- android: Android 환경
- otherMobile: 그 외 모바일(ex: BlackBerry)
- web: Web 환경

<br />

## Interface
```tsx
const getOS: () => "server" | "ios" | "android" | "otherMobile" | "web"
```

## Usage
```ts
import { getOS } from '@devgrace/utils';

const os = getOS();
```