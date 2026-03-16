# copyClipboardText

A function that saves the given string to the `Clipboard`. If the browser does not support the `Clipboard API`, [clipboardFallbackTextCopy](https://modern-agile-team.github.io/modern-kit/docs/utils/clipboard/clipboardFallbackTextCopy) is called instead.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/copyClipboardText/index.ts)

<br />

## Interface
```ts title="typescript"
const copyClipboardText: (value: string) => Promise<string>
```

<br />

## Usage
```ts title="typescript"
import { copyClipboardText } from '@modern-kit/utils';

const result = await copyClipboardText("text to copy");
```
