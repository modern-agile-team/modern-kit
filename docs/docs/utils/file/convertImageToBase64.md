# convertImageToBase64

이미지를 `canvas`를 활용해 원하는 이미지 포맷(`png`, `jpeg`, `webp`)의 `Base64` 형태로 변환해주는 함수입니다.

💡 `canvas.toDataURL()`함수가 허용하는 이미지 타입은 `image/png`, `image/jpeg`, `image/png` 입니다. `jpg`의 경우 내부적으로 `jpeg`로 변경합니다.

- **[HTMLCanvasElement: toDataURL() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)**

> Browsers are required to support `image/png`; many will support additional formats including `image/jpeg` and `image/webp`.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/convertImageToBase64/index.ts)

## Interface
```ts title="typescript"
type ImageType = 'png' | 'jpeg' | 'jpg' | 'webp';

const convertImageToBase64: (
  url: string,
  imageType?: ImageType // default: 'png'
) => Promise<string>;
```

## Usage
```ts title="typescript"
import { convertImageToBase64 } from '@modern-kit/utils';

const imageBase64 = await convertImageToBase64("이미지 src", 'png');
```

## Note
- [HTMLCanvasElement: toDataURL() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)