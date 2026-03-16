# invariant

주어진 조건이 참인지 확인하고, 거짓일 경우 에러를 발생시키는 런타임 타입 체크 함수입니다.

이 함수는 TypeScript의 타입 좁히기(type narrowing)를 지원합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/invariant/index.ts)

<br />

## Interface
```ts title="typescript"
function invariant(value: boolean, message: string): asserts value;

function invariant<T>(
  value: T | null | undefined,
  message: string
): asserts value is T;
```

<br />

## Usage
### boolean 조건 검사
```ts title="typescript"
import { invariant } from '@modern-kit/utils';

invariant(user.isAdmin, "관리자 권한이 필요합니다");
// 이후 코드에서 user.isAdmin는 true가 보장됩니다.
```

<br />

### null/undefined 타입 좁히기
```ts title="typescript"
import { invariant } from '@modern-kit/utils';

invariant(user, "사용자가 존재하지 않습니다");
// 이후 코드에서 user는 User 타입이 보장됩니다.
```

