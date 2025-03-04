# isSet

주어진 인자가 `Set` 객체인지 검사하는 함수입니다.

타입 체크 및 인자의 타입을 `Set`으로 좁히는 데 유용합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isSet/index.ts)

## Interface
```ts title="typescript"
const isSet: <T>(value: unknown) => value is Set<T>
import { isSet } from '@modern-kit/utils';

isSet(new Set()) // true
isSet(new Set([1, 2, 3])) // true

isSet([]) // false
isSet({}) // false
isSet(new Map()) // false
isSet(new WeakSet()) // false
isSet(new Date()) // false
isSet(null) // false
isSet(undefined) // false
