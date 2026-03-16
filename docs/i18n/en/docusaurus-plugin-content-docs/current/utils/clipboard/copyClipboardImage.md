# copyClipboardImage

A function that reads an image from the given image source and saves it to the `Clipboard`.

`navigator.clipboard.write` is not supported in some browsers. If `write` is not supported, [clipboardTextCopy](https://modern-agile-team.github.io/modern-kit/docs/utils/clipboard/clipboardTextCopy) is called instead.

In Chrome, the `write()` function of the Clipboard API only supports `text/plain`, `text/html`, and `image/png` formats. Therefore, image formats such as `jp(e)g` and `webp` cannot generally be copied to the clipboard.

- **[Chromium - ClipboardWriter::IsValidType](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/clipboard/clipboard_writer.cc;l=304;drc=e882b8e4a8272f65cb14c608d3d2bc4f0512aa20)**

`copyClipboardImage` automatically converts image formats not supported by the `write()` function to `png` before saving them to the clipboard.

<br />

For image types like `image/svg+xml` where the `source code` can be copied and used, the `toText` option is provided as an optional parameter. When `toText` is `true`, **[clipboardTextCopy](https://modern-agile-team.github.io/modern-kit/docs/utils/clipboard/clipboardTextCopy)** is called.

- See the example below for reference.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/copyClipboardImage/index.ts)

<br />

## Interface

```ts title="typescript"
function copyClipboardImage(
  src: string,
  options?: {
    toText: boolean;
  }
): Promise<Blob | string>;
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { copyClipboardImage } from '@modern-kit/utils';
import img from './assets/react.png';

// Image src to copy (png, jp(e)g, webp)
const result = await copyClipboardImage(img); // result: Blob
```

<br />

### Using the toText Option

```ts title="typescript"
import { copyClipboardImage } from '@modern-kit/utils';
import svg from './assets/react.svg';

const result = await copyClipboardImage(svg, { toText: true }); // result type: string

/* Clipboard copy result: text()
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

## References

- [Clipboard API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [Clipboard API Browser Compatibility - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility)
- [How to copy images(en) - web.dev](https://web.dev/patterns/clipboard/copy-images?hl=en)
- [Unblocking clipboard access (en) - web.dev](https://web.dev/articles/async-clipboard?hl=en)
