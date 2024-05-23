# countOccurrencesInArray

입력한 배열에서 배열의 각 요소들이 등장한 횟수를 카운팅 해주는 유틸 함수입니다.

💡 단, `Object`, `Array`, `Set`, `Map`과 같은 객체 타입은 카운팅에서 제외되며, `null`, `NaN`, `undefined`는 카운팅에 포함됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/countOccurrencesInArray/index.ts)

## Interface
```ts title="typescript"
const countOccurrencesInArray: <T extends readonly any[]>(
  arr: T
) => Record<Exclude<T[number], object>, number>;
```

## Usage
```ts title="typescript"
import { countOccurrencesInArray } from '@modern-kit/utils';

const arr = [
  'foo',
  'foo',
  'foo',
  1,
  1,
  [1], // exclude
  { a: 1 }, // exclude
];

const countingObj = countOccurrencesInArray(arr); // { foo: 3, 1: 2 }
```