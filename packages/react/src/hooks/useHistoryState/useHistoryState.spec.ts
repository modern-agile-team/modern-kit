import { describe, it, expect } from 'vitest';
import { useHistoryState } from '.';
import { renderHook, waitFor } from '@testing-library/react';

describe('useHistoryState', () => {
  it('기본 기능이 정상적으로 동작해야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0));

    const { setState, replaceState, back, forward, go } = result.current;

    // history: [0, 1]
    setState(1)
    await waitFor(() => expect(result.current.state).toBe(1));

    // history: [0, 1, 2]
    setState(2)
    await waitFor(() => expect(result.current.state).toBe(2));

    // history: [0, 1, 4]
    replaceState(4)
    await waitFor(() => expect(result.current.state).toBe(4));

    back()
    await waitFor(() => expect(result.current.state).toBe(1));

    forward()
    await waitFor(() => expect(result.current.state).toBe(4));

    go(0)
    await waitFor(() => expect(result.current.state).toBe(0));
  });

  it('capacity를 설정할 수 있어야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0, 3));

    const { setState, go } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    setState(1)
    await waitFor(() => expect(result.current.state).toBe(1));

    // history: [0, 1, 2]
    setState(2)
    await waitFor(() => expect(result.current.state).toBe(2));

    // history: [1, 2, 3]
    setState(3)
    await waitFor(() => expect(result.current.state).toBe(3));

    go(0)
    await waitFor(() => expect(result.current.state).toBe(1));

    go(-1)
    await waitFor(() => expect(result.current.state).toBe(3));
  });

  it('초기 상태 및 상태 변경 함수를 함수로 전달할 수 있어야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(() => 0));

    const { setState } = result.current;

    expect(result.current.state).toBe(0);

    setState((prev) => prev + 1)
    // history: [0, 1]
    await waitFor(() => expect(result.current.state).toBe(1));
  });

  it('더 이상 뒤로 갈 수 없을 때 현재 상태를 유지하며 canBack을 false로 설정해야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0));

    const { setState, back } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    setState(1)
    await waitFor(() => expect(result.current.state).toBe(1));

    back()
    await waitFor(() => expect(result.current.state).toBe(0));

    back()
    await waitFor(() => expect(result.current.state).toBe(0));
  });

  it('더 이상 앞으로 갈 수 없을 때 현재 상태를 유지하며 canForward을 false로 설정해야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0));

    const { setState, forward, back } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    setState(1)
    await waitFor(() => {
      expect(result.current.state).toBe(1);
      expect(result.current.canForward).toBeFalsy();
    });


    back()
    await waitFor(() => {
      expect(result.current.state).toBe(0);
      expect(result.current.canForward).toBeTruthy();
    });

    forward()
    await waitFor(() => {
      expect(result.current.state).toBe(1);
      expect(result.current.canForward).toBeFalsy();
    });
  });

  it('유효하지 않은 인덱스로 이동 시 아무것도 하지 않아야 합니다', async () => {
    const { result } = renderHook(() => useHistoryState(0));
    const { go } = result.current;

    // history: [0]
    go(1)
    await waitFor(() => {
      expect(result.current.state).toBe(0);
    });
  });
});
