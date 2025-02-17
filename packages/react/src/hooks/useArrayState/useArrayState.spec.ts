import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useArrayState } from '.';

describe('useArrayState', () => {
  it('초기값이 설정되어야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));

    await waitFor(() => {
      expect(result.current.data).toEqual([1, 2, 3]);
    });
  });

  it('push 메서드로 아이템을 추가해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState<number>([]));
    result.current.push(4);

    await waitFor(() => {
      expect(result.current.data).toEqual([4]);
    });
  });

  it('unshift 메서드로 아이템을 추가해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState<number>([2, 3]));
    result.current.unshift(1);

    await waitFor(() => {
      expect(result.current.data).toEqual([1, 2, 3]);
    });
  });

  it('pop 메서드로 마지막 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    result.current.pop();

    await waitFor(() => {
      expect(result.current.data).toEqual([1, 2]);
    });
  });

  it('shift 메서드로 첫번째 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    result.current.shift();

    await waitFor(() => {
      expect(result.current.data).toEqual([2, 3]);
    });
  });

  it('remove 메서드로 특정 인덱스의 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    result.current.remove(1);

    await waitFor(() => {
      expect(result.current.data).toEqual([1, 3]);
    });

    await waitFor(() => {
      expect(() => result.current.remove(6)).toThrow(
        '인덱스가 범위를 벗어났습니다'
      );
    });
  });

  it('multiRemove 메서드로 여러 인덱스의 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    result.current.multiRemove([1, 2]);

    await waitFor(() => {
      expect(result.current.data).toEqual([1]);
    });

    await waitFor(() => {
      expect(() => result.current.multiRemove([6, 7])).toThrow(
        '인덱스가 범위를 벗어났습니다'
      );
    });
  });

  it('clear 메서드로 모든 아이템을 제거해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    result.current.clear();

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });

  it('update 메서드로 특정 인덱스의 아이템을 변경해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    result.current.update(1, 5);

    await waitFor(() => {
      expect(result.current.data).toEqual([1, 5, 3]);
    });

    await waitFor(() => {
      expect(() => result.current.update(6, 5)).toThrow(
        '인덱스가 범위를 벗어났습니다'
      );
    });
  });

  it('multiUpdate 메서드로 여러 인덱스의 아이템을 변경해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    result.current.multiUpdate([
      { index: 1, item: 5 },
      { index: 2, item: 6 },
    ]);

    await waitFor(() => {
      expect(result.current.data).toEqual([1, 5, 6]);
    });
  });

  it('insert 메서드로 특정 인덱스에 아이템을 삽입해야 합니다.', async () => {
    const { result } = renderHook(() => useArrayState([1, 3]));
    result.current.insert(1, 2);

    await waitFor(() => {
      expect(result.current.data).toEqual([1, 2, 3]);
    });

    await waitFor(() => {
      expect(() => result.current.insert(6, 5)).toThrow(
        '인덱스가 범위를 벗어났습니다'
      );
    });
  });
});
