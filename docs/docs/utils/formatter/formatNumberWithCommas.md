# formatNumberWithCommas

주어진 `숫자` 또는 `문자열`에 포함된 숫자를 천 단위로 `(,)comma`를 추가한 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithCommas/index.ts)

## Interface
```ts title="typescript"
function formatNumberWithCommas(value: number | string): string
```

## Usage
```ts title="typescript"
import { formatNumberWithCommas } from '@modern-kit/utils';

// 숫자
formatNumberWithCommas(200); // '200'
formatNumberWithCommas(3000); // '3,000'
formatNumberWithCommas(-123123123); // '-123,123,123'
formatNumberWithCommas(123456.12345); // '123,456.12345'

// 숫자로 이뤄진 문자열
formatNumberWithCommas('200'); // '200'
formatNumberWithCommas('3000'); // '3,000'
formatNumberWithCommas('-123123123'); // '-123,123,123'
formatNumberWithCommas('123456.12345'); // '123,456.12345'

// 일반적인 문자열
formatNumberWithCommas('1433만 4567'); // '1,433만 4,567'
formatNumberWithCommas('1433만 4567.12345'); // '1,433만 4,567.12345'
formatNumberWithCommas('1234ddd'); // '1,234ddd'
```
