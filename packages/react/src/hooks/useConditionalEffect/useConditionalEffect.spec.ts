import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useConditionalEffect } from '.';

describe('useConditionalEffect', () => {
  it('조건이 true일 때 effect가 실행되어야 한다', () => {
    const effect = vi.fn();

    renderHook(() => useConditionalEffect(effect, [1], true));

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('조건이 false일 때 effect가 실행되지 않아야 한다', () => {
    const effect = vi.fn();

    renderHook(() => useConditionalEffect(effect, [1], false));

    expect(effect).toHaveBeenCalledTimes(0);
  });

  it('의존성 배열이 변경되고, 조건이 true일 때 effect가 실행되어야 한다', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(
      ({ deps, condition }) => useConditionalEffect(effect, deps, condition),
      {
        initialProps: { deps: [1], condition: false },
      }
    );

    expect(effect).toHaveBeenCalledTimes(0);

    rerender({ deps: [2], condition: true });

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('의존성 배열이 변경되고, 조건이 false일 때 effect가 실행되지 않아야 한다', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(
      ({ deps, condition }) => useConditionalEffect(effect, deps, condition),
      {
        initialProps: { deps: [1], condition: true },
      }
    );

    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: [2], condition: false });

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('조건 함수가 true를 반환할 때 effect가 실행되어야 한다', () => {
    const effect = vi.fn();
    renderHook(() => useConditionalEffect(effect, [1], () => true));

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('조건 함수가 false를 반환할 때 effect가 실행되지 않아야 한다', () => {
    const effect = vi.fn();
    renderHook(() => useConditionalEffect(effect, [1], () => false));

    expect(effect).toHaveBeenCalledTimes(0);
  });

  it('의존성이 변경될 때 조건 함수가 이전 의존성과 현재 의존성을 받아야 한다', () => {
    const effect = vi.fn();
    const conditionFn = vi.fn(() => true);

    const { rerender } = renderHook(
      ({ deps }) => useConditionalEffect(effect, deps, conditionFn),
      {
        initialProps: { deps: [1] },
      }
    );

    expect(conditionFn).toHaveBeenLastCalledWith(undefined, [1]);

    rerender({ deps: [2] });

    expect(conditionFn).toHaveBeenLastCalledWith([1], [2]);

    rerender({ deps: [3] });

    expect(conditionFn).toHaveBeenLastCalledWith([2], [3]);
  });

  it('조건 함수 내 의존성 값을 사용해 effectCallback 함수 호출을 제어할 수 있어야 한다', () => {
    const effect = vi.fn();

    const conditionFn = vi.fn(
      (_prevDeps: number[] | undefined, currentDeps: number[]) => {
        return _prevDeps == null || currentDeps[0] > 2;
      }
    );

    const { rerender } = renderHook(
      ({ deps }) => useConditionalEffect(effect, deps, conditionFn),
      {
        initialProps: { deps: [1] },
      }
    );

    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: [2] });

    expect(effect).toHaveBeenCalledTimes(1); // deps가 변경되었지만 조건 함수가 false를 반환하여 호출되지 않음

    rerender({ deps: [3] });

    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('cleanup 함수가 반환될 경우 정리되어야 한다', () => {
    const cleanup = vi.fn();
    const effect = vi.fn(() => cleanup);

    const { unmount } = renderHook(() =>
      useConditionalEffect(effect, [1], true)
    );

    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it('조건이 false일 때 cleanup 함수가 호출되지 않아야 한다', () => {
    const cleanup = vi.fn();
    const effect = vi.fn(() => cleanup);

    const { unmount } = renderHook(() =>
      useConditionalEffect(effect, [1], false)
    );

    expect(effect).not.toHaveBeenCalled();
    expect(cleanup).not.toHaveBeenCalled();

    unmount();

    expect(cleanup).not.toHaveBeenCalled();
  });
});
