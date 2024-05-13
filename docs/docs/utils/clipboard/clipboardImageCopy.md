# clipboardImageCopy

인자로 넘겨준 이미지 소스를 통해 이미지를 읽어 `Clipboard`에 저장하는 함수입니다.

`navigator.clipboard.write`는 일부 브라우저에서 지원하지 않습니다. `write`가 지원하지 않을 경우 [clipboardTextCopy](https://modern-agile-team.github.io/modern-kit/docs/utils/clipboard/clipboardTextCopy)가 호출 됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/clipboardImageCopy/index.ts)

## Interface
```ts title="typescript"
const clipboardImageCopy: (imgSrc: string) => Promise<void>
```

## Usage
```ts title="typescript"
import { clipboardImageCopy } from '@modern-kit/utils';

clipboardImageCopy("복사 할 이미지 src");
```

## Note
- [Clipboard API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [Clipboard API Browser Compatibility - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility)
- [How to copy images(en) - web.dev](https://web.dev/patterns/clipboard/copy-images)
- [How to copy images(ko) - web.dev](https://web.dev/patterns/clipboard/copy-images?hl=ko)
- [Unblocking clipboard access (en) - web.dev](https://web.dev/articles/async-clipboard)
- [Unblocking clipboard access (ko) - web.dev](https://web.dev/articles/async-clipboard?hl=ko)