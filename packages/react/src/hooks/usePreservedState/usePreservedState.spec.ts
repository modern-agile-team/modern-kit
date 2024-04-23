import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePreservedState } from '.';

describe('usePreservedState', () => {
  describe('Default Comparator Callback 사용', () => {
    it('값이 같다면 상태의 변경되서는 안됩니다. 이때 참조도 유지되어야 합니다.', () => {
      const originObj = { group: 'modern-agile' };
      const targetObj = { group: 'modern-agile' };

      const { result, rerender } = renderHook(
        ({ value }) => usePreservedState(value),
        {
          initialProps: { value: originObj },
        }
      );

      rerender({ value: targetObj });

      expect(result.current).toBe(originObj);
      expect(result.current).toEqual(originObj);
    });

    it('값이 변경되면 상태가 변경되야 합니다.', () => {
      const originObj = { group: 'modern-agile' };
      const targetObj = { group: 'frontend' };

      const { result, rerender } = renderHook(
        ({ value }) => usePreservedState(value),
        {
          initialProps: { value: originObj },
        }
      );

      rerender({ value: targetObj });

      expect(result.current).toBe(targetObj);
      expect(result.current).toEqual(targetObj);
    });
  });

  describe('Custom Comparator Callback 사용', () => {
    it('comparator가 true를 반환하면 상태가 변경되서는 안됩니다. 이때 참조도 유지되어야 합니다.', () => {
      const comparator = (a: any, b: any) => a.group === b.group;

      const originObj = { group: 'modern-agile', title: 'origin' };
      const changedObj = { group: 'modern-agile', title: 'change' };

      const { result, rerender } = renderHook(
        ({ value }) => usePreservedState(value, comparator),
        {
          initialProps: { value: originObj },
        }
      );

      rerender({ value: changedObj });

      expect(result.current).toBe(originObj);
      expect(result.current).toEqual(originObj);
    });

    it('comparator가 false를 반환하면 상태가 변경되야 합니다.', () => {
      const comparator = (a: any, b: any) => a.group === b.group;

      const originObj = { group: 'modern-agile', title: 'origin' };
      const changedObj = { group: 'frontend', title: 'change' };

      const { result, rerender } = renderHook(
        ({ value }) => usePreservedState(value, comparator),
        {
          initialProps: { value: originObj },
        }
      );

      rerender({ value: changedObj });

      expect(result.current).toBe(changedObj);
      expect(result.current).toEqual(changedObj);
    });
  });
});
