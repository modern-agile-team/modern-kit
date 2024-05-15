# getMIMETypeFromFile

`File` 객체를 인자로받아, 해당 `File` 객체로부터 `MIME 타입`을 추출하는 함수입니다. 

💡 **[isMIMEType](https://modern-agile-team.github.io/modern-kit/docs/utils/validator/isMIMEType)** 함수를 통해 타입을 `MIMEType`으로 좁힐 수 있습니다. 

💡 모든 MIME 타입 종류는 하단 `Note`를 확인해주세요.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMETypeFromFile/index.ts)

## Interface
```ts title="typescript"
const getMIMETypeFromFile: (file: File) => string
```

## Usage
```ts title="typescript"
import { getMIMETypeFromFile, isMIMEType } from '@modern-kit/utils';

const mimeType = getMIMETypeFromFile(response);

if (isMIMEType(mimeType1)) {
  mimeType; // type: MIMEType
} else {
  mimeType; // type: string
}
```

## Note
- [Common MIME types - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
