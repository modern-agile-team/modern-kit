# getAge

주어진 `생년월일`을 기준으로 `현재 나이`를 계산합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getAge/index.ts)

## Interface
```ts title="typescript"
function getAge(birthDate: string | number | Date): number
```

## Usage

```ts title="typescript"
import { getAge } from '@modern-kit/utils';

// 현재 날짜가 2025년 1월 1일 00:00:00 일 때
getAge(new Date('2006-01-01')); // 19

// 문자열 포맷도 허용합니다.
getAge('2006-01-01'); // 19
```