# formatSizeStyleValue

A utility function that converts a value to `<value>[suffix]` format for use as a `css` style value.

The `suffix` option allows you to append a unit suffix to the value. If no option is provided, `px` is used as the default suffix.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/style/formatSizeStyleValue/index.ts)

<br />

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

<br />

## References

- [CSS values and units - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths)
<br />

## Usage
```ts title="typescript"
import { formatSizeStyleValue } from '@modern-kit/utils';

formatSizeStyleValue(10);        // '10px'
formatSizeStyleValue(10, '%');   // '10%'
```
