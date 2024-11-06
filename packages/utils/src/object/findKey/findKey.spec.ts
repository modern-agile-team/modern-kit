import { describe, expect, it } from 'vitest';
import { findKey } from '.';

describe('findKey', () => {
  it('predicate 함수 조건에 부합하는 첫 번째 key를 반환해야 합니다.', () => {
    const obj = {
      bike: { active: true },
      plane: { active: true },
      car: { active: false },
    };

    expect(findKey(obj, ({ value }) => value.active)).toEqual('bike');
  });

  it('predicate 함수 조건에 부합하는 key가 없을 경우 undefined를 반환해야 합니다.', () => {
    const obj = {
      bike: { active: true },
      plane: { active: true },
      car: { active: false },
    };

    expect(
      findKey(obj, ({ value }) => (value as any).inactive)
    ).toBeUndefined();
  });
});
