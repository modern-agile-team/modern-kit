import { renderHook } from '@testing-library/react';
import { useAsyncPreservedCallback } from '.';

describe('useAsyncPreservedCallback', () => {
  it('should preserve and execute the callback', async () => {
    const asyncIncrement = async (data: number) => {
      return data + 1;
    };

    const asyncNewIncrement = async (data: number) => {
      return data + 10;
    };

    const { result } = renderHook(() =>
      useAsyncPreservedCallback(asyncIncrement)
    );

    const data1 = await result.current(0);
    expect(data1).toBe(1);

    const data2 = await result.current(10);
    expect(data2).toBe(11);

    result.current = asyncNewIncrement; // change

    const data3 = await result.current(0);
    expect(data3).toBe(10);

    const data4 = await result.current(10);
    expect(data4).toBe(20);
  });
});
