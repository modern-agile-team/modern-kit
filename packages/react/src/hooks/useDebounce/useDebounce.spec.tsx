import { renderHook } from '@testing-library/react';
import { useDebounce } from '.';

beforeAll(() => {
  jest.useFakeTimers();
});

describe('useDebounce', () => {
  it('should call passed function after given amount of time', () => {
    const mockFn = jest.fn();

    const { result } = renderHook(() => useDebounce(mockFn, 500));

    result.current();

    jest.advanceTimersByTime(300);
    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(200);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('should only be called once even if it is called multiple times within the delay time.', () => {
    const mockFn = jest.fn();

    const { result } = renderHook(() => useDebounce(mockFn, 500));

    result.current();
    result.current();
    result.current();

    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(1);

    result.current();
    result.current();

    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(2);

    result.current();

    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(3);
  });

  it('debounce should be cancelled on unmount', () => {
    const mockFn = jest.fn();

    const { result, unmount } = renderHook(() => useDebounce(mockFn, 500));

    result.current();

    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(300);

    unmount();

    jest.advanceTimersByTime(200);
    expect(mockFn).not.toBeCalled();
  });
});
