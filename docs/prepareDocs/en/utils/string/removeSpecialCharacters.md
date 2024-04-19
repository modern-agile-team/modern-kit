# removeSpecialCharacters

A function that takes a string and returns a string stripped of `special characters`.

<br />

## Interface
```tsx
const removeSpecialCharacters: (value: string) => string
```

## Usage
```ts
import { removeSpecialCharacters } from '@devgrace/utils';

const str = removeSpecialCharacters('H@#!ello, @Wo!@!&@rld!'); // Hello World
```