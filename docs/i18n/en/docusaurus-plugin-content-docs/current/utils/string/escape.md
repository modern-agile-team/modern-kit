# escape

Converts the characters `&` `<` `>` `"` `'` in a string to their corresponding HTML entities. For example, `'<'` becomes `'&lt;'`.

When inserting a string whose content is not known in advance into HTML markup, it prevents the string from being interpreted as a tag or attribute boundary. Backticks (`` ` ``) and slashes (`/`) are ordinary characters to the HTML parser, so they are not converted.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/escape/index.ts)

<br />

## Interface
```ts title="typescript"
function escape(str: string): string;
```

<br />

## Usage
```ts title="typescript"
import { escape } from '@modern-kit/utils';

escape('This is a <div> element.'); // 'This is a &lt;div&gt; element.'
escape('This is a "quote"'); // 'This is a &quot;quote&quot;'
escape("This is a 'quote'"); // 'This is a &#39;quote&#39;'
escape('This is a & symbol'); // 'This is a &amp; symbol'

// Returns the original string if there is nothing to convert
escape('상품 12개'); // '상품 12개'
```
