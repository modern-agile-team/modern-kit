# flattenObject

중첩된 객체를 경로 문자열을 key 로 가진 한 단계짜리 객체로 평탄화합니다.

- 순수 객체와 배열만 펼치며, 배열은 인덱스를 key 로 사용합니다. (`tags.0`, `tags.1`)
- 빈 객체와 빈 배열은 key 가 사라지지 않도록 값 그대로 유지합니다.
- `Date`, `Map`, `Set`, `File`, 클래스 인스턴스 등 순수 객체가 아닌 값은 펼치지 않고 그대로 유지합니다.
- 객체 자신의 열거 가능한 string key 만 대상이며, 원본 객체를 변경하지 않습니다.
- 순환 참조가 있는 객체는 지원하지 않습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/flattenObject/index.ts)

## Interface
```ts title="typescript"
function flattenObject<T extends Record<PropertyKey, any>>(
  obj: T,
  separator?: string // default: '.'
): Record<string, unknown>;
```

<br />

## Usage
```ts title="typescript"
import { flattenObject } from '@modern-kit/utils';

flattenObject({
  product: { id: 1, category: { name: '의류' } },
  tags: ['a', 'b'],
});
// { 'product.id': 1, 'product.category.name': '의류', 'tags.0': 'a', 'tags.1': 'b' }

// 구분자 지정
flattenObject({ a: { b: 1 } }, '_');
// { a_b: 1 }

// 빈 객체·배열과 순수 객체가 아닌 값은 그대로 유지합니다.
flattenObject({ a: {}, b: [], c: new Date(0) });
// { a: {}, b: [], c: Date(0) }
```
