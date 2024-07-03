import { ExtractNestedArrayType } from '.';

describe('ExtractNestedArrayType', () => {
  it('should correctly extract the nested array type when all elements are numbers', () => {
    const arr = [1, 2, [3, 4, [5, 6]]]; // (number | (number | number[])[])[]
    const flattenArray = arr.flat(2); // number[]

    type extractedType = ExtractNestedArrayType<typeof arr>; // number

    expectTypeOf(flattenArray).toEqualTypeOf<extractedType[]>();
  });

  it('should correctly extract the nested array type when elements are of mixed types', () => {
    const arr = [1, 2, ['string', 4, [true, 6]]]; // (number | (string | number | (number | boolean)[])[])[]
    const flattenArray = arr.flat(3); // (string | number | boolean)[]

    type extractedType = ExtractNestedArrayType<typeof arr>; // string | number | boolean

    expectTypeOf(flattenArray).toEqualTypeOf<extractedType[]>();
  });
});
