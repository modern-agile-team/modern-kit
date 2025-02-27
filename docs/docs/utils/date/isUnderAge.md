# isUnderAge

주어진 생년월일을 기준으로 특정 나이보다 어린지 확인합니다.

`inclusive` 값을 기준으로 기준 나이를 포함할지 여부를 결정합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isUnderAge/index.ts)

## Interface
```ts title="typescript"
interface IsUnderAgeParams {
  birthDate: string | number | Date;
  targetAge: number;
  inclusive?: boolean;
}
```
```ts title="typescript"
function isUnderAge({
  birthDate,
  targetAge,
  inclusive = false,
}: IsUnderAgeParams): boolean;
```

## Usage
### without inclusive
```ts title="typescript"
import { isUnderAge } from '@modern-kit/utils';

// 현재 날짜 2025년 1월 1일 기준
isUnderAge({ birthDate: new Date('2006-01-02'), targetAge: 19 }); // true
isUnderAge({ birthDate: new Date('2006-01-01'), targetAge: 19 }); // false, 정확히 만 19세
isUnderAge({ birthDate: new Date('2005-12-31'), targetAge: 19 }); // false

isUnderAge({ birthDate: '2006-01-02', targetAge: 19 }); // true
isUnderAge({ birthDate: '2006-01-01', targetAge: 19 }); // false, 정확히 만 19세
isUnderAge({ birthDate: '2005-12-31', targetAge: 19 }); // false
```

### with inclusive
- `inclusive` 값을 기준으로 기준 나이를 포함할지 여부를 결정합니다. (기본값: `false`)
- `inclusive` 값이 `true`일 경우, 기준 나이를 포함하며, `false`일 경우, 기준 나이를 포함하지 않습니다.

```ts title="typescript"
// 2025년 01월 01일 기준
// inclusive 값을 기준으로 기준 나이를 포함할지 여부를 결정합니다.
isUnderAge({ birthDate: '2006-01-01', targetAge: 19, inclusive: true }); // true
isUnderAge({ birthDate: '2006-01-01', targetAge: 19, inclusive: false }); // false
```