# invert

객체의 `key`와 `value`를 뒤집는 함수입니다.

필요 시 2번째 인자로 함수(`keyTransformer`)를 넘겨 key를 직접 핸들링 할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/invert/index.ts)

## Interface
```ts title="typescript"
const invert: <
  K extends PropertyKey,
  V,
  TK extends PropertyKey = V extends PropertyKey ? V : PropertyKey
>(
  obj: Record<K, V>,
  keyTransformer?: (value: V) => TK
) => Record<K, V>;
```

## Usage
### Default
```ts title="typescript"
import { invert } from '@modern-kit/utils';

const obj = { a: 1, b: 2, c: 3 };

invert(obj);
// value: { 1: 'a', 2: 'b', 3: 'c' };
// type: Record<number, "a" | "b" | "c">
```

### KeyTransformer
```ts title="typescript"
import { invert } from '@modern-kit/utils';

const obj = { a: [1, 2, 3], b: [4, 5, 6] };

invert(obj, (value) => {
  return JSON.stringify(value);
}); 
// value: { '[1,2,3]': 'a', '[4,5,6]': 'b' }
// type: Record<string, "a" | "b">
```

### const assertion
```ts title="typescript"
import { invert } from '@modern-kit/utils';

const obj = {
  a: { name: 'foo' },
  b: { name: 'bar' },
} as const;

invert(obj, (value) => value.name);
// value: { foo: 'a', bar: 'b' }
// type: Record<"foo" | "bar", "a" | "b">
```