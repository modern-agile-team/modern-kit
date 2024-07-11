import { noop } from '.';

describe.concurrent('noop', () => {
  it('should return undefined', () => {
    const result = noop();

    expect(result).toBeUndefined();
  });
});
