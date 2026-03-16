# copyFallbackClipboardText

A function that saves the given string to the `Clipboard`.

This is a fallback function that runs when the `Clipboard API` cannot be used — for example, when the browser does not support the `Clipboard API` or when the environment is not `HTTPS`.

> Secure context: This feature is available only in [secure contexts (HTTPS)](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts), in some or all supporting browsers.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/clipboard/copyFallbackClipboardText/index.ts)

<br />

## Interface
```ts title="typescript"
const copyFallbackClipboardText: (value: string) => string
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { copyFallbackClipboardText } from '@modern-kit/utils';

const result = copyFallbackClipboardText("text to copy");
```
