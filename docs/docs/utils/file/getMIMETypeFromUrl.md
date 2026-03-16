# getMIMETypeFromUrl

`URL` 문자열을 인자로 받아, 해당 `URL`로 `fetch` 요청 후 응답 받은 `Response` 객체에서 `MIME 타입`을 추출하는 비동기 함수입니다. `MIME 타입`을 가져오는데 실패하면 `빈 문자열('')`을 반환합니다.

💡 **[isMIMEType](https://modern-agile-team.github.io/modern-kit/docs/utils/validator/isMIMEType)** 함수를 통해 타입을 `MIMEType`으로 좁힐 수 있습니다.

💡 모든 MIME 타입 종류는 하단 `Note`를 확인해주세요.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getMIMETypeFromUrl/index.ts)

<br />

## Interface
```ts title="typescript"
const getMIMETypeFromUrl: (url: string) => Promise<string>
```

<br />

## Usage

```ts title="typescript"
import { getMIMETypeFromUrl, isMIMEType } from '@modern-kit/utils';

const mimeType = await getMIMETypeFromUrl("URL");

if (isMIMEType(mimeType)) {
  mimeType; // type: MIMEType
} else {
  mimeType; // type: string
}
```
