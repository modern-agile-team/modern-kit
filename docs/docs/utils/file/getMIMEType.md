# getMIMEType

**[getMIMETypeFromFile](https://modern-agile-team.github.io/modern-kit/docs/utils/file/getMIMETypeFromFile)**, **[getMIMETypeFromResponse](https://modern-agile-team.github.io/modern-kit/docs/utils/file/getMIMETypeFromResponse)**, **[getMIMETypeFromUrl](https://modern-agile-team.github.io/modern-kit/docs/utils/file/getMIMETypeFromUrl)** 을 통합한 `MIME 타입`을 얻을 수 있는 함수입니다. `MIME 타입`을 가져오는데 실패하면 `빈 문자열('')`을 반환합니다.

💡 **[isMIMEType](https://modern-agile-team.github.io/modern-kit/docs/utils/validator/isMIMEType)** 함수를 통해 타입을 `MIMEType`으로 좁힐 수 있습니다.

💡 모든 MIME 타입 종류는 하단 `Note`를 확인해주세요.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMEType/index.ts)

## Interface
```ts title="typescript"
const getMIMEType: (data: string | File | Response) => Promise<string>
```

## Usage
```ts title="typescript"
import { getMIMEType, isMIMEType } from '@modern-kit/utils';

const mimeType1 = await getMIMEType(response); // getMIMETypeFromResponse를 통해 MIME Type을 얻음
const mimeType2 = await getMIMEType(url); // getMIMETypeFromUrl 통해 MIME Type을 얻음
const mimeType3 = await getMIMEType(file); // getMIMETypeFromFile 통해 MIME Type을 얻음

if (isMIMEType(mimeType1)) {
  mimeType1; // type: MIMEType
} else {
  mimeType1; // type: string
}
```

## Note
- [Common MIME types - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
