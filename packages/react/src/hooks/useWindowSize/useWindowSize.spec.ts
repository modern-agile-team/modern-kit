import { renderHook, waitFor } from '@testing-library/react';
import { setWindowSize } from '../../utils/test/setWindowSize';
import { useWindowSize } from '.';

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(() => {
  setWindowSize(1024, 768); // default jsdom
});

describe('useWindowSize', () => {
  it('should return a default width of 1024px and height of 768px', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('should return the current window size after changing the browser size', async () => {
    const { result } = renderHook(() => useWindowSize());

    await waitFor(() => {
      setWindowSize(512, 256);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(512);
    expect(result.current.height).toBe(256);
  });

  it('should return the browser size after the given time when the debounce option is given', async () => {
    const { result } = renderHook(() => useWindowSize({ isDebounce: true }));

    await waitFor(() => {
      setWindowSize(512, 256);
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => {
      jest.advanceTimersByTime(100);

      expect(result.current.width).toBe(1024);
      expect(result.current.height).toBe(768);
    });

    await waitFor(() => {
      jest.advanceTimersByTime(200);

      expect(result.current.width).toBe(512);
      expect(result.current.height).toBe(256);
    });
  });
});
