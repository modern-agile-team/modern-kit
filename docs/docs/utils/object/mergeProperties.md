# mergeProperties

기준이 되는 target 객체와 source 객체의 프로퍼티를 병합하는 유틸 함수입니다.

Key가 동일할 때 값이 원시 타입의 경우 source의 값으로 덮어씌워지며, 배열인 경우 target과 source 요소를 모두 갖는 배열을 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mergeProperties/index.ts)

## Interface
```ts title="typescript"
const mergeProperties: <
  T extends Record<PropertyKey, any>,
  K extends Record<PropertyKey, any>
>(
  target: T,
  source: K
) => T & K;
```

## Usage
```ts title="typescript"
import { mergeProperties } from '@modern-kit/utils';

  const target = {
    a: 1,
    b: 2,
    c: {
      c_a: 1,
      c_b: 2,
    },
    d: 4,
    e: [1, 2],
  };
  const source = {
    c: {
      c_c: 3,
      c_d: 4,
    },
    d: 5,
    e: [3, 4],
  };

  const obj = mergeProperties(target, source);

  /**
   *  obj = {
      a: 1,
      b: 2,
      c: {
        c_a: 1,
        c_b: 2,
        c_c: 3,
        c_d: 4,
      },
      d: 5,
      e: [1, 2, 3, 4],
    };
   */
```