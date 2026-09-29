# escapeRegExp

Prefixes regular expression special characters (`^` `$` `\` `.` `*` `+` `?` `(` `)` `[` `]` `{` `}` `|`) in a string with a backslash, so that they are matched literally instead of as a pattern.

`-` and `/`, which have no special meaning in a pattern body, are not escaped.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/escapeRegExp/index.ts)

<br />

## Interface
```ts title="typescript"
function escapeRegExp(str: string): string;
```

<br />

## Usage
```ts title="typescript"
import { escapeRegExp } from '@modern-kit/utils';

escapeRegExp('1 + 2 = 3?'); // '1 \\+ 2 = 3\\?'
escapeRegExp('[bunjang](https://m.stg-bunjang.co.kr/)');
// '\\[bunjang\\]\\(https://m\\.stg-bunjang\\.co\\.kr/\\)'

// Returns the original string if there are no special characters
escapeRegExp('상품 12개'); // '상품 12개'

// Build a regular expression that matches user input literally
const pattern = new RegExp(escapeRegExp('(무료배송)'));
pattern.test('가격: 10,000원 (무료배송)'); // true
```
