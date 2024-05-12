# deleteEmptyProperties

객체의 중첩 객체/배열을 포함한 모든 프로퍼티를 순회하면서 값이 아래 나열한 빈 값들 중 하나라면, 해당 프로퍼티들을 제거한 새로운 객체를 반환해주는 유틸 함수입니다.

제거 항목: `빈 문자열("")`, `빈 배열([])`, `빈 객체({})`, `null`, `undefined`

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/deleteFalsyProperties/index.ts)

## Interface
```ts title="typescript"
const deleteFalsyProperties: <
  T extends Record<PropertyKey, any> = Record<PropertyKey, any>
>(
  source: Record<PropertyKey, any>
) => T;
```

## Usage
```ts title="typescript"
import { deleteEmptyProperties } from '@modern-kit/utils';

const obj = deleteEmptyProperties({
  prop1: 1,
  prop2: 0,
  prop3: '',
  prop4: '1',
  prop5: true,
  prop6: false,
  prop7: null,
  prop8: undefined,
  prop9: [],
  prop10: {},
});

/**
 * obj = {
    prop1: 1,
    prop2: 0,
    prop4: '1',
    prop5: true,
    prop6: false,
  };
 */
```