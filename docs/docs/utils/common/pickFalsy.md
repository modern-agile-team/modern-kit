# pickFalsy

선택한 타입에 대한 falsy 체크 함수를 반환합니다.

`숫자 0`, `빈 문자열("")`, `빈 배열([])`, `빈 객체({})`를 falsy로 판단하고 싶지 않을 수 있습니다.
이때, 타입 인자를 설정해서 판단하고자 하는 타입을 지정할 수 있습니다.

- `'number'`를 지정하면 `숫자 0`을 falsy로 판단하지 않습니다.
- `'string'`을 지정하면 `빈 문자열("")`을 falsy로 판단하지 않습니다.
- `'array'`를 지정하면 `빈 배열([])`을 falsy로 판단하지 않습니다.
- `'object'`를 지정하면 `빈 객체({})`을 falsy로 판단하지 않습니다.

기본적으로 `false`, `null`, `undefined`, `NaN`에 대해서만 falsy 체크를 수행합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/serialize/index.ts)

## Interface
```ts title="typescript"
type FalsyCheckKey = "string" | "number" | "object" | "array"

function pickFalsy(...falsyCheckList: FalsyCheckKey[]): <T>(value: T) => boolean
```

## Usage
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
```ts title="typescript"
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
```ts title="typescript"
const isInvalidValue = pickFalsy('string', 'number', 'array', 'object')

isInvalidValue(null) // true
isInvalidValue(undefined) // true
isInvalidValue(false) // true
isInvalidValue('') // true
isInvalidValue(0) // true
isInvalidValue([]) // true
isInvalidValue({}) // true
```