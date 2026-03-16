# trimStart

A function that returns a string with `leading whitespace` or `specified characters` removed from the start.

If the chars parameter is not provided, all leading whitespace is removed. (Works the same as `String.prototype.trimStart`.)

If chars is a string, it is split into individual characters and removed from the start of the string.
- ex: `'+-*' -> ['+', '-', '*']`

If chars is an array, each string in the array is split into individual characters and removed from the start of the string.
- ex: `['+*', '-'] -> ['+', '*', '-']`

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/trimStart/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/trimStart | 5,821,607.44 | 0.0001 | `fastest` |
| lodash/trimStart | 765,539.13 | 0.0012 | `slowest` |

- **modern-kit/trimStart**
  - `7.60x` faster than lodash/trimStart

<br />

## Interface
```ts title="typescript"
function trimStart(str: string): string;

function trimStart(str: string, chars: string | string[]): string;
```

<br />

## Usage
```ts title="typescript"
import { trimStart } from '@modern-kit/utils';

// When chars is not provided
const str1 = trimStart('  abc'); // 'abc'

// When chars is a string
const str2 = trimStart('--abc', '-'); // 'abc'
const str3 = trimStart('+-*abc', '+-*'); // 'abc'

// Case where no matching characters are found
const str4 = trimStart('--abc', '+'); // '--abc'

// When chars is an array
const str5 = trimStart('-_-abc', ['_', '-']); // 'abc'
const str6 = trimStart('+-*abc', ['+*', '-']); // 'abc'
```
