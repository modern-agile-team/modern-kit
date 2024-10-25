# merge

기준이 되는 target 객체와 source 객체의 프로퍼티를 병합하는 유틸 함수입니다.

Key가 동일할 때 값이 원시 타입의 경우 source의 값으로 덮어씌워지며, 배열인 경우 target과 source 요소를 모두 갖는 배열을 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/merge/index.ts)

## Interface
```ts title="typescript"
function merge<
  T extends Record<PropertyKey, any>,
  S extends Record<PropertyKey, any>
>(target: T, source: S): T & S;
```

## Usage
### Default
```ts title="typescript"
import { merge } from '@modern-kit/utils';


const target1 = { a: { x: 1, y: 2 }, b: 2 };
const source1 = { a: { y: 3, z: 4 }, c: 5 };
merge(target1, source1); // { a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 }

const target2 = { a: [1, { name: 'modern' }] };
const source2 = { a: [3, { address: 'seoul' }] };
merge(target2, source2); // { a: [3, { name: 'modern', address: 'seoul' }] }
```