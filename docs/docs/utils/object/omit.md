# omit

첫 번째 인자로 넣은 `객체`를 기준으로 두 번째 인자로 넣은 `keys` 요소에 대응하는 프로퍼티를 생략한 객체를 반환하는 함수입니다.

반환된 객체는 `깊은 복사된 새로운 객체`입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/omit/index.ts)

## Interface
```ts title="typescript"
const omit: <T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: K[]
) => Omit<T, K>;
```

## Usage
```ts title="typescript"
import { omit } from '@modern-kit/utils';

omit({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'd']); // { b: 2, c: 3 }
```