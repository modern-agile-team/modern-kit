import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePreventBrowserScrollRestoration } from '.';

describe('usePreventBrowserScrollRestoration', () => {
  it('history.scrollRestoration를 manual로 설정하고, unmount 시 원래대로 복원해야 한다', () => {
    window.history.scrollRestoration = 'auto';

    const { unmount } = renderHook(() => usePreventBrowserScrollRestoration());

    expect(window.history.scrollRestoration).toBe('manual');

    unmount();

    expect(window.history.scrollRestoration).toBe('auto');
  });
});
