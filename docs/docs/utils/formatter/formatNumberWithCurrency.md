# formatNumberWithCurrency

`숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 `통화 기호`를 추가하는 함수입니다.

기본 옵션으로 직접 원하는 형태로 숫자에 통화 기호를 추가해 포맷팅할 수 있습니다.
- 기본 옵션: `symbol`, `position`, `space`, `commas`

`locale` 옵션이 있으면 `locale` 형식에 따라 포맷팅됩니다. 
- `locale` 옵션을 제외한 나머지 옵션들은 무시됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithCurrency/index.ts)

## Interface
```ts title="typescript"
interface FormatNumberCurrencyOptions {
  symbol?: string; // default: ''
  position?: 'prefix' | 'suffix'; // default: 'suffix'
  space?: boolean; // default: false
  commas?: boolean; // default: true
  locale?: Locale;
}
```
```ts title="typescript"
// 옵션 없이 사용
function formatNumberWithCurrency(value: number | string): string;

// locale 옵션을 제외한, 기본 옵션이 주어지면 주어진 옵션에 따라 포맷팅됩니다.
// (기본 옵션: `symbol`, `position`, `space`, `commas`)
function formatNumberWithCurrency(
  value: number | string,
  options: Omit<FormatNumberCurrencyOptions, 'locale'>
): string;

// locale 옵션이 있으면 locale 형식에 따라 포맷팅됩니다.
function formatNumberWithCurrency(
  value: number | string,
  options: { locale: Locale }
): string;
```

## Usage
### 기본 동작
```ts title="typescript"
import { formatNumberWithCurrency } from '@modern-kit/utils';

// 기본 동작
formatNumberWithCurrency(1000) // '1,000'
formatNumberWithCurrency(-1000) // '-1,000'
formatNumberWithCurrency(1000.123) // '1,000.123'

// 숫자로 이루어진 문자열도 허용
formatNumberWithCurrency('1000') // '1,000'
formatNumberWithCurrency('-1000') // '-1,000'
formatNumberWithCurrency('1000.123') // '1,000.123'
```

<br />

### 옵션 사용
- 기본 옵션 사용(`symbol`, `position`, `space`, `commas`)
```ts title="typescript"
import { formatNumberWithCurrency } from '@modern-kit/utils';

// 통화 기호 추가 (기본 값: '')
formatNumberWithCurrency(1000, { symbol: '원' }) // '1,000원'

// 통호 기호 위치 변경 (기본값: 'suffix')
formatNumberWithCurrency(1000, { symbol: '$', position: 'prefix' }) // '$1,000'

// 공백 추가 (기본값: false)
formatNumberWithCurrency(1000, { symbol: '$', position: 'prefix', space: false }) // '$1000'
formatNumberWithCurrency(1000, { symbol: '$', position: 'prefix', space: true }) // '$ 1000'

// 천의 단위 구분 여부 (기본값: true)
formatNumberWithCurrency(1000, { symbol: '원', commas: false }) // '1000원'
formatNumberWithCurrency(1000, { symbol: '원', commas: true }) // '1,000원'
```

<br />

### 옵션 사용2
- `locale` 옵션 사용
```ts title="typescript"
import { formatNumberWithCurrency } from '@modern-kit/utils';

// locale 옵션이 있으면 locale 형식에 따라 포맷팅됩니다.
formatNumberWithCurrency(1000, { locale: 'en-US' }) // '$1,000'
formatNumberWithCurrency(1000, { locale: 'ko-KR-UNIT' }) // '1,000원'
formatNumberWithCurrency(1000, { locale: 'ko-KR' }) // '₩1,000'
formatNumberWithCurrency(1000, { locale: 'ja-JP' }) // '￥1,000'
formatNumberWithCurrency(1000, { locale: 'zh-CN' }) // '¥1,000'
formatNumberWithCurrency(1000, { locale: 'zh-HK' }) // 'HK$1,000'
formatNumberWithCurrency(1000, { locale: 'en-GB' }) // '£1,000'

// 음수 처리
formatNumberWithCurrency(-1000, { locale: 'ko-KR' }) // '-₩1,000'

// 소숫점 처리
formatNumberWithCurrency(1000.234, { locale: 'en-US' }) // '$1,000.234'
```
