# isPlainObject

주어진 인자가 `Plain Object(일반 객체)` 인지 검사하는 함수입니다. 

Plain Object란, 기본적으로 `객체 리터럴({})` 혹은 `new Object()`로 생성된 객체를 말합니다.

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




