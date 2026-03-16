# serialize

`Serializes` an object value so it can be used as a `query parameter`.

Values that are `arrays within the object` are serialized by `converting all array elements into key-value pairs`.

An `option` can be passed as the `second argument` to specify how to handle `null, empty string, and undefined`. By default, `these values are all excluded`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/serialize/index.ts)

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
