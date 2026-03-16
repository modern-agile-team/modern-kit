# readClipboardContents

`Clipboard`에 저장된 `텍스트`를 포함한 `html`, `이미지` 등 다양한 유형의 컨텐츠를 읽어오는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/readClipboardContents/index.ts)

<br />

## Interface
```ts title="typescript"
const readClipboardContents: () => Promise<ClipboardItems>
```

<br />

## Usage
```ts title="typescript"
import { readClipboardContents } from '@modern-kit/utils';

const result = await readClipboardContents();
// 클립보드의 텍스트를 포함한 html, 이미지 등 다양한 유형의 컨텐츠를 읽어옵니다.
```