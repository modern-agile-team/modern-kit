import { describe, it, expect } from 'vitest';
import { useStateWithHistory } from '.';
import { renderHook, waitFor } from '@testing-library/react';

describe('useStateWithHistory', () => {
  it('기본 기능이 정상적으로 동작해야 합니다', async () => {
    const { result } = renderHook(() => useStateWithHistory(0));

    const { setState, back, forward, goToIndex } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    await waitFor(() => setState(1));
    // history: [0, 1, 2]
    await waitFor(() => setState(2));
    // history: [0, 1, 2, 3]
    await waitFor(() => setState(3));

    expect(result.current.state).toBe(3);

    await waitFor(() => back());
    expect(result.current.state).toBe(2);

    await waitFor(() => forward());
    expect(result.current.state).toBe(3);

    await waitFor(() => goToIndex(0));
    expect(result.current.state).toBe(0);

    await waitFor(() => goToIndex(-1));
    expect(result.current.state).toBe(3);
  });

  it('capacity를 설정할 수 있어야 합니다', async () => {
    const { result } = renderHook(() => useStateWithHistory(0, 3));

    const { setState, goToIndex } = result.current;

    // history: [0, 1]
    await waitFor(() => setState(1));
    // history: [0, 1, 2]
    await waitFor(() => setState(2));
    // history: [1, 2, 3]
    await waitFor(() => setState(3));

    expect(result.current.state).toBe(3);

    await waitFor(() => goToIndex(0));

    expect(result.current.state).toBe(1);

    await waitFor(() => goToIndex(2));

    expect(result.current.state).toBe(3);
  });

  it('초기 상태 및 상태 변경 함수를 함수로 전달할 수 있어야 합니다', async () => {
    const { result } = renderHook(() => useStateWithHistory(() => 0));

    const { setState } = result.current;

    expect(result.current.state).toBe(0);

    // history: [0, 1]
    await waitFor(() => setState((prev) => prev + 1));

    expect(result.current.state).toBe(1);
  });

  it('더 이상 실행 취소할 수 없을 때 아무것도 하지 않아야 합니다', async () => {
    const { result } = renderHook(() => useStateWithHistory(0));

    const { setState, back } = result.current;

    // history: [0, 1]
    await waitFor(() => setState(1));

    expect(result.current.state).toBe(1);

    await waitFor(() => back());

    expect(result.current.state).toBe(0);

    await waitFor(() => back());

    expect(result.current.state).toBe(0);
  });

  it('더 이상 다시 실행할 수 없을 때 아무것도 하지 않아야 합니다', async () => {
    const { result } = renderHook(() => useStateWithHistory(0));

    const { setState, forward, back } = result.current;

    // history: [0, 1]
    await waitFor(() => setState(1));

    expect(result.current.state).toBe(1);

    await waitFor(() => back());

    expect(result.current.state).toBe(0);

    await waitFor(() => forward());

    expect(result.current.state).toBe(1);

    await waitFor(() => forward());

    expect(result.current.state).toBe(1);
  });

  it('유효하지 않은 인덱스로 이동 시 아무것도 하지 않아야 합니다', async () => {
    const { result } = renderHook(() => useStateWithHistory(0));

    // history: [0]
    await waitFor(() => result.current.goToIndex(1));

    expect(result.current.state).toBe(0);
  });
});
