# clipboardFallbackTextCopy

인자로 넘겨준 문자열을 `Clipboard`에 저장하는 함수입니다. 

`Clipboard API`를 지원하지 않는 브라우저 환경일 경우, 또는 `HTTPS` 환경이 아닌 경우 등 `Clipboard API`를 사용할 수 없는 경우 실행되는 Fallback 함수입니다.

> Secure context: This feature is available only in [secure contexts (HTTPS)](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts), in some or all supporting browsers.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/clipboardFallbackTextCopy/index.ts)

## Interface
```ts title="typescript"
const clipboardFallbackTextCopy: (value: string) => string
```

## Usage
```ts title="typescript"
import { clipboardFallbackTextCopy } from '@modern-kit/utils';

const result = clipboardFallbackTextCopy("복사 할 텍스트");
```

## Note
- [Clipboard API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [Clipboard API Browser Compatibility - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility)
