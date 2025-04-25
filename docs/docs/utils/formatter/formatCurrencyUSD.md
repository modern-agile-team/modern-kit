# formatCurrencyUSD

주어진 `숫자` 또는 `숫자로 이뤄진 문자열`에 달러($) 기호를 추가한 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatCurrencyUSD/index.ts)

## Interface
```ts title="typescript"
function formatCurrencyUSD(
  value: number | string,
  options?: {
    decimal?: number;
  }
): string;
```

## Usage
```ts title="typescript"
import { formatCurrencyUSD } from '@modern-kit/utils';

formatCurrencyUSD(1234567);
formatCurrencyUSD('1234567');
// '$1,234,567'

formatCurrencyUSD(-1234567);
formatCurrencyUSD('-1234567');
// '-$1,234,567'

formatCurrencyUSD(1234567.1234, { decimal: 2 });
formatCurrencyUSD('1234567.1234', { decimal: 2 });
// '$1,234,567.12'
```
