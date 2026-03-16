# getBlobFromUrl

`URL` 문자열을 인자로 받아, 해당 `URL`로 `fetch` 요청 후 응답 받은 `Response` 객체를 `Blob` 객체로 변환 후 이를 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/file/getBlobFromUrl/index.ts)

<br />

## Interface
```ts title="typescript"
const getBlobFromUrl: (url: string) => Promise<Blob>
```

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { getBlobFromUrl } from '@modern-kit/utils';

getBlobFromUrl("URL");
```