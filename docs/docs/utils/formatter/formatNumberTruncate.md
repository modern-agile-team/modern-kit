# formatNumberTruncate

주어진 `숫자`를 주어진 `절삭 단위(1을 포함한 10의 제곱수(10/100/1000/...))`로 절삭하여 반환하는 함수입니다.

소수점이 있을 경우 소수점 자리수는 자동으로 절삭됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberTruncate/index.ts)

<br />

## Interface
```ts title="typescript"
type TruncationUnit =
  | 1
  | 10
  | 100
  | 1_000
  | 10_000
  | 100_000
  | 1_000_000
  | 10_000_000
  | 100_000_000
  | 1_000_000_000
  | 10_000_000_000
  | 100_000_000_000
  | 1_000_000_000_000;

function formatNumberTruncate(value: number, truncationUnit: TruncationUnit): number
```

<br />

## Usage
```ts title="typescript"
import { formatNumberTruncate } from '@modern-kit/utils';

formatNumberTruncate(1234567, 1000) // 1234000

formatNumberTruncate(-1234567, 1000) // -1234000

formatNumberTruncate(-1234567.1234, 1000) // -1234000
```
