# unescape

HTML 엔티티 `&amp;` `&lt;` `&gt;` `&quot;` `&#39;`를 원래 문자로 되돌리는 함수입니다. `escape`의 역함수입니다.

`escape`가 만드는 다섯 엔티티만 되돌리며, 숫자 참조 앞에 붙은 `0`은 무시합니다. (`'&#039;'` → `"'"`) 그 밖의 엔티티(`&nbsp;`, `&#x27;` 등)는 건드리지 않습니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/unescape/index.ts)

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

// 문자열을 한 번만 훑으므로 되돌린 결과를 다시 되돌리지 않습니다
unescape('&amp;lt;'); // '&lt;'
```
