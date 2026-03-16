# removeSpecialCharacters

주어진 문자열에서 `특수 문자를 제거`하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/removeSpecialCharacters/index.ts)

<br />

## Interface
```ts title="typescript"
function removeSpecialCharacters(value: string): string
```

<br />

## Usage
```ts title="typescript"
import { removeSpecialCharacters } from '@modern-kit/utils';

const str = removeSpecialCharacters('H@#!ello, @Wo!@!&@rld!'); // Hello World
```
