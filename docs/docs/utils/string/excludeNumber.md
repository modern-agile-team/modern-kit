# excludeNumber

문자열에서 숫자만 제외하는 함수입니다.

입력된 문자열에서 숫자를 모두 제거하고, 나머지 문자를 그대로 반환합니다. 숫자만 남기는 `extractNumber` 와 정반대로 동작합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/excludeNumber/index.ts)

<br />

## Interface
```ts title="typescript"
function excludeNumber(value: string): string
```

<br />

## Usage
```ts title="typescript"
import { excludeNumber } from '@modern-kit/utils';

excludeNumber('Hello123 World456'); // 'Hello World'
excludeNumber('전화번호: 010-1234-5678'); // '전화번호: --'
```
