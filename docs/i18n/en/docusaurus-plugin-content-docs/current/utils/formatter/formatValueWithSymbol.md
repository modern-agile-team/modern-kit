# formatValueWithSymbol

A function that adds a given `symbol` to a given `number or string` and specifies the position of the symbol.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatValueWithSymbol/index.ts)

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
### Basic Usage
```ts title="typescript"
import { formatValueWithSymbol } from '@modern-kit/utils';

formatValueWithSymbol(1234567, { suffix: '원' });
// '1234567원'

formatValueWithSymbol(1234567, { prefix: '$' });
// '$1234567'

formatValueWithSymbol(1234567, { prefix: '*', suffix: '@' });
// '*1234567@'
```
