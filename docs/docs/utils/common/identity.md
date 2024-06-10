# identity

인자로 받은 값을 그대로 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/identity/index.ts)

## Interface
```ts title="typescript"
const identity: <T>(value: T) => T;
```

## Usage
```ts title="typescript"
import { identity } from '@modern-kit/utils';

identity(1); // 1
identity('foo'); // 'foo'
identity([]); // []
```