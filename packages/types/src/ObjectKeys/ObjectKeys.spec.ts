import { ObjectKeys } from '.';

describe('ObjectKeys', () => {
  it('Object.keys의 반환 타입을 명확하게 합니다. symbol은 제외합니다.', () => {
    const test = {
      foo: 'foo',
      bar: 'bar',
    } as const;

    const defaultKeys = Object.keys(test);
    const AppliedKeys = Object.keys(test) as ObjectKeys<typeof test>[];

    expectTypeOf(defaultKeys).toEqualTypeOf<string[]>();
    expectTypeOf(AppliedKeys).toEqualTypeOf<('foo' | 'bar')[]>();
  });
});
