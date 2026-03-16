# pickFalsy

Returns a falsy check function for selected types.

You may not want `numeric 0`, `empty string ("")`, `empty array ([])`, or `empty object ({})` to be considered falsy.
In that case, you can specify which types to treat as falsy using the type argument.

- Specifying `'number'` treats `numeric 0` as falsy.
- Specifying `'string'` treats `empty string ("")` as falsy.
- Specifying `'array'` treats `empty array ([])` as falsy.
- Specifying `'object'` treats `empty object ({})` as falsy.

By default, falsy checks are only performed for `false`, `null`, `undefined`, and `NaN`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/pickFalsy/index.ts)

<br />

## Interface
```ts title="typescript"
type FalsyCheckKey = "string" | "number" | "object" | "array"

function pickFalsy(...falsyCheckList: FalsyCheckKey[]): <T>(value: T) => boolean
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { pickFalsy } from '@modern-kit/utils';

const isInvalidValue = pickFalsy()

isInvalidValue(null) // true
isInvalidValue(undefined) // true
isInvalidValue(false) // true
isInvalidValue(NaN) // true

isInvalidValue('') // false
isInvalidValue(0) // false
isInvalidValue([]) // false
isInvalidValue({}) // false
```

<br />

### Adding Specific Types as Falsy
```ts title="typescript"
import { pickFalsy } from '@modern-kit/utils';

const isInvalidValue = pickFalsy('string')
isInvalidValue('') // true
isInvalidValue('a') // false
```

```ts title="typescript"
const isInvalidValue = pickFalsy('number')
isInvalidValue(0) // true
isInvalidValue(1) // false
```

```ts title="typescript"
const isInvalidValue = pickFalsy('array')
isInvalidValue([]) // true
isInvalidValue([1, 2, 3]) // false
```

```ts title="typescript"
const isInvalidValue = pickFalsy('object')
isInvalidValue({}) // true
isInvalidValue({ a: 1 }) // false
```

<br />

### Adding All Types as Falsy
```ts title="typescript"
import { pickFalsy } from '@modern-kit/utils';

const isInvalidValue = pickFalsy('string', 'number', 'array', 'object')

isInvalidValue(null) // true
isInvalidValue(undefined) // true
isInvalidValue(false) // true
isInvalidValue('') // true
isInvalidValue(0) // true
isInvalidValue([]) // true
isInvalidValue({}) // true
```
