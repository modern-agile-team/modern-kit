# formatValueWithSymbol

주어진 `숫자` 또는 `문자열`에 주어진 `기호`를 추가하는 함수입니다.

- 기호는 `prefix` 또는 `suffix` 위치에 추가할 수 있습니다.
- 음수일 경우 기호 앞에 `-`가 추가됩니다.
- 기호와 값 사이에 공백 여부(`space`)를 선택할 수 있습니다.
- 천 단위 구분 기호 (`separator`)를 선택할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatValueWithSymbol/index.ts)

## Interface
```ts title="typescript"
interface FormatValueWithSymbolOptions {
  symbol?: string; // default: ''
  position?: 'prefix' | 'suffix'; // default: 'suffix'
  space?: boolean; // default: false
  separator?: string; // default: ','
}
```
```ts title="typescript"
function formatValueWithSymbol(
  value: number | string,
  options?: FormatValueWithSymbolOptions
): string;
```

## Usage
```ts title="typescript"
import { formatValueWithSymbol } from '@modern-kit/utils';

// 통화 기호 추가 (기본 값: '')
formatValueWithSymbol(1000) // '1,000'
formatValueWithSymbol(1000, { symbol: '원' }) // '1,000원'

// 통호 기호 위치 변경 (기본값: 'suffix')
formatValueWithSymbol(1000, { symbol: '$', position: 'prefix' }) // '$1,000'
formatValueWithSymbol(1000, { symbol: '원', position: 'suffix' }) // '1,000원'

// 공백 추가 (기본값: false)
formatValueWithSymbol(1000, { symbol: '$', position: 'prefix', space: false }) // '$1,000'
formatValueWithSymbol(1000, { symbol: '$', position: 'prefix', space: true }) // '$ 1,000'

// 천 단위 구분 기호 변경 (기본값: `,`)
formatValueWithSymbol(1000, { symbol: '$', position: 'prefix', separator: '' }) // '$1000'
formatValueWithSymbol(1000, { symbol: '$', position: 'prefix', separator: ',' }) // '$1,000'
formatValueWithSymbol(1000, { symbol: '$', position: 'prefix', separator: '-' }) // '$1-000'
```

<br />

### 응용 (with formatNumberWithUnits)
```ts title="typescript"
import { formatValueWithSymbol, formatNumberWithUnits } from '@modern-kit/utils';

const KRW_UNITS = [
  { unit: '조', value: 1_000_000_000_000 },
  { unit: '억', value: 100_000_000 },
  { unit: '만', value: 10_000 },
] as const;

const numberWithKRWUnits = formatNumberWithUnits(12340000, { units: KRW_UNITS }); // 1,234만

formatValueWithSymbol(numberWithKRWUnits, { symbol: '원' }) // '1,234만원'
```
