import { describe, it, expect, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useScrollLock } from '.';

const originalBodyOverflow = document.body.style.overflow;

afterEach(() => {
  document.body.style.overflow = originalBodyOverflow;
});

describe('useScrollLock', () => {
  it('should initialize properly with autoLock as true', () => {
    document.body.style.overflow = 'auto';

    const { result, unmount } = renderHook(() => useScrollLock());
    const targetElement = result.current.ref.current;

    expect(targetElement).toBe(document.body);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
  });

  it('should initialize properly with autoLock as false', () => {
    document.body.style.overflow = 'auto';

    const { result } = renderHook(() => useScrollLock({ autoLock: false }));
    const targetElement = result.current.ref.current;

    expect(targetElement).toBe(document.body);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should lock and unlock properly', async () => {
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
