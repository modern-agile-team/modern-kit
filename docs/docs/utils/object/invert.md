# invert

객체의 `key`와 `value`를 뒤집는 함수입니다.

필요 시 2번째 인자로 함수(`keyTransformer`)를 넘겨 key를 직접 핸들링 할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/invert/index.ts)

## Interface
```ts title="typescript"
const invert: (
  obj: Record<PropertyKey, any>,
  keyTransformer?: (value: any) => PropertyKey
) => Record<PropertyKey, any>;
```

## Usage
### Default
```ts title="typescript"
import { invert } from '@modern-kit/utils';

const obj = { a: 1, b: 2, c: 3 };

invert(obj); // { 1: 'a', 2: 'b', 3: 'c' };
```

### KeyTransformer
```ts title="typescript"
import { invert } from '@modern-kit/utils';

const obj = { a: [1, 2, 3], b: [4, 5, 6] };

invert(obj, (value) => {
  return JSON.stringify(value);
}); // { '[1,2,3]': 'a', '[4,5,6]': 'b' }
```