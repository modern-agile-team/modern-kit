# getMIMEType

[getMIMETypeFromFile](https://modern-agile-team.github.io/modern-kit/docs/utils/file/getMIMETypeFromFile), [getMIMETypeFromResponse](https://modern-agile-team.github.io/modern-kit/docs/utils/file/getMIMETypeFromResponse), [getMIMETypeFromUrl](https://modern-agile-team.github.io/modern-kit/docs/utils/file/getMIMETypeFromUrl) 을 통합해 `MIME 타입`을 얻을 수 있는 함수입니다.

MIME 타입 종류는 하단 `Note`를 확인해주세요.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMEType/index.ts)

## Interface
```ts title="typescript"
const getMIMEType: (data: string | File | Response) => Promise<string | null>
```

## Usage
```ts title="typescript"
import { getMIMEType } from '@modern-kit/utils';

getMIMEType(response);
```

## Note
- [Common MIME types - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
