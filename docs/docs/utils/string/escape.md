# escape

문자열에 든 `&` `<` `>` `"` `'`를 대응하는 HTML 엔티티로 바꾸는 함수입니다. 예를 들어 `'<'`는 `'&lt;'`가 됩니다.

내용을 미리 알 수 없는 문자열을 HTML 마크업에 끼워 넣을 때, 그 문자열이 태그나 속성 경계로 해석되지 않게 막아 줍니다. 백틱(`` ` ``)과 슬래시(`/`)는 HTML 파서에게 평범한 글자이므로 바꾸지 않습니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/escape/index.ts)

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

// 바꿀 문자가 없으면 원본을 그대로 반환합니다
escape('상품 12개'); // '상품 12개'
```
