import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVhProperty } from '.';

describe('useVhProperty', () => {
  it('documentElement에 --vh 속성을 설정해야 합니다', () => {
    window.innerHeight = 800;
    renderHook(() => useVhProperty());
    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('8px');
  });

  it('documentElement에 --custom 속성을 설정해야 합니다', () => {
    window.innerHeight = 800;
    renderHook(() => useVhProperty({ name: 'custom' }));
    expect(document.documentElement.style.getPropertyValue('--custom')).toBe(
      '8px'
    );
  });

  it('documentElement에 --vh 속성을 설정하고 리사이즈 시 업데이트해야 합니다', () => {
    window.innerHeight = 800;
    renderHook(() =>
      useVhProperty({
        enabledResize: true,
      })
    );
    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('8px');

    window.innerHeight = 600;
    window.dispatchEvent(new Event('resize'));

    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('6px');
  });
});
