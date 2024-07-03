# isPlainObject

주어진 인자가 객체인지 검사하고, 맞다면 객체 리터럴 `({})` 또는 `new Object()`로 생성된 것을 객체로 간주하는 함수입니다.

<br />

## Code 

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isPlainObject/index.ts)

## Interface 
```ts title="typescript"
export const isPlainObject: (value: unknown) => value is object;
```

## Usage
```ts title="typescript"
import { isPlainObject } from '@modern-kit/utils';

isPlainObject({}) // true 
isPlainObject(new Object()) // true 

isPlainObject(function() {}) // false 
isPlainObject(() => {})  // false 
isPlainObject([]) // false 
isPlainObject(new Set()) // false 
isPlainObject(new Map()) // false 
isPlainObject(null) // false 
isPlainObject(undefined) // false 
```




