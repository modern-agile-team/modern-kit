import { describe, it, expect, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useScrollLock } from '.';

const originalBodyOverflow = document.body.style.overflow;

afterEach(() => {
  document.body.style.overflow = originalBodyOverflow;
});

describe('useScrollLock', () => {
  it('autoLock이 true일 때 자동으로 스크롤 잠금이 되어야 합니다', () => {
    document.body.style.overflow = 'auto';

    const { result, unmount } = renderHook(() => useScrollLock());
    const targetElement = result.current.ref.current;

    expect(targetElement).toBe(document.body);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
  });

  it('autoLock이 false일 때 자동으로 스크롤 잠금이 되지 않아야 합니다', () => {
    document.body.style.overflow = 'auto';

    const { result } = renderHook(() => useScrollLock({ autoLock: false }));
    const targetElement = result.current.ref.current;

    expect(targetElement).toBe(document.body);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('스크롤 잠금과 해제가 올바르게 동작해야 합니다', async () => {
    const { result } = renderHook(() => useScrollLock());
    const divElement = document.createElement('div');

    divElement.style.overflow = 'auto';
    result.current.ref.current = divElement;

    await waitFor(() => {
      result.current.lock();
    });

    expect(divElement.style.overflow).toBe('hidden');

    await waitFor(() => {
      result.current.unlock();
    });

    expect(divElement.style.overflow).toBe('auto');
  });
});
