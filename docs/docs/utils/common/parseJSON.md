# parseJSON

문자열 외의 타입은 그대로 반환하며, 문자열인 경우 정확한 `JSON Format`으로 넘길 경우 해당 문자열을 `JSON.parse`로 변환 후 반환된 값을 반환합니다. 만약 정확한 `JSON Format`이 아닌 경우 에러를 발생시킵니다.

타입스크립트의 경우 `JSON.parse`의 인자로 문자열만 받을 수 있는데, 해당 함수를 통해 더 다양한 케이스에 적용할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/parseJSON/index.ts)

## Interface
```ts title="typescript"
export function parseJSON<T = unknown>(value: string): T;

export function parseJSON<T>(value: T): T;
```

## Usage
### Case1. value type: string
value의 타입이 `string`의 경우 정확한 `제네릭(T)` 타입을 넘겨줘야 정확한 반환 타입을 갖습니다. 
`제네릭(T)` 타입을 넘겨주지 않으면 `unknown`을 반환 타입으로 갖습니다. 이는 JSON.parse를 통해 어떠한 타입으로도 변환될 수 있기 때문입니다.

```ts title="typescript"
import { parseJSON } from '@modern-kit/utils';

type NormalObject = { a: 1, b: 2 }

const number1 = parseJSON("123"); 
// value: 123
// number: unknown

const number2 = parseJSON<number>("123"); 
// value: 123
// number: number

const str = parseJSON<string>('"123"'); 
// value: "123"
// number: string

const normalObject = parseJSON<NormalObject>(`{ "a": 1, "b": 2 }`);
// value: { a: 1, b: 2 }
// type: NormalObject
```

### Case1. value type: Excludes strings
value의 타입이 `string`이 아닌 경우에는 인자로 받은 값을 그대로 반환하기 때문에 `제네릭(T)` 타입을 지정하지 않더라도 value의 타입을 그대로 반환 타입으로 갖습니다.

```ts title="typescript"
import { parseJson } from '@modern-kit/utils';

type NormalObject = { a: 1, b: 2 }

const number = parseJSON(123); 
// value: 123
// type: number

const normalObject = parseJSON<number>({ a: 1, b: 1}); 
// value: 123
// type: { a: number; b: number }

const str = parseJSON<number>([1, 2, 3]);
// TypeError: 'number[]' 형식의 인수는 'number' 형식의 매개 변수에 할당될 수 없습니다.
```