# formatValueWithSymbol

주어진 `숫자 또는 문자열`에 주어진 `기호`를 추가하고, 기호의 위치를 지정합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatValueWithSymbol/index.ts)

<br />

## Interface
```ts title="typescript"
function formatValueWithSymbol(value: number | string, options: {
  prefix?: string;
  suffix?: string;
}): string
```

<br />

## Usage
```ts title="typescript"
import { formatValueWithSymbol } from '@modern-kit/utils';

formatValueWithSymbol(1234567, { suffix: '원' });
// '1234567원'

formatValueWithSymbol(1234567, { prefix: '$' });
// '$1234567'

formatValueWithSymbol(1234567, { prefix: '*', suffix: '@' });
// '*1234567@'
```
