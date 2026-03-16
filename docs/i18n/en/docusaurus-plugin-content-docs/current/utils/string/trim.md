# trim

Removes `whitespace` or `specified characters` from the start and end of a string.

If the chars parameter is not provided, all leading and trailing whitespace is removed. (Works the same as `String.prototype.trim`.)

If chars is a string, it is split into individual characters and removed from both the start and end of the string.
- ex: `'+-*' -> ['+', '-', '*']`

If chars is an array, each string in the array is split into individual characters and removed from both the start and end of the string.
- ex: `['+*', '-'] -> ['+', '*', '-']`

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/trim/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/trim | 2,818,939.18 | 0.0011 | `fastest` |
| lodash/trim | 705,372.87 | 0.0012 | `slowest` |

- **modern-kit/trim**
  - `4.00x` faster than lodash/trim

<br />

## Interface
```ts title="typescript"
function trim(str: string): string;

function trim(str: string, chars: string | string[]): string;
```

<br />

## Usage
```ts title="typescript"
import { trim } from '@modern-kit/utils';

// When chars is not provided
const str1 = trim('  abc  '); // 'abc'

// When chars is a string
const str2 = trim('--abc--', '-'); // 'abc'
const str3 = trim('+-*abc', '+-*'); // 'abc'

// Case where no matching characters are found
const str4 = trim('--abc--', '+'); // '--abc--'

// When chars is an array
const str5 = trim('-_-abc-_-', ['_', '-']); // 'abc'
const str6 = trim('+-*abc+-*', ['+*', '-']); // 'abc'
```
