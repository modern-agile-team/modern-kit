# convertImageToBase64

A function that converts an image to `Base64` format in the desired image format (`png`, `jpeg`, `webp`) using `canvas`.

💡 The image types accepted by `canvas.toDataURL()` are `image/png`, `image/jpeg`, and `image/webp`. For `jpg`, it is internally changed to `jpeg`.

- **[HTMLCanvasElement: toDataURL() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)**

> Browsers are required to support `image/png`; many will support additional formats including `image/jpeg` and `image/webp`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/convertImageToBase64/index.ts)

<br />

## Interface
```ts title="typescript"
type CanvasImageType = 'png' | 'jpeg' | 'jpg' | 'webp';

const convertImageToBase64: (
  url: string,
  imageType?: CanvasImageType // default: 'png'
) => Promise<string>;
```

<br />

## Usage

```ts title="typescript"
import { convertImageToBase64 } from '@modern-kit/utils';

const imageBase64 = await convertImageToBase64("image src", 'png');
```
