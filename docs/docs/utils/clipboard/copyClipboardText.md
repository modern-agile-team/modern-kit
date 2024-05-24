# copyClipboardText

인자로 넘겨준 문자열을 `Clipboard`에 저장하는 함수입니다. `Clipboard API`를 지원하지 않는 브라우저 환경일 경우 [clipboardFallbackTextCopy](https://modern-agile-team.github.io/modern-kit/docs/utils/clipboard/clipboardFallbackTextCopy)가 호출됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/copyClipboardText/index.ts)

## Interface
```ts title="typescript"
const copyClipboardText: (value: string) => Promise<string>
```

## Usage
```ts title="typescript"
import { copyClipboardText } from '@modern-kit/utils';

const result = await copyClipboardText("복사 할 텍스트");
```

## Note
- [Clipboard API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [Clipboard API Browser Compatibility - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility)
- [How to Copy Text(en) - web.dev](https://web.dev/patterns/clipboard/copy-text)
- [How to Copy Text(ko) - web.dev](https://web.dev/patterns/clipboard/copy-text?hl=ko)
- [Unblocking clipboard access (en) - web.dev](https://web.dev/articles/async-clipboard)
- [Unblocking clipboard access (ko) - web.dev](https://web.dev/articles/async-clipboard?hl=ko)