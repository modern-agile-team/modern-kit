# countSubstringOccurrences

문자열에서 특정 하위 문자열이 얼마나 반복 등장했는지 횟수를 반환하는 함수입니다.

<br />

## Interface
```tsx
const countSubstringOccurrences: (source: string, target: string) => number
```

## Usage
```ts
import { countSubstringOccurrences } from '@modern-kit/utils';

const str = 'apple banana apple grapes apple';
const count1 = countSubstringOccurrences(str, 'apple'); // 3
const count2 = countSubstringOccurrences(str, 'apple banana'); // 1
```