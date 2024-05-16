# clipboardImageCopy

인자로 넘겨준 이미지 소스를 통해 이미지를 읽어 `Clipboard`에 저장하는 함수입니다.

`navigator.clipboard.write`는 일부 브라우저에서 지원하지 않습니다. `write`가 지원하지 않을 경우 [clipboardTextCopy](https://modern-agile-team.github.io/modern-kit/docs/utils/clipboard/clipboardTextCopy)가 호출 됩니다.

Chrome 환경에서 Clipboard API의 `write()`는 `text/plain`, `text/html`, `image/png` 포맷만을 지원합니다. 따라서, `jp(e)g`, `webp`와 같은 이미지 포맷은 클립보드에 복사할 수 없습니다. 원활한 클립보드 복사를 위해서는 `png` 포맷의 이미지 사용을 권장합니다.
- **[Chromium - ClipboardWriter::IsValidType](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/clipboard/clipboard_writer.cc;l=304;drc=e882b8e4a8272f65cb14c608d3d2bc4f0512aa20)**

💡 만약, `jp(e)g`와 `webp`를 클립보드에 저장을 원한다면 `png`로 변환해서 저장해야 됩니다. 이를 위해 `toPng` 옵션을 `true`로 설정해주시길 바랍니다.

💡 이미지 타입이 `image/svg+xml`의 경우에는 `소스 코드`를 복사해서 활용 할 수 있게 **[clipboardTextCopy](https://modern-agile-team.github.io/modern-kit/docs/utils/clipboard/clipboardTextCopy)**가 호출됩니다. 

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/clipboardImageCopy/index.ts)

## Interface
```ts title="typescript"
interface ClipboardImageCopyProps {
  src: string;
  toPng?: boolean; // default: false
}
const clipboardImageCopy: ({
  src,
  toPng,
}: ClipboardImageCopyProps) => Promise<string | Blob | undefined>;
```

## Usage
### Default
```ts title="typescript"
import { clipboardImageCopy } from '@modern-kit/utils';

clipboardImageCopy({ src: "복사 할 이미지 src(png)" });

clipboardImageCopy({ 
  src: "복사 할 이미지 src(jp(e) or Webp)", 
  toPng: true 
});
```

<br />

### image/svg+xml (1)
```ts title="typescript"
import { clipboardImageCopy } from '@modern-kit/utils';

clipboardImageCopy({
  src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K'
});

/* Clipboard 복사 결과: text()
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
    <title>React Logo</title>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" stroke-width="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
*/
```

<br />

### image/svg+xml (2)
```ts title="React(typescript)"
import { clipboardImageCopy } from '@modern-kit/utils';
import svg from "./assets/react.svg";

clipboardImageCopy({
  src: svg,
});

/* Clipboard 복사 결과: text()
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
    <title>React Logo</title>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" stroke-width="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
*/
```

## Note
- [Clipboard API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [Clipboard API Browser Compatibility - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility)
- [How to copy images(en) - web.dev](https://web.dev/patterns/clipboard/copy-images)
- [How to copy images(ko) - web.dev](https://web.dev/patterns/clipboard/copy-images?hl=ko)
- [Unblocking clipboard access (en) - web.dev](https://web.dev/articles/async-clipboard)
- [Unblocking clipboard access (ko) - web.dev](https://web.dev/articles/async-clipboard?hl=ko)