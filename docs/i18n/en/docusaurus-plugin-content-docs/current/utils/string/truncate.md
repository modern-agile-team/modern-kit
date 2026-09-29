# truncate

Truncates a string if it exceeds the specified length and appends an omission string at the truncation point.

`length` is the total length of the result string including `omission`, so the return value never exceeds `length`. (However, if `length` is shorter than `omission`, only `omission` is returned.)

<br />

Length is counted in grapheme clusters (units that users perceive as a single character), not code units. As a result, emoji sequences (`'👨‍👩‍👧'`) and combining characters are never split in the middle.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/truncate/index.ts)

<br />

## Interface
```ts title="typescript"
interface TruncateOptions {
  length?: number;
  omission?: string;
  separator?: string | RegExp;
}

function truncate(str: string, options?: TruncateOptions): string;
```

<br />

## Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `str` | `string` | - | The string to truncate. |
| `options.length` | `number` | `30` | The maximum length of the result string, including `omission`. |
| `options.omission` | `string` | `'...'` | The string appended at the truncation point. |
| `options.separator` | `string \| RegExp` | - | Keeps text only up to the last separator before the truncation point, so words are not cut in the middle. |

<br />

## Remarks

:::info Note

- A string passed as `separator` is treated literally, not as a regular expression. (`'.'`, `'('`, etc.)
- The `lastIndex` of a regular expression passed as `separator` is not modified.
- In environments without `Intl.Segmenter`, it falls back to code points. Surrogate pairs remain safe, but ZWJ emoji sequences and combining characters are counted as multiple characters.
:::

<br />

## Usage

### Basic Usage
```ts title="typescript"
import { truncate } from '@modern-kit/utils';

truncate('hi-diddly-ho there, neighborino');
// 'hi-diddly-ho there, neighbo...' (default length: 30)

// length includes omission (21 + 3 = 24)
truncate('hi-diddly-ho there, neighborino', { length: 24 });
// 'hi-diddly-ho there, n...'

// Returns the original string if it is within length
truncate('번개장터', { length: 10 }); // '번개장터'
```

<br />

### omission
```ts title="typescript"
truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' });
// 'hi-diddly-ho there, neig [...]'
```

<br />

### separator
```ts title="typescript"
// With separator, words are not cut in the middle
truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' });
// 'hi-diddly-ho there,...'

truncate('hi-diddly-ho there, neighborino', { length: 24, separator: /,? +/ });
// 'hi-diddly-ho there...'
```

<br />

### Grapheme Clusters
```ts title="typescript"
// Emoji sequences are not split and are counted as a single character
truncate('가족은 👨‍👩‍👧 입니다', { length: 8 }); // '가족은 👨‍👩‍👧...'
truncate('😀😀😀😀😀', { length: 4 }); // '😀...'
```
