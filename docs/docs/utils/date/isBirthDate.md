# isBirthDate

입력된 생년월일 문자열이 `6자리` 또는 `8자리`의 올바른 형식인지, 그리고 해당 날짜가 실제로 존재하는 날짜인지 (월, 일 범위 및 윤년 고려) 검사합니다.

입력값은 아래와 같은 형식을 허용합니다:

- **구분자 포함:** `"YYYYMMDD"`, `"YYMMDD"`
- **구분자가 미 포함:** `"YY-MM-DD"`, `"YYYY-MM-DD"`, `"YY.MM.DD"`, `"YYYY.MM.DD"`, `"YY/MM/DD"`, `"YYYY/MM/DD"`

구분자로는 하이픈(`-`), 점(`.`) 또는 슬래시(`/`)만 사용할 수 있으며, 올바르지 않은 형식의 입력이나 존재하지 않는 날짜(예: 2월 30일)는 `false`를 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isBirthDate/index.ts)

## Function Signature
```ts title="typescript"
function isBirthDate(birthDate: string): boolean;
```

## Usage
### Without Separator
```ts title="typescript"
import { isBirthDate } from '@modern-kit/utils';

isBirthDate("950913");    // true
isBirthDate("19950913");  // true
```

### With Separator
```ts title="typescript"
import { isBirthDate } from '@modern-kit/utils';

isBirthDate("95-09-13");   // true
isBirthDate("1995-09-13");  // true

isBirthDate("95.09.13");   // true
isBirthDate("1995.09.13");  // true

isBirthDate("95/09/13");   // true
isBirthDate("1995/09/13");  // true
```

### Invalid Inputs
```ts title="typescript"
import { isBirthDate } from '@modern-kit/utils';

isBirthDate("1995&09&13"); // false, '&' 구분자는 허용되지 않음
isBirthDate("199-509-13");  // false, 구분자가 올바른 위치에 있지 않음
isBirthDate("1995-9-13");   // false, 월 또는 일이 2자리여야 함
isBirthDate("19950230");    // false, 존재하지 않는 날짜 (예: 2월 30일)
```

### Additional Examples
```ts title="typescript"
import { isBirthDate } from '@modern-kit/utils';

// 빈 문자열 또는 숫자 자릿수가 올바르지 않은 경우
isBirthDate("");          // false
isBirthDate("1234567");   // false (7자리)
isBirthDate("123456789"); // false (9자리)

// 윤년 검사
isBirthDate("20000229"); // true, 2000년은 윤년
isBirthDate("19000229"); // false, 1900년은 윤년이 아님

// 월 또는 일이 "00"인 경우
isBirthDate("19950013"); // false, month 00
isBirthDate("19950900"); // false, day 00

// 앞뒤 공백이 포함된 경우 (공백을 trim하지 않으므로)
isBirthDate(" 19950913"); // false
isBirthDate("19950913 "); // false
```