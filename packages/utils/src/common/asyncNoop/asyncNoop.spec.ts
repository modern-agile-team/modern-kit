import { asyncNoop } from '.';

describe.concurrent('asyncNoop', () => {
  it('should return a Promise', () => {
    expect(asyncNoop()).toBeInstanceOf(Promise);
  });
});
