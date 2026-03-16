# parseJSON

For types other than strings, the value is returned as-is. For strings, if it is a valid `JSON Format`, the string is converted using `JSON.parse` and the resulting value is returned. If it is not a valid `JSON Format`, an error is thrown.

In TypeScript, `JSON.parse` only accepts strings as arguments. This function allows it to be applied in a wider variety of cases.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/parseJSON/index.ts)

<br />

## Interface
```ts title="typescript"
export function parseJSON<T = unknown>(value: string): T;

export function parseJSON<T>(value: T): T;
```

<br />

## Usage
### Parsing a String Value
When the value type is `string`, a precise `generic (T)` type must be provided to get an accurate return type.
If no `generic (T)` type is provided, `unknown` is used as the return type, since `JSON.parse` can produce any type.

```ts title="typescript"
import { parseJSON } from '@modern-kit/utils';

type NormalObject = { a: 1, b: 2 }

const number1 = parseJSON("123");
// value: 123
// type: unknown

const number2 = parseJSON<number>("123");
// value: 123
// type: number

const str = parseJSON<string>('"123"');
// value: "123"
// type: string

const normalObject = parseJSON<NormalObject>(`{ "a": 1, "b": 2 }`);
// value: { a: 1, b: 2 }
// type: NormalObject
```

<br />

### Handling Non-String Types
When the value type is not `string`, the value is returned as-is, so the return type matches the value's type even without specifying a `generic (T)` type.

```ts title="typescript"
import { parseJSON } from '@modern-kit/utils';

type NormalObject = { a: 1, b: 2 }

const number = parseJSON(123);
// value: 123
// type: number

const normalObject = parseJSON({ a: 1, b: 1});
// value: { a: 1, b: 1 }
// type: { a: number; b: number }

const str = parseJSON<number>([1, 2, 3]);
// TypeError: Argument of type 'number[]' is not assignable to parameter of type 'number'.
```
