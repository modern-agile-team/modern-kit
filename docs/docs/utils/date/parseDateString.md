# parseDateString

날짜 문자열을 파싱하여 구분자를 `슬래시(/)`로 정규화합니다.

`Safari`에서 호환되지 않는 날짜 형식(`"-"`, `"."`을 포함한 형식)을 호환시키기 위해 사용합니다.

`YYYY-MM-DD`, `YYYY-MM-DD HH:MM:SS`, `YYYY.MM.DD`, `YYYY.MM.DD HH:MM:SS` 형식의 날짜 문자열을 처리하며, 그 외 형식은 그대로 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/parseDateString/index.ts)

## Interface
```ts title="typescript"
const parseDateString: (date: string) => Date
```

## Usage
### 유효한 날짜 형식
```ts title="typescript"
import { parseDateString } from '@modern-kit/utils';

// 아래 형식들은 슬래시(/)로 구분된 정규화된 날짜 문자열로 변환합니다.
parseDateString('2025-01-01'); // '2025/01/01'
parseDateString('2025.01.01'); // '2025/01/01'
parseDateString('2025-01-01 09:00:00'); // '2025/01/01 09:00:00'
parseDateString('2025.01.01 18:00:00'); // '2025/01/01 18:00:00'

// 그대로 반환하는 경우
parseDateString('2025/01/01'); // '2025/01/01'
parseDateString('01/01/2025'); // '01/01/2025'
parseDateString('2025-01-01T13:45:00'); // '2025-01-01T13:45:00'
parseDateString('2025-01-01T13:45:00Z'); // '2025-01-01T13:45:00Z'
```