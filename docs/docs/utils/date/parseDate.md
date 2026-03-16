# parseDate

날짜 문자열, Date 객체, 숫자를 Date 객체로 파싱합니다.

날짜 문자열의 경우 `Safari`에서 호환되지 않는 날짜 형식(`"-"` 또는 `"."`을 포함한 형식)을 호환시키기 위해 `"-"`, `"."`을 `"/"`로 변환 후 Date 객체로 파싱합니다.
- `YYYY-MM-DD` 형식의 날짜 문자열을 `YYYY/MM/DD` 형식으로 변환합니다.
- `YYYY.MM.DD` 형식의 날짜 문자열을 `YYYY/MM/DD` 형식으로 변환합니다.
- 그 외 날짜 문자열 형식은 그대로 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/parseDate/index.ts)

<br />

## Interface
```ts title="typescript"
const parseDate: (date: string | Date | number) => Date
```

<br />

## Usage

### 유효한 날짜 형식

```ts title="typescript"
import { parseDate } from '@modern-kit/utils';

// 날짜 문자열
parseDate('2025-01-01'); // new Date('2025/01/01') 반환
parseDate('2025.01.01'); // new Date('2025/01/01') 반환

parseDate('2025-01-01 09:00:00'); // new Date('2025/01/01 09:00:00') 반환
parseDate('2025.01.01 18:00:00'); // new Date('2025/01/01 18:00:00') 반환

// 날짜 문자열이지만 YYYY/MM/DD, YYYY.MM.DD 형식이 아닌 경우
parseDate('2025/01/01'); // 문자열 변환 없이 new Date('2025/01/01') 반환
parseDate('01/01/2025'); // 문자열 변환 없이 new Date('01/01/2025') 반환

// Date 객체
parseDate(new Date('2025-01-01')); // new Date('2025/01/01') 반환

// 숫자
parseDate(1714233600000); // new Date(1714233600000) 반환
```

<br />

### 유효하지 않은 날짜 형식

```ts title="typescript"
parseDate('invalid date'); // 에러 발생
parseDate('2025a01a02'); // 에러 발생
```