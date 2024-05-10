# parseJson

일반적으로 JSON.parse를 사용하는 경우 일부 input값(ex. 빈 문자열, undefined, NaN)에 대해서는 에러를 반환합니다. 이 함수를 사용하면 에러를 반환하는 값에 대해서는 null을 반환하여 파싱 시의 예상치 못한 에러를 방지할 수 있습니다. 

<br />

## Interface
```tsx
const parseJson: <T>(value: T) => any
```

## Usage
```ts
import { parseJson } from '@modern-kit/utils';

const result = parseJSON(`{ "a": 1, "b": 2 }`); // { a: 1, b: 2 }
const emptyString = parseJSON(''); // null
const nullValue = parseJSON(null); // null
const undefinedValue = parseJSON(undefined); // undefined
const NaNValue = parseJSON(NaN); // null
```