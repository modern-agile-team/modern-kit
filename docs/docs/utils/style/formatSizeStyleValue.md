# formatSizeStyleValue

`css` 스타일 값으로 사용할 수 있도록 `<value>[suffix]` 형태로 변환해주는 유틸 합수입니다.

`suffix`옵션을 통해서 해당 값에 접미사를 붙여 반환할 수 있습니다. 해당 옵션이 없다면 `default`로 `px`을 접미사로 사용합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/style/formatSizeStyleValue/index.ts)

## Interface
```ts title="typescript"
type SuffixUnit =
  | 'cm'
  | 'mm'
  | 'Q'
  | 'in'
  | 'pc'
  | 'pt'
  | 'px'
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | 'lh'
  | 'rlh'
  | '%';

function formatSizeStyleValue(
  value: number,
  suffix?: SuffixUnit
): string
```

## Usage
```ts title="typescript"
import { formatSizeStyleValue } from '@modern-kit/utils';

formatSizeStyleValue(10);        // '10px'
formatSizeStyleValue(10, '%');   // '10%'
```
