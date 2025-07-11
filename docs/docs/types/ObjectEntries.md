# ObjectEntries

Object.entries 함수의 반환 타입을 명확하게 정의하기 위해 사용 할 수 있습니다.

`[key, value]` 형태의 튜플로 반환하며, `symbol` 타입의 키는 제외됩니다.

## Interface

```ts title="typescript"
type ObjectEntries<T extends Record<PropertyKey, any>> = [
  ObjectKeys<T>,
  T[ObjectKeys<T>]
][];
```

## Usage

```ts title="typescript"
type MyObject = { a: string, b: number };
type MyEntries = ObjectEntries<MyObject> // ['a' | 'b', string | number][]

const obj = { a: 1, b: 2, c: 3 } as const;
const entries = Object.entries(obj) as ObjectEntries<typeof obj>;
// ["a" | "b" | "c", 1 | 2 | 3][]
``` 