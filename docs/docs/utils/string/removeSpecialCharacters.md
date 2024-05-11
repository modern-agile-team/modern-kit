# removeSpecialCharacters

문자열을 입력하면 `특수 문자`를 제거한 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/removeSpecialCharacters/index.ts)

## Interface
```ts title="typescript"
const removeSpecialCharacters: (value: string) => string
```

## Usage
```ts title="typescript"
import { removeSpecialCharacters } from '@modern-kit/utils';

const str = removeSpecialCharacters('H@#!ello, @Wo!@!&@rld!'); // Hello World
```