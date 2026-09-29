# unescape

Converts the HTML entities `&amp;` `&lt;` `&gt;` `&quot;` `&#39;` back to their original characters. It is the inverse of `escape`.

Only the five entities produced by `escape` are converted, and leading `0`s in numeric references are ignored. (`'&#039;'` → `"'"`) Other entities (`&nbsp;`, `&#x27;`, etc.) are left untouched.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/unescape/index.ts)

<br />

## Interface
```ts title="typescript"
function unescape(str: string): string;
```

<br />

## Usage
```ts title="typescript"
import { unescape } from '@modern-kit/utils';

unescape('This is a &lt;div&gt; element.'); // 'This is a <div> element.'
unescape('This is a &quot;quote&quot;'); // 'This is a "quote"'
unescape('This is a &#39;quote&#39;'); // "This is a 'quote'"
unescape('This is a &amp; symbol'); // 'This is a & symbol'

// Scans the string only once, so converted results are not converted again
unescape('&amp;lt;'); // '&lt;'
```
