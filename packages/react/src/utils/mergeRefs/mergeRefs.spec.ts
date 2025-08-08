import { describe, it, expect, vi } from 'vitest';
import { mergeRefs } from './index';
import React from 'react';

describe('mergeRefs', () => {
  it('함수형 ref를 병합할 수 있어야 한다', () => {
    const ref1 = vi.fn();
    const ref2 = vi.fn();
    const ref3 = vi.fn();
    const node = { id: 'test-node' };

    const mergedRef = mergeRefs(ref1, ref2, ref3);
    mergedRef(node);

    expect(ref1).toHaveBeenCalledWith(node);
    expect(ref2).toHaveBeenCalledWith(node);
    expect(ref3).toHaveBeenCalledWith(node);
  });

  it('여러 개의 객체형 ref를 병합할 수 있어야 한다', () => {
    const ref1: React.MutableRefObject<any> = { current: null };
    const ref2: React.MutableRefObject<any> = { current: null };
    const ref3: React.MutableRefObject<any> = { current: null };
    const node = { id: 'test-node' };

    const mergedRef = mergeRefs(ref1, ref2, ref3);
    mergedRef(node);

    expect(ref1.current).toBe(node);
    expect(ref2.current).toBe(node);
    expect(ref3.current).toBe(node);
  });
});
