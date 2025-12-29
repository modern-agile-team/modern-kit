# truncate

주어진 문자열을 지정된 길이로 줄이고, 필요하면 생략 부호(omission)를 추가하여 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/truncate/index.ts)

## Interface
```ts title="typescript"
interface Options = {
  length?: number;
  omission?: string;
  separator?: RegExp | string;
}

function truncate(string: string, options?: Options): string
```

## Usage
```ts title="typescript"
import { truncate } from '@modern-kit/utils';

const str1 = truncate('hi-diddly-ho there, neighborino');
// 'hi-diddly-ho there, neighbo...'

const str2 = truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: ' ',
});
// 'hi-diddly-ho there,...'

const str3 = truncate('hi-diddly-ho there, neighborino', {
  omission: ' [...]',
  length: 24,
  separator: /, +/,
});
// 'hi-diddly-ho [...]'
```