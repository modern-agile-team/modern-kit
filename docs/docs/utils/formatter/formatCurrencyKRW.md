# formatCurrencyKRW

주어진 `숫자` 또는 `숫자로 이뤄진 문자열`에 기호를 추가한 문자열을 반환하는 함수입니다.

- "원"이 아닌 통화 기호(₩)로 표기할 경우 `isSymbol` 옵션을 `true`로 설정할 수 있습니다. 기본값은 `false`입니다.
- 허용 할 소수점 자리수(`decimal`)를 선택할 수 있습니다. 기본값은 `0`입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatCurrencyKRW/index.ts)

<br />

## Interface
```ts title="typescript"
function formatCurrencyKRW(
  value: number | string,
  options?: {
    isSymbol?: boolean;
    decimal?: number;
  }
): string;
```

<br />

## Usage
### 기본 사용법
```ts title="typescript"
import { formatCurrencyKRW } from '@modern-kit/utils';

formatCurrencyKRW(1234567);
formatCurrencyKRW('1234567');
// '1,234,567원'

formatCurrencyKRW(-1234567);
formatCurrencyKRW('-1234567');
// '-1,234,567원'
```

<br />

### 소수점 자리수 지정
```ts title="typescript"
import { formatCurrencyKRW } from '@modern-kit/utils';

formatCurrencyKRW(1234567.1234, { decimal: 2 });
// '1,234,567.12원'

formatCurrencyKRW(-1234567.1234, { decimal: 2 });
// '-1,234,567.12원'
```

<br />

### 통화 기호(₩) 사용
```ts title="typescript"
import { formatCurrencyKRW } from '@modern-kit/utils';

formatCurrencyKRW(1234567, { isSymbol: true });
// '₩1,234,567'

formatCurrencyKRW(-1234567, { isSymbol: true });
// '-₩1,234,567'
```
