# removeSpecialCharacters

문자열을 입력하면 `특수 문자`를 제거한 문자열을 반환하는 함수입니다.

<br />

## Interface
```tsx
const removeSpecialCharacters: (value: string) => string
```

## Usage
```ts
import { removeSpecialCharacters } from '@modern-kit/utils';

const str = removeSpecialCharacters('H@#!ello, @Wo!@!&@rld!'); // Hello World
```