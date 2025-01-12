# formatNumberWithCurrency

`숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 `통화 기호`를 추가하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithCurrency/index.ts)

## Interface
```ts title="typescript"
type Locale = 'KRW' | 'KRW_SYMBOL' | 'USD' | 'JPY' | 'CNY' | 'EUR';

interface CurrencyOptions {
  symbol?: string; // default: ''
  position?: 'prefix' | 'suffix'; // default: 'suffix'
  space?: boolean; // default: false
  commas?: boolean; // default: true
  locale?: Locale;
}
```
```ts title="typescript"
function formatNumberWithCurrency(
  value: number | string,
  options?: CurrencyOptions
): string;
```

## Usage
### 기본 동작
```ts title="typescript"
import { formatNumberWithCurrency } from '@modern-kit/utils';

// 기본 동작
formatNumberWithCurrency(1000) // '1,000'

// 통화 기호 추가 (기본 값: '')
formatNumberWithCurrency(1000, { symbol: '원' }) // '1,000원'
formatNumberWithCurrency(1000, { symbol: '$', position: 'prefix' }) // '$1,000'

// 숫자로 이루어진 문자열도 허용
formatNumberWithCurrency('1000', { symbol: '원' }) // '1,000원'
formatNumberWithCurrency('1000', { symbol: '$', position: 'prefix' }) // '$1,000'

// 음수 처리
formatNumberWithCurrency(-1000, { symbol: '$', position: 'prefix' }) // '-$1,000'
formatNumberWithCurrency(-1000, { symbol: '원', position: 'suffix' }) // '-1,000원'
```

<br />

### 옵션 사용
```ts title="typescript"
import { formatNumberWithCurrency } from '@modern-kit/utils';

// 통호 기호 위치 변경 (기본값: 'suffix')
formatNumberWithCurrency(1000, { symbol: '$', position: 'prefix' }) // '$1,000'

// 공백 추가 (기본값: false)
formatNumberWithCurrency(1000, { symbol: '$', position: 'prefix', space: false }) // '$1000'
formatNumberWithCurrency(1000, { symbol: '$', position: 'prefix', space: true }) // '$ 1000'

// 천의 단위 구분 여부 (기본값: true)
formatNumberWithCurrency(1000, { symbol: '원', commas: false }) // '1000원'
formatNumberWithCurrency(1000, { symbol: '원', commas: true }) // '1,000원'

// locale 사용 
// locale 옵션이 있으면 commas 옵션을 제외한 나머지 옵션들은 무시됩니다.
formatNumberWithCurrency(1000, { locale: 'USD' }) // '$1,000'
formatNumberWithCurrency(1000, { locale: 'KRW' }) // '1,000원'
formatNumberWithCurrency(1000, { locale: 'KRW_SYMBOL' }) // '1,000₩'
formatNumberWithCurrency(1000, { locale: 'JPY' }) // '¥1,000'
formatNumberWithCurrency(1000, { locale: 'CNY' }) // '¥1,000'
formatNumberWithCurrency(1000, { locale: 'EUR' }) // '€1,000'
```
