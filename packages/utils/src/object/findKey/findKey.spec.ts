import { describe, expect, it } from 'vitest';
import { findKey } from '.';

describe('findKey', () => {
  it('should return correct key element when a existent key-value is accessed', () => {
    const obj = {
      bike: { active: true },
      plane: { active: true },
      car: { active: false },
    };

    expect(findKey(obj, (item) => item.active)).toEqual('bike');
  });

  it('should return undefined when a non-existent key-value is accessed', () => {
    const obj = {
      bike: { active: true },
      plane: { active: true },
      car: { active: false },
    };

    expect(findKey(obj, (item) => (item as any).inactive)).toEqual(undefined);
  });
});
