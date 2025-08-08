import { describe, expect, it } from 'vitest';
import { findLastKey } from '.';

describe('findLastKey', () => {
  it('존재하는 key-value에 접근할 때 올바른 키를 반환해야 합니다', () => {
    const obj = {
      bike: { active: true },
      car: { active: false },
      plane: { active: true },
    };

    expect(findLastKey(obj, (item) => item.active)).toEqual('plane');
  });

  it('존재하지 않는 key-value에 접근할 때 undefined를 반환해야 합니다', () => {
    const obj = {
      bike: { active: true },
      car: { active: false },
      plane: { active: true },
    };

    expect(findLastKey(obj, (item) => (item as any).inactive)).toEqual(
      undefined
    );
  });
});
