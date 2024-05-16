import { useWindowScrollTo } from '.';
import { renderHook } from '@testing-library/react';

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

describe('useWindowScrollTo', () => {
  it('should scroll to the default position when no arguments are provided', () => {
    renderHook(() => useWindowScrollTo());

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: 'auto',
      left: 0,
      top: 0,
    });
  });

  it('should scroll according to the given scroll options', () => {
    renderHook(() =>
      useWindowScrollTo({ left: 500, top: 500, behavior: 'smooth' })
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      left: 500,
      top: 500,
    });
  });
});
