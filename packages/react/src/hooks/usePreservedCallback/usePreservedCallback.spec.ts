import { renderHook } from '@testing-library/react';
import { usePreservedCallback } from '.';

describe('usePreservedCallback', () => {
  it('should preserve and execute the callback', async () => {
    const Increment = (data: number) => {
      return data + 1;
    };

    const newIncrement = (data: number) => {
      return data + 10;
    };

    const { result } = renderHook(() => usePreservedCallback(Increment));

    const data1 = result.current(0);
    expect(data1).toBe(1);

    const data2 = result.current(10);
    expect(data2).toBe(11);

    result.current = newIncrement; // change

    const data3 = result.current(0);
    expect(data3).toBe(10);

    const data4 = result.current(10);
    expect(data4).toBe(20);
  });
});
