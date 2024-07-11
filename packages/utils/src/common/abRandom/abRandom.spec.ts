import { abRandom } from '.';

describe.concurrent('abRandom', () => {
  it('should return 0 if Math.random() is less than 0.5', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(abRandom()).toBe(0);
  });

  it('should return 1 if Math.random() is 0.5 or greater', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.7);
    expect(abRandom()).toBe(1);
  });
});
