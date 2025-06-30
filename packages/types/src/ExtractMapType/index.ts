/**
 * @description Map의 타입의 제네릭 타입을 추출하는 타입입니다. Map<K, V>와 같은 타입에서 K와 V를 추출하여 [K, V] 형태의 튜플로 반환합니다.
 *
 * @template T - 타입을 추출할 Map 타입
 * @returns 입력된 타입이 Map인 경우 [키 타입, 값 타입] 형태의 튜플을 반환하고, Map이 아닌 경우 never를 반환합니다.
 *
 * @example
 * type StringNumberMap = Map<string, number>;
 * type Extracted = ExtractMapType<StringNumberMap>; // [string, number]
 *
 * type NotMap = ExtractMapType<number>; // never
 */
export type ExtractMapType<T> = T extends Map<infer K, infer V>
  ? [K, V]
  : never;
