import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useArrayState } from '.';

describe('useArrayState', () => {
  it('초기값이 설정되어야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const [array] = result.current;

    expect(array).toEqual([1, 2, 3]);
  });

  it('초기값이 함수일 경우 함수를 호출하여 초기값을 설정해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState(() => [1, 2, 3]));
    const [array] = result.current;

    expect(array).toEqual([1, 2, 3]);
  });

  it('setArray 직접 호출로 배열을 변경해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray([4]));

    expect(result.current[0]).toEqual([4]);
  });

  it('setArray.push 메서드로 아이템을 추가해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState<number>([]));
    const setArray = result.current[1];

    await waitFor(() => setArray.push(4, 3));

    expect(result.current[0]).toEqual([4, 3]);
  });

  it('setArray.unshift 메서드로 아이템을 추가해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState<number>([3, 4]));
    const setArray = result.current[1];

    await waitFor(() => setArray.unshift(1, 2));

    expect(result.current[0]).toEqual([1, 2, 3, 4]);
  });

  it('setArray.pop 메서드로 마지막 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray.pop());

    expect(result.current[0]).toEqual([1, 2]);
  });

  it('setArray.shift 메서드로 첫번째 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray.shift());

    expect(result.current[0]).toEqual([2, 3]);
  });

  it('setArray.splice 메서드로 특정 인덱스의 아이템을 제거하고 추가해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray.splice(1, 1, 4, 5));

    expect(result.current[0]).toEqual([1, 4, 5, 3]);
  });

  it('setArray.remove 메서드로 특정 인덱스의 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray.remove(1, 2));

    expect(result.current[0]).toEqual([1]);
  });

  it('setArray.removeAt 메서드로 특정 인덱스의 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray.removeAt(1));

    expect(result.current[0]).toEqual([1, 3]);
  });

  it('setArray.removeBy 메서드는 predicate 함수를 통해 배열의 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray.removeBy((_, index) => index > 0));

    expect(result.current[0]).toEqual([1]);
  });

  it('setArray.clear 메서드로 모든 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray.clear());

    expect(result.current[0]).toEqual([]);
  });

  it('setArray.updateAt 메서드로 특정 인덱스의 아이템을 변경해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray.updateAt(1, 5));

    expect(result.current[0]).toEqual([1, 5, 3]);
  });

  it('setArray.updateBy 메서드는 iteratee 함수를 통해 배열의 모든 아이템을 변경해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    await waitFor(() =>
      setArray.updateBy((item, index) => {
        if (index > 0) {
          return item + 1;
        }
        return item;
      })
    );

    expect(result.current[0]).toEqual([1, 3, 4]);
  });

  it('setArray.insertAt 메서드로 특정 인덱스에 아이템을 삽입해야 합니다', async () => {
    const { result } = renderHook(() => useArrayState([1, 3]));
    const setArray = result.current[1];

    await waitFor(() => setArray.insertAt(1, 2));

    expect(result.current[0]).toEqual([1, 2, 3]);
  });
});
