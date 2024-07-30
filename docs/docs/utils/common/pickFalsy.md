# pickFalsy

선택한 타입에 대한 falsy 체크 함수를 반환합니다.

필요하다면 `숫자 0`, `빈 문자열("")`, `빈 객체({})`, `빈 배열([])`에 대해 판단할 수 있습니다.

인자가 없다면, 기본적으로 `boolean`, `null`, `undefined`에 대해서만 falsy 값 체크를 수행합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/serialize/index.ts)

## Interface
```ts title="typescript"
type PickFalsyProps = 'number' | 'string' | 'array' | 'object'

function pickFalsy(...arr: PickFalsyProps): (value: unknown) => boolean
```

## Usage
```ts title="typescript"
import { pickFalsy } from '@modern-kit/utils';

const isInvalidValue = pickFalsy()

isInvalidValue(null) // true
isInvalidValue(undeinfed) // true
isInvalidValue(false) // true
isInvalidValue('') // false
isInvalidValue(0) // false
isInvalidValue([]) // false
isInvalidValue({}) // false

const isInvalidValue = pickFalsy('string', 'number', 'array', 'object')

isInvalidValue(null) // true
isInvalidValue(undeinfed) // true
isInvalidValue(false) // true
isInvalidValue('') // true
isInvalidValue(0) // true
isInvalidValue([]) // true
isInvalidValue({}) // true
```