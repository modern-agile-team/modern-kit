# formatSizeStyleValue

`css` 스타일 값으로 사용할 수 있는 값을 반환합니다.

`value`가 `string` 타입인 경우 그대로 반환합니다.

`value`가 `number` 타입인 `default`로 `px`를 `suffix`로 사용합니다.

`suffix`값이 있다면 해당 값에 접미사를 붙입니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/style/formatSizeStyleValue/index.ts)

## Interface
```ts title="typescript"
const SUFFIX_UNITS = [
  'cm',
  'mm',
  'Q',
  'in',
  'pc',
  'pt',
  'px',
  'em',
  'ex',
  'ch',
  'rem',
  'vw',
  'vh',
  'vmin',
  'vmax',
  '%',
] as const;

type SuffixUnit = (typeof SUFFIX_UNITS)[number];

function formatSizeStyleValue(
  value: string | number,
  suffix?: SuffixUnit
): string
```

## Usage
```ts title="typescript"
import { formatSizeStyleValue } from '@modern-kit/utils';

formatSizeStyleValue('10px');    // '10px'
formatSizeStyleValue(10);        // '10px'
formatSizeStyleValue(10, '%');   // '10%'
```
