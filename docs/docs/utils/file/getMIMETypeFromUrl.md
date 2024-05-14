# getMIMETypeFromUrl

`URL` 문자열을 인자로 받아, 해당 `URL`로 `fetch` 요청 후 응답 받은 `Response` 객체에서 `MIME 타입`을 추출하는 비동기 함수입니다. 

MIME 타입 종류는 하단 `Note`를 확인해주세요.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMETypeFromUrl/index.ts)

## Interface
```ts title="typescript"
const getMIMETypeFromUrl: (url: string) => Promise<string | null>
```

## Usage
```ts title="typescript"
import { getMIMETypeFromUrl } from '@modern-kit/utils';

getMIMETypeFromUrl("URL");
```

## Note
- [Common MIME types - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
