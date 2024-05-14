# getMIMETypeFromFile

`File` 객체를 인자로받아, 해당 `File` 객체로부터 `MIME 타입`을 추출하는 함수입니다. 

MIME 타입 종류는 하단 `Note`를 확인해주세요.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMETypeFromFile/index.ts)

## Interface
```ts title="typescript"
const getMIMETypeFromFile: (file: File) => string
```

## Usage
```ts title="typescript"
import { getMIMETypeFromFile } from '@modern-kit/utils';

getMIMETypeFromFile(response);
```

## Note
- [Common MIME types - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
