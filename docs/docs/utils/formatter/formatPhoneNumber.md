# formatPhoneNumber

`문자열`을 입력하면 `전화 번호 포맷`으로 `-(hyphen)`을 넣어서 반환해주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatPhoneNumber/index.ts)

## Interface
```ts title="typescript"
const formatPhoneNumber: (value: string) => string
```

## Usage
```ts title="typescript"
import { formatPhoneNumber } from '@modern-kit/utils';

const phoneNumber0 = formatPhoneNumber('03112345678'); // '031-1234-5678'
const phoneNumber1 = formatPhoneNumber('01012345678'); // '010-1234-5678'
const phoneNumber2 = formatPhoneNumber('021231234'); // '02-123-1234'
const phoneNumber2 = formatPhoneNumber('(02)12351234'); // '02-1235-1234'
const phoneNumber3 = formatPhoneNumber('12334788'); // '1233-4788'
```

## Note
[대한민국의 전화번호 체계](https://ko.wikipedia.org/wiki/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%EC%9D%98_%EC%A0%84%ED%99%94%EB%B2%88%ED%98%B8_%EC%B2%B4%EA%B3%84)