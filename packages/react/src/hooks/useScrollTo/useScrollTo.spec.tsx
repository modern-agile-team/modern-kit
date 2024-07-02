import { useScrollTo } from '.';
import { renderHook } from '@testing-library/react';

const DEFAULT_OPTIONS = {
  behavior: 'auto',
  left: 0,
  top: 0,
} as const;

const SCROLL_OPTIONS = {
  behavior: 'smooth',
  left: 500,
  top: 500,
} as const;

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

describe('useScrollTo', () => {
  it('should scroll to the default position when no arguments are provided', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current.scrollTo();

    expect(window.scrollTo).toHaveBeenCalledWith(DEFAULT_OPTIONS);
  });

  it('should scroll according to the given scroll options', () => {
    const { result } = renderHook(() => useScrollTo<HTMLDivElement>());

    const div = document.createElement('div');
    div.scrollTo = vi.fn() as any;

    (result.current.ref.current as any) = div;

    result.current.scrollTo(SCROLL_OPTIONS);

    expect(div.scrollTo).toHaveBeenCalledWith(SCROLL_OPTIONS);
  });

  it('should scroll to the default position when no arguments are provided', () => {
    const autoScrollOptions = SCROLL_OPTIONS;

    renderHook(() => useScrollTo(autoScrollOptions));

    expect(window.scrollTo).toHaveBeenCalledWith(SCROLL_OPTIONS);
  });

  it('should scroll to the default position when no arguments are provided', () => {
    renderHook(() => useScrollTo({}));

    expect(window.scrollTo).toHaveBeenCalledWith(DEFAULT_OPTIONS);
  });
});
