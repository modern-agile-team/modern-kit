# countBy

배열의 각 요소가 몇 번 등장하는지 세어 객체로 반환하는 함수입니다.

iteratee를 전달하면 각 요소를 iteratee에 전달하여 반환된 값을 기준으로 몇 번 등장하는지 세어 객체로 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/countBy/index.ts)

<br />

## Interface

```ts title="typescript"
// without iteratee
export function countBy<T extends readonly any[]>(
  arr: T
): Record<T[number], number>;

// with iteratee
export function countBy<T extends readonly any[], K extends PropertyKey>(
  arr: T,
  iteratee: (value: T[number]) => K
): Record<K, number>;
```

<br />

## Usage

```ts title="typescript"
import { countBy } from '@modern-kit/utils';

countBy([1, 2, 3, 2, 1]);
// { 1: 2, 2: 2, 3: 1 }

countBy([{ address: 'seoul' }, { address: 'incheon' }, { address: 'seoul' }], (value) => value.address);
// { seoul: 2, incheon: 1 }
```
