/**
 * @description Map의 타입에서 키와 값의 타입을 추출하여 튜플로 반환하는 타입입니다.
 *
 * @template T - 타입을 추출할 Map 타입
 * @returns 입력된 타입이 Map인 경우 [키 타입, 값 타입] 형태의 튜플을 반환하고, Map이 아닌 경우 never를 반환합니다.
 * @example
 * type StringNumberMap = Map<string, number>;
 * type Extracted = ExtractMapType<StringNumberMap>; // [string, number]
 */
export type ExtractMapType<T> = T extends Map<infer K, infer V>
  ? [K, V]
  : never;
