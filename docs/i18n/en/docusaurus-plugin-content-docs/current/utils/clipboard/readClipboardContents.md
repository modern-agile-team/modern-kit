# readClipboardContents

A function that reads various types of content stored in the `Clipboard`, including `text`, `html`, and `images`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/readClipboardContents/index.ts)

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
// Reads various types of content from the clipboard, including text, html, and images.
```
