import { asyncNoop } from '.';

describe('asyncNoop', () => {
  it('should return a Promise', () => {
    expect(asyncNoop()).toBeInstanceOf(Promise);
  });
});
