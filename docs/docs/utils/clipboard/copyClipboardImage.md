# copyClipboardImage

인자로 넘겨준 이미지 소스를 통해 이미지를 읽어 `Clipboard`에 저장하는 함수입니다.

`navigator.clipboard.write`는 일부 브라우저에서 지원하지 않습니다. `write`가 지원하지 않을 경우 [clipboardTextCopy](https://modern-agile-team.github.io/modern-kit/docs/utils/clipboard/clipboardTextCopy)가 호출 됩니다.

Chrome 환경에서 Clipboard API의 `write()`함수는 `text/plain`, `text/html`, `image/png` 포맷만을 지원합니다. 따라서, `jp(e)g`, `webp`와 같은 이미지 포맷은 일반적으로 클립보드에 복사할 수 없습니다.
- **[Chromium - ClipboardWriter::IsValidType](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/clipboard/clipboard_writer.cc;l=304;drc=e882b8e4a8272f65cb14c608d3d2bc4f0512aa20)**

💡 하지만, `copyClipboardImage`은 앞서 말한 `write()`함수에 지원하지 않는 이미지 포맷들을 `png`로 자동 변환 후에 클립보드에 저장합니다.

💡 이미지 타입이 `image/svg+xml`처럼 `소스 코드`를 복사해서 활용 할 수 있는 케이스의 경우 `toText` 옵션을 옵셔널로 제공합니다. toText가 `true`일 경우 **[clipboardTextCopy](https://modern-agile-team.github.io/modern-kit/docs/utils/clipboard/clipboardTextCopy)** 가 호출됩니다. 
  - 아래 예제를 참고해주세요.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/copyClipboardImage/index.ts)

## Interface
```ts title="typescript"
function copyClipboardImage(
  src: string,
  options?: {
    toText: boolean;
  }
): Promise<Blob | string>;
```

## Usage
### Default
```ts title="typescript"
import { copyClipboardImage } from '@modern-kit/utils';
import img from "./assets/react.png";

// 복사 할 이미지 src(png, jp(e)g, webp)
const result = await copyClipboardImage(img); // result: Blob
```

<br />

### toText
```ts title="React(typescript)"
import { copyClipboardImage } from '@modern-kit/utils';
import svg from "./assets/react.svg";

const result = await copyClipboardImage(svg, { toText: true }); // result type: string

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