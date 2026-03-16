# getOS

A function that returns the OS value based on `userAgent`.

- server: Server environment
- ios: iOS environment
- android: Android environment
- otherMobile: Other mobile devices (e.g., BlackBerry)
- web: Web environment

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/device/getOS/index.ts)

<br />

## Interface
```ts title="typescript"
function getOS(): "server" | "ios" | "android" | "otherMobile" | "web"
```

<br />

## Usage

```ts title="typescript"
import { getOS } from '@modern-kit/utils';

const os = getOS();
```
