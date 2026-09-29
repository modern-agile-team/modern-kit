# escapeRegExp

문자열에 든 정규 표현식 특수문자(`^` `$` `\` `.` `*` `+` `?` `(` `)` `[` `]` `{` `}` `|`) 앞에 백슬래시를 붙여, 패턴이 아닌 문자 그대로 매치되게 만드는 함수입니다.

문자 클래스(`[...]`) 밖의 패턴 본문에서 특별한 뜻이 없는 `-`와 `/`는 이스케이프하지 않습니다. 따라서 결과를 문자 클래스 안에 넣을 때는 `-`에 주의하세요.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/escapeRegExp/index.ts)

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

// 특수문자가 없으면 원본을 그대로 반환합니다
escapeRegExp('상품 12개'); // '상품 12개'

// 사용자 입력을 문자 그대로 매치하는 정규 표현식 만들기
const pattern = new RegExp(escapeRegExp('(무료배송)'));
pattern.test('가격: 10,000원 (무료배송)'); // true
```
