# countSubstringOccurrences

문자열에서 특정 하위 문자열이 얼마나 반복 등장했는지 횟수를 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/countSubstringOccurrences/index.ts)

<br />

## Interface
```ts title="typescript"
interface CountSubstringOccurrencesOptions {
  overlap: boolean;
}

function countSubstringOccurrences(
  source: string,
  target: string,
  options?: CountSubstringOccurrencesOptions
): number;
```

<br />

## Usage
```ts title="typescript"
import { countSubstringOccurrences } from '@modern-kit/utils';

const str = 'apple banana apple grapes apple';
const count1 = countSubstringOccurrences(str, 'apple'); // 3
const count2 = countSubstringOccurrences(str, 'apple banana'); // 1

const duplicatedStr = 'aaaa'
const count3 = countSubstringOccurrences(duplicatedStr, 'aa', { overlap: false }); // 2
const count4 = countSubstringOccurrences(duplicatedStr, 'aa', { overlap: true }); // 3
```
