import { describe, expect, it } from 'vitest';
import { findLastKey } from '.';

describe('findLastKey', () => {
  it('should return correct key element when a existent key-value is accessed', () => {
    const obj = {
      bike: { active: true },
      car: { active: false },
      plane: { active: true },
    };

    expect(findLastKey(obj, (item) => item.active)).toEqual('plane');
  });

  it('should return undefined when a non-existent key-value is accessed', () => {
    const obj = {
      bike: { active: true },
      car: { active: false },
      plane: { active: true },
    };

    expect(findLastKey(obj, (item) => (item as any).inactive)).toEqual(
      undefined,
    );
  });
});
