# getMIMETypeFromResponse

`Response` 객체를 인자로받아, 해당 `Response` 객체로부터 `MIME 타입`을 추출하는 비동기 함수입니다. `MIME 타입`을 가져오는데 실패하면 `빈 문자열('')`을 반환합니다.

💡 **[isMIMEType](https://modern-agile-team.github.io/modern-kit/docs/utils/validator/isMIMEType)** 함수를 통해 타입을 `MIMEType`으로 좁힐 수 있습니다.

💡 모든 MIME 타입 종류는 하단 `Note`를 확인해주세요.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMETypeFromResponse/index.ts)

## Interface
```ts title="typescript"
const getMIMETypeFromResponse: (response: Response) => string
```

## Usage
```ts title="typescript"
import { getMIMETypeFromResponse, isMIMEType } from '@modern-kit/utils';

const mimeType = await getMIMETypeFromResponse(response);

if (isMIMEType(mimeType)) {
  mimeType; // type: MIMEType
} else {
  mimeType; // type: string
}
```

## Note
- [Common MIME types - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
