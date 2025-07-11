# Range

주어진 두 숫자 사이의 범위를 생성하는 타입입니다. 이때, 마지막 숫자는 포함되지 않습니다.
- 예를 들어 1부터 5까지의 범위를 생성하면 `1, 2, 3, 4`가 포함됩니다.
- 두 숫자가 같은 경우 `never`를 반환합니다.
- 첫 번째 숫자가 두 번째 숫자보다 큰 경우 `never`를 반환합니다.

## Interface

```ts title="typescript"
type Range<T, F> = T extends number
  ? F extends number
    ? Exclude<EnumerateNumbers<F>, EnumerateNumbers<T>>
    : never
  : never;
```

## Usage

```ts title="typescript"
type RangeExample = Range<1, 5>; // 1 | 2 | 3 | 4
``` 