# isEmpty

주어진 값이 비어있는지 확인합니다.

아래의 경우를 비어있는 값으로 판단합니다.

- `null`, `undefined`
- 빈 문자열 `''`
- 길이가 0인 배열
- `size`가 0인 `Map`, `Set`
- 자신의 열거 가능한 string key가 없는 순수 객체 (프로토타입이 `Object.prototype`이거나 없는 객체)

그 외의 값(숫자, boolean, 함수, `Date`, 클래스 인스턴스 등)은 비어있지 않은 것으로 판단하여 `false`를 반환합니다.

:::info
lodash와 달리 `0`, `false` 등은 비어있는 값으로 취급하지 않습니다.
:::

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isEmpty/index.ts)

<br />

## Interface

```ts title="typescript"
function isEmpty(value: unknown): boolean;
```

<br />

## Usage

```ts title="typescript"
import { isEmpty } from '@modern-kit/utils';

isEmpty(null); // true
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(new Map()); // true

isEmpty(' '); // false
isEmpty([0]); // false
isEmpty({ a: undefined }); // false
isEmpty(0); // false
isEmpty(false); // false
```
