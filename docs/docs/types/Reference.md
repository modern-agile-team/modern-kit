# Reference

JavaScript의 참조 타입(Reference Type)들을 나타내는 유니온 타입입니다. 원시 타입(Primitive)이 아닌 모든 타입을 포함합니다.

## Interface

```ts title="typescript"
type Reference =
  | Record<PropertyKey, any>
  | readonly any[]
  | ((...args: any[]) => any)
  | Set<any>
  | Map<any, any>
  | WeakMap<object, any>
  | WeakSet<object>
  | Date
  | RegExp
  | Error
  | Promise<any>
  | ArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;
```

## Usage

```ts title="typescript"
// 객체 타입
const obj: Reference = { name: 'John', age: 30 };

// 배열 타입
const arr: Reference = [1, 2, 3, 4, 5];

// 함수 타입
const func: Reference = (x: number) => x * 2;

// 컬렉션 타입
const set: Reference = new Set([1, 2, 3]);
const map: Reference = new Map([['key', 'value']]);

// 내장 객체 타입
const date: Reference = new Date();
const regex: Reference = /pattern/;
const error: Reference = new Error('Something went wrong');
``` 