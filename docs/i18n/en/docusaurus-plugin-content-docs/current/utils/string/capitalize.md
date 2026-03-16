# capitalize

A function that converts the first character of a string to uppercase.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/capitalize/index.ts)

<br />

## Interface
```ts title="typescript"
function capitalize<T extends string>(str: T): Capitalize<T>
```

<br />

## Usage
```ts title="typescript"
import { capitalize } from '@modern-kit/utils';

capitalize('hello'); // 'Hello'
capitalize('123'); // '123'
```
