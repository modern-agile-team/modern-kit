import { describe, expect, it } from 'vitest';
import { screen, renderHook } from '@testing-library/react';
import { renderSetup } from '../../utils/test/renderSetup';
import { useBlockPromiseMultipleClick } from '.';

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

describe('useBlockPromiseMultipleClick', () => {
  it('should block multiple button clicks until the promise in the callback function is resolved', async () => {
    const mockFn = vi.fn(async () => await delay(1000));
    const { result } = renderHook(useBlockPromiseMultipleClick);

    const { blockMultipleClick } = result.current;
    expect(result.current.isLoading).toBe(false);

    const onClick = () => blockMultipleClick(mockFn);

    const { user } = renderSetup(
      <button onClick={onClick}>TestButton</button>,
      { delay: null }
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
