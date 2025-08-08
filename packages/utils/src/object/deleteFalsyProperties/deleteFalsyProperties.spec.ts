import { describe, it, expect, expectTypeOf } from 'vitest';
import { deleteFalsyProperties } from '.';

describe('deleteFalsyProperties', () => {
  it('boolean을 제외한 falsy 값을 가진 객체의 속성을 제거해야 한다', () => {
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

  it('중첩된 객체와 배열 요소에서 boolean을 제외한 falsy 값을 제거해야 한다', () => {
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

  it('모든 속성이 falsy(boolean 제외)인 경우 빈 객체를 반환해야 한다', () => {
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

  it('deleteFalsyProperties 함수를 호출할 때 원본 객체를 수정하지 않아야 한다', () => {
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

  it('제네릭을 통해 원하는 타입을 지정할 수 있어야 한다', () => {
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
