# serialize

객체로 들어온 값을 `query parameter로 사용할 수 있도록 직렬화`해줍니다.

`객체 내에 배열로 들어온 값`의 경우 배열 내의 값에 대해 `전부 key-value 형태로 변환하여 직렬화`해줍니다.

`두번째 인자`로 `option`을 넣어줄 수 있으며, option으로 `null, empty string, undefined에 대한 처리를 지정`할 수 있으며 `기본적으로 이 값에 대해서는 모두 제외`됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/serialize/index.ts)

<br />

## Interface
```ts title="typescript"
interface SerializeOptions {
  skipNull?: boolean;
  skipEmptyString?: boolean;
  skipUndefined?: boolean;
}

function serialize<T extends Record<PropertyKey, any>>(
  obj: T,
  options?: SerializeOptions
): string;
```

<br />

## Usage
```ts title="typescript"
import { serialize } from '@modern-kit/utils';

const serializedValue = serialize({ str: 123, foo: 'bar' }) // 'str=123&foo=bar'

const paramaterWithInvalidValue = { str: 123, foo: 'bar', name: null, phone: '' }
const serializedValue = serialize(paramaterWithInvalidValue); // 'str=123&foo=bar'

const paramaterWithArray = { str: 123, foo: 'bar', num: [1,2,3] }
const serializedValue = serialize(paramaterWithArray); // 'str=123&foo=bar&num=1&num=2&num=3'

const paramater = { str: null, foo: '', bar: undefined }
const options = { skipNull: false, skipEmptyString: false, skipUndefined: false }
const serializedValue = serialize(paramater, options); // 'str=null&foo=&bar=undefined'
```
