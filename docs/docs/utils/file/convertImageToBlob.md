# convertImageToBlob

이미지를 `canvas`를 활용해 원하는 이미지 포맷(`png`, `jpeg`, `webp`)의 `Blob` 형태로 변환해주는 함수입니다.

💡 `canvas.toBlob()`함수가 허용하는 이미지 타입은 `image/png`, `image/jpeg`, `image/webp` 입니다. `jpg`의 경우 내부적으로 `jpeg`로 변경합니다.

- **[HTMLCanvasElement: toBlob() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)**

> Browsers are required to support `image/png`; many will support additional formats including `image/jpeg` and `image/webp`.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/convertImageToBlob/index.ts)

## Interface
```ts title="typescript"
type CanvasImageType = 'png' | 'jpeg' | 'jpg' | 'webp';

const convertImageToBlob: (
  url: string,
  imageType?: CanvasImageType // default: 'png'
) => Promise<Blob>;
```

## Usage
```ts title="typescript"
import { convertImageToBlob } from '@modern-kit/utils';

const imageBlob = await convertImageToBlob("이미지 src", 'png');
```

## Note
- [HTMLCanvasElement: toBlob() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)