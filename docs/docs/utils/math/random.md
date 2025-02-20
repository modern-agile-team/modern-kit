# random

주어진 범위 내의 정수 난수를 생성합니다.

단일 인자가 전달되면 해당 인자를 최대값으로 간주하며, 최소값은 `0`으로 처리합니다.
두 개의 인자가 전달되면 첫 번째 인자는 최소값, 두 번째 인자는 최대값으로 사용됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/random/index.ts)

## Interface
```ts title="typescript"
export function random(minimum: number, maximum?: number): number;
```

## Usage


### Default

```ts title="typescript"
import { random } from '@modern-kit/utils';

const result = random(10); // 0부터 10 사이의 난수를 반환합니다.
```

```ts title="typescript"
import { random } from '@modern-kit/utils';

const result = random(5, 10); // 5부터 10 사이의 난수를 반환합니다.
```

