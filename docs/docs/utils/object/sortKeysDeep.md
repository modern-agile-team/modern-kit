# sortKeysDeep

주어진 객체와 중첩된 모든 순수 객체의 key 를 정렬한 새로운 객체를 반환합니다.

배열 안의 순수 객체도 정렬하며, 배열 요소의 순서는 유지합니다. `Date`, `Map`, `Set`, 클래스 인스턴스 등 순수 객체가 아닌 값은 그대로 유지하며, 원본 객체를 변경하지 않습니다.

`comparator` 는 모든 깊이에 적용되며, 생략하면 `Array.prototype.sort` 기본 순서(UTF-16 코드 유닛)로 정렬합니다.

:::note
JS 객체는 정수 형태의 key(`'1'`, `'10'`)를 항상 오름차순으로 먼저 나열하므로, `comparator` 와 상관없이 정수 key 는 문자열 key 보다 앞에 위치합니다.
:::

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/sortKeysDeep/index.ts)

## Interface
```ts title="typescript"
function sortKeysDeep<T extends Record<PropertyKey, any>>(
  obj: T,
  comparator?: (a: string, b: string) => number
): T;
```

<br />

## Usage
### 기본 사용
```ts title="typescript"
import { sortKeysDeep } from '@modern-kit/utils';

sortKeysDeep({ b: { y: 1, x: 2 }, a: [{ d: 1, c: 2 }] });
// { a: [{ c: 2, d: 1 }], b: { x: 2, y: 1 } }
```

### 안정적인 직렬화
```ts title="typescript"
import { sortKeysDeep } from '@modern-kit/utils';

// key 순서가 달라도 같은 캐시 key 가 됩니다.
const a = { page: 1, filter: { status: 'ON', category: 5 } };
const b = { filter: { category: 5, status: 'ON' }, page: 1 };

JSON.stringify(sortKeysDeep(a)) === JSON.stringify(sortKeysDeep(b)); // true
```
