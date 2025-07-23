# isNumeric

주어진 문자열이 `숫자(0-9)`로만 구성되어 있는지 확인하는 함수입니다.

sign 옵션을 통해 `"-"부호`와 `소수점`을 포함할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNumeric/index.ts)

## Interface
```ts title="typescript"
interface Options {
  sign?: boolean;
}
```
```ts title="typescript"
function isNumeric(value: string, options?: Options): boolean
```

## Usage
```ts title="typescript"
import { isNumeric } from '@modern-kit/utils';

isNumeric("123"); // true
isNumeric("0"); // true

isNumeric("-123"); // false
isNumeric("1a"); // false
isNumeric("1@"); // false
isNumeric("1[]"); // false
isNumeric("12.00"); // false
isNumeric(" "); // false
```
```ts title="typescript"
import { isNumeric } from '@modern-kit/utils';

isNumeric('123.45', { sign: true }); // true
isNumeric('-123.45', { sign: true }); // true

isNumeric('12.3a45', { sign: true }); // false
isNumeric('12-345', { sign: true }); // false, ("-" 기호는 문자열 가장 앞에만 붙일 수 있음)
isNumeric('123.', { sign: true };) // false, (소수점 뒤에 숫자가 없음)
```