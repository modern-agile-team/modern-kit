# formatCurrencyKRW

주어진 `숫자` 또는 `숫자로 이뤄진 문자열`에 기호를 추가한 문자열을 반환하는 함수입니다.

`isSymbol` 옵션을 통해 `통화 기호(₩)`를 추가할 수 있습니다. 설정하지 않을 경우 "원" 문자열이 접미사에 추가됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatCurrencyKRW/index.ts)

## Interface
```ts title="typescript"
function formatCurrencyKRW(
  value: number | string,
  options?: {
    isSymbol?: boolean;
  }
): string;
```

## Usage
```ts title="typescript"
import { formatCurrencyKRW } from '@modern-kit/utils';

// 숫자
formatCurrencyKRW(1234567);
formatCurrencyKRW('1234567');
// '1,234,567원'

formatCurrencyKRW(1234567.89112);
formatCurrencyKRW('1234567.89112');
// '1,234,567.89112원'

formatCurrencyKRW(-1234567);
formatCurrencyKRW('-1234567');
// '-1,234,567원'

// 기호 옵션을 통해 기호(₩)를 추가할 수 있어야 합니다.
formatCurrencyKRW(1234567, { isSymbol: true });
formatCurrencyKRW('1234567', { isSymbol: true });
// '₩1,234,567'
```
