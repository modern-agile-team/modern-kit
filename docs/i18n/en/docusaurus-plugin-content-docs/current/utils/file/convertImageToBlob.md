# convertImageToBlob

A function that converts an image to `Blob` format in the desired image format (`png`, `jpeg`, `webp`) using `canvas`.

💡 The image types accepted by `canvas.toBlob()` are `image/png`, `image/jpeg`, and `image/webp`. For `jpg`, it is internally changed to `jpeg`.

- **[HTMLCanvasElement: toBlob() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)**

> Browsers are required to support `image/png`; many will support additional formats including `image/jpeg` and `image/webp`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/convertImageToBlob/index.ts)

<br />

## Interface
```ts title="typescript"
type CanvasImageType = 'png' | 'jpeg' | 'jpg' | 'webp';

const convertImageToBlob: (
  url: string,
  imageType?: CanvasImageType // default: 'png'
) => Promise<Blob>;
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { convertImageToBlob } from '@modern-kit/utils';

const imageBlob = await convertImageToBlob("image src", 'png');
```
