# readClipboardText

`Clipboard`에 저장된 텍스트 데이터를 읽어오는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/readClipboardText/index.ts)

<br />

## Interface
```ts title="typescript"
function readClipboardText(): Promise<string>
```

<br />

## Usage
```ts title="typescript"
import { readClipboardText } from '@modern-kit/utils';

const result = await readClipboardText();
// 클립보드에 저장된 텍스트를 읽어옵니다.
```
