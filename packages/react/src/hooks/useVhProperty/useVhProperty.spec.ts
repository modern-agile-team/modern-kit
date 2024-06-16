import { renderHook } from '@testing-library/react';
import { useVhProperty } from '.';

describe('useVhProperty', () => {
  it('should set --vh property on documentElement', () => {
    window.innerHeight = 800;
    renderHook(() => useVhProperty());
    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('8px');
  });

  it('should set --custom property on documentElement', () => {
    window.innerHeight = 800;
    renderHook(() => useVhProperty('custom'));
    expect(document.documentElement.style.getPropertyValue('--custom')).toBe(
      '8px',
    );
  });

  it('should remove previous property when variable name is changed', () => {
    window.innerHeight = 800;
    let variable = 'vh';

    const { rerender } = renderHook(() =>
      useVhProperty(variable, {
        calculateAtResize: true,
      }),
    );
    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('8px');

    variable = 'custom';
    rerender();

    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('');
    expect(document.documentElement.style.getPropertyValue('--custom')).toBe(
      '8px',
    );
  });

  it('should set --vh property on documentElement and update on resize', () => {
    window.innerHeight = 800;
    renderHook(() =>
      useVhProperty('vh', {
        calculateAtResize: true,
      }),
    );
    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('8px');

    window.innerHeight = 600;
    window.dispatchEvent(new Event('resize'));

    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('6px');
  });
});
