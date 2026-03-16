# isMap

주어진 인자가 `Map` 객체인지 검사하는 함수입니다.

타입 체크 및 인자의 타입을 `Map`으로 좁히는 데 유용합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isMap/index.ts)

## Interface
```ts title="typescript"
function isMap(value: unknown): value is Map<any, any>
```

<br />

## Usage
```ts title="typescript"
import { isMap } from '@modern-kit/utils';

isMap(new Map()) // true
isMap(new Map([['hello', 5],['world', 5]])) // true

isMap([]) // false
isMap({}) // false
isMap(new Set()) // false
isMap(new WeakMap()) // false
isMap(new Date()) // false
isMap(null) // false
isMap(undefined) // false
```
