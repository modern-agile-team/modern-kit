# randomInt

지정된 범위 안에서 `정수형 난수`를 반환합니다.

단일 인자가 전달되면 해당 인자를 최대값으로 간주하며, 최소값은 `0`으로 처리합니다.
두 개의 인자가 전달되면 첫 번째 인자는 최소값, 두 번째 인자는 최대값으로 사용됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/number/randomInt/index.ts)

<br />

## Interface
```ts title="typescript"
// 함수 오버로딩
function randomInt(maximum: number): number;
function randomInt(minimum: number, maximum: number): number;
```

<br />

## Usage
### 기본 사용법
```ts title="typescript"
import { randomInt } from '@modern-kit/utils';

const result = randomInt(10); // 0 이상 10 미만의 정수형 난수를 반환
```

<br />

### 범위 지정
```ts title="typescript"
import { randomInt } from '@modern-kit/utils';

const result = randomInt(5, 10); // 5 이상 10 미만의 정수형 난수를 반환
```
