import { describe, expect, it } from 'vitest';
import { screen, renderHook } from '@testing-library/react';
import { renderSetup } from '../../utils/test/renderSetup';
import { useBlockMultipleClick } from '.';

const delay = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time);
  });
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useBlockMultipleClick', () => {
  it('should block double click', async () => {
    const mockFn = vi.fn(async () => await delay(1000));
    const { result } = renderHook(useBlockMultipleClick);

    const { blockDoubleClick } = result.current;
    expect(result.current.isLoading).toBe(false);

    const onClick = () => blockDoubleClick(mockFn);

    const { user } = renderSetup(
      <button onClick={onClick}>TestButton</button>,
      { delay: null },
    );

    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(button);

    expect(result.current.isLoading).toBe(true);
    expect(mockFn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(1000);

    expect(result.current.isLoading).toBe(false);
  });
});
