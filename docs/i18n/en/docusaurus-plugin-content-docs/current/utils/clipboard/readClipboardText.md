# readClipboardText

A function that reads text data stored in the `Clipboard`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/readClipboardText/index.ts)

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
// Reads the text stored in the clipboard.
```
