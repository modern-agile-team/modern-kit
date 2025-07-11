# ExtractNestedArrayType

중첩된 배열 타입을 재귀적으로 풀어내어 가장 내부의 요소 타입을 추출하는 유틸리티 타입입니다.

## Interface

```ts title="typescript"
type ExtractNestedArrayType<T> = T extends readonly (infer U)[]
  ? ExtractNestedArrayType<U>
  : T;
```

## Usage

```ts title="typescript"
type Example = ExtractNestedArrayType<(number | (number | number[])[])[]> 
// number
``` 