# formatNumberWithCommas

`문자열` 또는 `숫자`를 입력하면 숫자를 천 단위로 `(,)comma`를 추가한 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithCommas/index.ts)

## Interface
```ts title="typescript"
interface FormatNumberWithCommasOptions {
  maximumDecimalDigits?: Intl.NumberFormatOptions['maximumFractionDigits'];
  minimumDecimalDigits?: Intl.NumberFormatOptions['minimumFractionDigits'];
}
```
```ts title="typescript"
function formatNumberWithCommas(
  value: number | string,
  options?: FormatNumberWithCommasOptions
): string;
```

## Usage
```ts title="typescript"
import { formatNumberWithCommas } from '@modern-kit/utils';

formatNumberWithCommas(200); // '200'
formatNumberWithCommas(3000); // '3,000'
formatNumberWithCommas(-123123123); // '-123,123,123'
formatNumberWithCommas(123456.123); // '123,456.123'

formatNumberWithCommas('200'); // '200'
formatNumberWithCommas('3000'); // '3,000'
formatNumberWithCommas('-123123123'); // '-123,123,123'
formatNumberWithCommas('123456.123'); // '123,456.123'
```