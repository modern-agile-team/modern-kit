import { describe, it, expectTypeOf } from 'vitest';
import { ExtractNestedArrayType } from '.';

describe('ExtractNestedArrayType', () => {
  it('모든 요소가 숫자인 중첩 배열에서 올바르게 타입을 추출해야 합니다.', () => {
    const arr = [1, 2, [3, 4, [5, 6]]]; // (number | (number | number[])[])[]
    const flattenArray = arr.flat(2); // number[]

    type extractedType = ExtractNestedArrayType<typeof arr>; // number

    expectTypeOf(flattenArray).toEqualTypeOf<extractedType[]>();
  });

  it('요소가 혼합된 타입인 중첩 배열에서 올바르게 타입을 추출해야 합니다.', () => {
    const arr = [1, 2, ['string', 4, [true, 6]]]; // (number | (string | number | (number | boolean)[])[])[]
    const flattenArray = arr.flat(3); // (string | number | boolean)[]

    type extractedType = ExtractNestedArrayType<typeof arr>; // string | number | boolean

    expectTypeOf(flattenArray).toEqualTypeOf<extractedType[]>();
  });
});
