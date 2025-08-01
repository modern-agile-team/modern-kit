# ExtractArrayElement

배열 요소 타입을 추출하는 유틸리티 타입입니다. 중첩 배열의 경우 재귀적으로 풀어내어 가장 내부의 요소 타입을 추출합니다.

## Interface

```ts title="typescript"
type ExtractArrayElement<T> = T extends readonly (infer U)[]
  ? ExtractArrayElement<U>
  : T;
```

## Usage

```ts title="typescript"
type Example1 = ExtractArrayElement<(number | (number | number[])[])[]> 
// number

type Example2 = ExtractArrayElement<(number | (string | boolean[])[])[]>
// number | string | boolean
```