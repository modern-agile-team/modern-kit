import { describe, it, expect } from 'vitest';
import { useHistoryState } from '.';
import { renderHook, waitFor } from '@testing-library/react';

describe('useHistoryState', () => {
  it('기본 기능이 정상적으로 동작해야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0));

    const { setState, replaceState, back, forward, go } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    await waitFor(() => setState(1));
    expect(result.current.state).toBe(1);

    // history: [0, 1, 2]
    await waitFor(() => setState(2));
    expect(result.current.state).toBe(2);

    // history: [0, 1, 4]
    await waitFor(() => replaceState(4));
    expect(result.current.state).toBe(4);

    await waitFor(() => back());
    expect(result.current.state).toBe(1);

    await waitFor(() => forward());
    expect(result.current.state).toBe(4);

    await waitFor(() => go(0));
    expect(result.current.state).toBe(0);

    await waitFor(() => go(-1));
    expect(result.current.state).toBe(4);
  });

  it('capacity를 설정할 수 있어야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0, 3));

    const { setState, go } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    await waitFor(() => setState(1));
    expect(result.current.state).toBe(1);

    // history: [0, 1, 2]
    await waitFor(() => setState(2));
    expect(result.current.state).toBe(2);

    // history: [1, 2, 3]
    await waitFor(() => setState(3));
    expect(result.current.state).toBe(3);

    await waitFor(() => go(0)); // 첫 번째 상태로 이동
    expect(result.current.state).toBe(1);

    await waitFor(() => go(-1)); // 마지막 상태로 이동
    expect(result.current.state).toBe(3);
  });

  it('초기 상태 및 상태 변경 함수를 함수로 전달할 수 있어야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(() => 0));

    const { setState } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    await waitFor(() => setState((prev) => prev + 1));
    expect(result.current.state).toBe(1);
  });

  it('더 이상 뒤로 갈 수 없을 때 현재 상태를 유지하며 canBack을 false로 설정해야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0));

    const { setState, back } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    await waitFor(() => setState(1));
    expect(result.current.state).toBe(1);
    expect(result.current.canBack).toBeTruthy();

    await waitFor(() => back());
    expect(result.current.state).toBe(0);
    expect(result.current.canBack).toBeFalsy();

    await waitFor(() => back()); // 아무런 변화가 없어야 함
    expect(result.current.state).toBe(0);
    expect(result.current.canBack).toBeFalsy();
  });

  it('더 이상 앞으로 갈 수 없을 때 현재 상태를 유지하며 canForward을 false로 설정해야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0));

    const { setState, forward, back } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    await waitFor(() => setState(1));
    expect(result.current.state).toBe(1);
    expect(result.current.canForward).toBeFalsy();

    await waitFor(() => back());
    expect(result.current.state).toBe(0);
    expect(result.current.canForward).toBeTruthy();

    await waitFor(() => forward());
    expect(result.current.state).toBe(1);
    expect(result.current.canForward).toBeFalsy();

    await waitFor(() => forward()); // 아무런 변화가 없어야 함
    expect(result.current.state).toBe(1);
    expect(result.current.canForward).toBeFalsy();
  });

  it('유효하지 않은 인덱스로 이동 시 아무것도 하지 않아야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0));
    const { go } = result.current;

    // history: [0]
    await waitFor(() => go(1));
    expect(result.current.state).toBe(0);
  });
});
