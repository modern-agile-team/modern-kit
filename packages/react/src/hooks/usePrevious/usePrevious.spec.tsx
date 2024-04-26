import { renderHook } from '@testing-library/react';
import { usePrevious } from '.';

describe('usePrevious', () => {
  it('should return the value of the argument from the previous render', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBe(0);

    rerender({ value: 1 });
    expect(result.current).toBe(0);

    rerender({ value: 3 });
    expect(result.current).toBe(1);

    rerender({ value: 5 });
    expect(result.current).toBe(3);
  });
});
