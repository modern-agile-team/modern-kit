# formatNumberWithCommas

`문자열` 또는 `숫자`를 입력하면 숫자를 천 단위로 `(,)comma`를 추가한 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithCommas/index.ts)

## Interface
```ts title="typescript"
const formatNumberWithCommas: (value: string | number) => string
```

## Usage
```ts title="typescript"
import { formatNumberWithCommas } from '@modern-kit/utils';

const numberWithComma1 = formatNumberWithCommas(200); // '200'
const numberWithComma2 = formatNumberWithCommas(3000); // '3,000'
const numberWithComma3 = formatNumberWithCommas('50000'); // '50,000'
const numberWithComma4 = formatNumberWithCommas('123123123'); // '123,123,123'
const numberWithComma5 = formatNumberWithCommas('price: 500000'); // 'price: 500,000'
```