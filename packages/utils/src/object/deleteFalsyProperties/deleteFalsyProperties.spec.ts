import { deleteFalsyProperties } from '.';

describe('deleteFalsyProperties', () => {
  it('should remove object properties with falsy values other than boolean', () => {
    const originObj = {
      prop1: 1,
      prop2: 0,
      prop3: '',
      prop4: '1',
      prop5: true,
      prop6: false,
      prop7: null,
      prop8: undefined,
      prop9: [],
      prop10: {},
    };
    const expectedObj = {
      prop1: 1,
      prop2: 0,
      prop4: '1',
      prop5: true,
      prop6: false,
    };

    expect(deleteFalsyProperties(originObj)).toEqual(expectedObj);
  });

  it('should remove falsy values(exclude booleans) from nested objects and nested array elements', () => {
    const originObj = {
      prop1: [
        { prop1: null, prop2: {}, prop3: 0, prop4: false, prop5: '1' },
        { prop1: undefined, prop2: [], prop3: 1, prop4: '', prop5: true },
      ],
      prop2: {
        prop2_1: {
          prop2_1_1: 1,
          prop2_1_2: '',
          prop2_1_3: '1',
          prop2_1_4: null,
          prop2_1_5: {
            prop2_1_5_1: {
              prop2_2_5_1_1: 0,
              prop2_2_5_1_2: '',
              prop2_2_5_1_3: 1,
              prop2_2_5_1_4: null,
              prop2_2_5_1_5: undefined,
            },
            prop2_1_5_2: 1,
          },
          prop2_1_6: [
            { prop2_1_6_1: 1, prop2_1_6_2: {} },
            { prop2_1_6_1: '', prop2_1_6_2: [] },
          ],
        },
      },
      prop3: [1, 2, null],
    };
    const expectedObj = {
      prop1: [
        { prop3: 0, prop4: false, prop5: '1' },
        { prop3: 1, prop5: true },
      ],
      prop2: {
        prop2_1: {
          prop2_1_1: 1,
          prop2_1_3: '1',
          prop2_1_5: {
            prop2_1_5_1: {
              prop2_2_5_1_1: 0,
              prop2_2_5_1_3: 1,
            },
            prop2_1_5_2: 1,
          },
          prop2_1_6: [{ prop2_1_6_1: 1 }],
        },
      },
      prop3: [1, 2],
    };

    expect(deleteFalsyProperties(originObj)).toEqual(expectedObj);
  });

  it('should return an empty object if all properties are falsy(exclude booleans)', () => {
    const originObj = {
      prop1: {
        prop1_2: {
          prop1_2_1: [{ prop1_2_1_1: {} }, {}],
          prop1_2_2: undefined,
        },
        prop1_3: null,
      },
    };
    const expectedObj = {};

    expect(deleteFalsyProperties(originObj)).toEqual(expectedObj);
  });

  it('should not modify the original array when calling the deleteFalsyProperties function', () => {
    const originObj = {
      prop1: 1,
      prop2: 0,
      prop3: '',
      prop4: '1',
      prop7: null,
      prop8: undefined,
      prop9: [],
      prop10: {},
    };

    deleteFalsyProperties(originObj);

    expect(originObj).toEqual({
      prop1: 1,
      prop2: 0,
      prop3: '',
      prop4: '1',
      prop7: null,
      prop8: undefined,
      prop9: [],
      prop10: {},
    });
  });

  it('should allow specifying desired types through generics', () => {
    const originObj = {
      prop1: 1,
      prop2: 0,
      prop3: '',
      prop4: '1',
      prop5: true,
      prop6: false,
      prop7: null,
      prop8: undefined,
      prop9: [],
      prop10: {},
    };
    const expectedObj = {
      prop1: 1,
      prop2: 0,
      prop4: '1',
      prop5: true,
      prop6: false,
    };

    const result = deleteFalsyProperties<typeof expectedObj>(originObj);

    expectTypeOf(result).toEqualTypeOf<typeof expectedObj>();
  });
});
