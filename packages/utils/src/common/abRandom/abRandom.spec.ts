import { describe, it, expect, vi } from 'vitest';
import { abRandom } from '.';

describe('abRandom', () => {
  it('Math.random()이 0.5보다 작으면 0을 반환해야 한다', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(abRandom()).toBe(0);
  });

  it('Math.random()이 0.5 이상이면 1을 반환해야 한다', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.7);
    expect(abRandom()).toBe(1);
  });
});
