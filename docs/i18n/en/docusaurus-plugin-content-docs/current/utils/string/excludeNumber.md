# excludeNumber

A function that excludes only numbers from a string.

It removes all numbers from the input string and returns the remaining characters as they are. It works as the exact opposite of `extractNumber`, which keeps only numbers.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/excludeNumber/index.ts)

<br />

## Interface
```ts title="typescript"
function excludeNumber(value: string): string
```

<br />

## Usage
```ts title="typescript"
import { excludeNumber } from '@modern-kit/utils';

excludeNumber('Hello123 World456'); // 'Hello World'
excludeNumber('전화번호: 010-1234-5678'); // '전화번호: --'
```
