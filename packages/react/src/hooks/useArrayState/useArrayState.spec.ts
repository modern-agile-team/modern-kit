import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useArrayState } from '.';

describe('useArrayState', () => {
  it('초기값이 설정되어야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const [array] = result.current;

    await waitFor(() => {
      expect(array).toEqual([1, 2, 3]);
    });
  });

  it('초기값이 함수일 경우 함수를 호출하여 초기값을 설정해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState(() => [1, 2, 3]));
    const [array] = result.current;

    await waitFor(() => {
      expect(array).toEqual([1, 2, 3]);
    });
  });

  it('setArray 직접 호출로 배열을 변경해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray([4]);

    await waitFor(() => {
      expect(result.current[0]).toEqual([4]);
    });
  });

  it('setArray.push 메서드로 아이템을 추가해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState<number>([]));
    const setArray = result.current[1];

    setArray.push(4, 3);

    await waitFor(() => {
      expect(result.current[0]).toEqual([4, 3]);
    });
  });

  it('setArray.unshift 메서드로 아이템을 추가해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState<number>([3, 4]));
    const setArray = result.current[1];

    setArray.unshift(1, 2);

    await waitFor(() => {
      expect(result.current[0]).toEqual([1, 2, 3, 4]);
    });
  });

  it('setArray.pop 메서드로 마지막 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray.pop();

    await waitFor(() => {
      expect(result.current[0]).toEqual([1, 2]);
    });
  });

  it('setArray.shift 메서드로 첫번째 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray.shift();

    await waitFor(() => {
      expect(result.current[0]).toEqual([2, 3]);
    });
  });

  it('setArray.splice 메서드로 특정 인덱스의 아이템을 제거하고 추가해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray.splice(1, 1, 4, 5);

    await waitFor(() => {
      expect(result.current[0]).toEqual([1, 4, 5, 3]);
    });
  });

  it('setArray.remove 메서드로 특정 인덱스의 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray.remove(1, 2);

    await waitFor(() => {
      expect(result.current[0]).toEqual([1]);
    });
  });

  it('setArray.removeAt 메서드로 특정 인덱스의 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray.removeAt(1);

    await waitFor(() => {
      expect(result.current[0]).toEqual([1, 3]);
    });
  });

  it('setArray.removeBy 메서드는 predicate 함수를 통해 배열의 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray.removeBy((_, index) => index > 0);

    await waitFor(() => {
      expect(result.current[0]).toEqual([1]);
    });
  });

  it('setArray.clear 메서드로 모든 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray.clear();

    await waitFor(() => {
      expect(result.current[0]).toEqual([]);
    });
  });

  it('setArray.updateAt 메서드로 특정 인덱스의 아이템을 변경해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray.updateAt(1, 5);

    await waitFor(() => {
      expect(result.current[0]).toEqual([1, 5, 3]);
    });
  });

  it('setArray.updateBy 메서드는 iteratee 함수를 통해 배열의 모든 아이템을 변경해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    const setArray = result.current[1];

    setArray.updateBy((item, index) => {
      if (index > 0) {
        return item + 1;
      }
      return item;
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual([1, 3, 4]);
    });
  });

  it('setArray.insertAt 메서드로 특정 인덱스에 아이템을 삽입해야 합니다', async () => {
    const { result } = renderHook(() => useArrayState([1, 3]));
    const setArray = result.current[1];

    setArray.insertAt(1, 2);

    await waitFor(() => {
      expect(result.current[0]).toEqual([1, 2, 3]);
    });
  });
});
