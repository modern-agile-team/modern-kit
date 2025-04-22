# formatValueWithSymbol

주어진 `숫자 또는 문자열`에 주어진 `기호`를 추가하고, 기호의 위치를 지정합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatValueWithSymbol/index.ts)

## Interface
```ts title="typescript"
interface FormatValueWithSymbolOptions {
  symbol?: string;
  position?: 'prefix' | 'suffix';
  space?: boolean;
}
```
```ts title="typescript"
function formatValueWithSymbol(value: number | string, options: FormatValueWithSymbolOptions): string
```

## Usage
```ts title="typescript"
import { formatValueWithSymbol } from '@modern-kit/utils';

formatValueWithSymbol(1234567, { symbol: '원', position: 'suffix' });
// '1234567원'

formatValueWithSymbol(1234567, { symbol: '$', position: 'prefix' });
// '$1234567'

formatValueWithSymbol(1234567, { symbol: '*', position: 'both' });
// '*1234567*'
```
