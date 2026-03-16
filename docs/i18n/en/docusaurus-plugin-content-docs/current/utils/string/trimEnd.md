# trimEnd

A function that returns a string with `trailing whitespace` or `specified characters` removed from the end.

If the chars parameter is not provided, all trailing whitespace is removed. (Works the same as `String.prototype.trimEnd`.)

If chars is a string, it is split into individual characters and removed from the end of the string.
- ex: `'+-*' -> ['+', '-', '*']`

If chars is an array, each string in the array is split into individual characters and removed from the end of the string.
- ex: `['+*', '-'] -> ['+', '*', '-']`

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/trimEnd/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/trimEnd | 5,487,666.27 | 0.0002 | `fastest` |
| lodash/trimEnd | 1,131,381.14 | 0.0009 | `slowest` |

- **modern-kit/trimEnd**
  - `4.85x` faster than lodash/trimEnd

<br />

## Interface
```ts title="typescript"
function trimEnd(str: string): string;

function trimEnd(str: string, chars: string | string[]): string;
```

<br />

## Usage
```ts title="typescript"
import { trimEnd } from '@modern-kit/utils';

// When chars is not provided
const str1 = trimEnd('abc  '); // 'abc'

// When chars is a string
const str2 = trimEnd('abc--', '-'); // 'abc'
const str3 = trimEnd('abc+-*', '+-*'); // 'abc'

// Case where no matching characters are found
const str4 = trimEnd('--abc  ', '+'); // '--abc  '

// When chars is an array
const str5 = trimEnd('abc-_-', ['_', '-']); // 'abc'
const str6 = trimEnd('abc+-*', ['+*', '-']); // 'abc'
```
