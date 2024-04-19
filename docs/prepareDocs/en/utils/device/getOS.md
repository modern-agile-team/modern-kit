# getOS

A function that returns the OS value based on the `userAgent`.

- server: Server Environment
- ios: iOS Environment
- android: Android Environment
- otherMobile: Other Mobile Environment(ex: BlackBerry)
- web: Web Environment

<br />

## Interface
```tsx
const getOS: () => "server" | "ios" | "android" | "otherMobile" | "web"
```

## Usage
```ts
import { getOS } from '@modern-kit/utils';

const os = getOS();
```