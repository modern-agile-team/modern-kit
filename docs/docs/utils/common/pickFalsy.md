# pickFalsy

기본적인 falsy값 중 `원하는 타입의 falsy만을 선택하여 사용할 수 있는 함수를 반환`합니다.

인자를 넣어주지 않더라도 `null, undefined, boolean 에 대해서는 기본적으로 falsy값을 체크`해줍니다.

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