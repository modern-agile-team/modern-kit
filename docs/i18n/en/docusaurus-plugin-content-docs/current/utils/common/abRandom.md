# abRandom

A function that returns either `0` or `1` with a 50% probability.

It can be used when performing `A/B testing`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/abRandom/index.ts)

<br />

## Interface
```ts title="typescript"
const abRandom: () => 0 | 1
```

<br />

## Usage
```ts title="typescript"
import { abRandom } from '@modern-kit/utils';

const ab = abRandom();
```
