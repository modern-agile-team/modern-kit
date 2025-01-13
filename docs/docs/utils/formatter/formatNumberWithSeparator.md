# formatNumberWithSeparator

주어진 `숫자` 또는 `문자열`에 포함된 숫자를 천 단위로 `separator`를 추가한 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithSeparator/index.ts)

## Interface
```ts title="typescript"
function formatNumberWithSeparator(
  value: number | string,
  separator: string = ','
): string;
```

## Usage
### 기본 사용
```ts title="typescript"
import { formatNumberWithSeparator } from '@modern-kit/utils';

// 숫자
formatNumberWithSeparator(200); // '200'
formatNumberWithSeparator(3000); // '3,000'
formatNumberWithSeparator(-123123123); // '-123,123,123'
formatNumberWithSeparator(123456.12345); // '123,456.12345'

// 숫자로 이뤄진 문자열
formatNumberWithSeparator('200'); // '200'
formatNumberWithSeparator('3000'); // '3,000'
formatNumberWithSeparator('-123123123'); // '-123,123,123'
formatNumberWithSeparator('123456.12345'); // '123,456.12345'

// 일반적인 문자열
formatNumberWithSeparator('1433만 4567'); // '1,433만 4,567'
formatNumberWithSeparator('1433만 4567.12345'); // '1,433만 4,567.12345'
formatNumberWithSeparator('1234ddd'); // '1,234ddd'
```

### separator 변경
```ts title="typescript"
import { formatNumberWithSeparator } from '@modern-kit/utils';

formatNumberWithSeparator('1234567', ' ') // '1 234 567'
formatNumberWithSeparator('1234567', '-') // '1-234-567'
```
