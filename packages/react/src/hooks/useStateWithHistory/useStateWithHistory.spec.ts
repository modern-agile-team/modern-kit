import { describe, it, expect } from 'vitest';
import { useStateWithHistory } from '.';
import { renderHook, waitFor } from '@testing-library/react';

describe('useStateWithHistory', () => {
  describe('기본 기능', () => {
    it('기본 기능이 정상적으로 동작해야 합니다', async () => {
      const { result } = renderHook(() => useStateWithHistory(0));

      const { push, undo, redo, goToIndex } = result.current;

      expect(result.current.state).toBe(0);

      // history: [0, 1]
      await waitFor(() => push(1));

      // history: [0, 1, 2]
      await waitFor(() => push(2));

      // history: [0, 1, 2, 3]
      await waitFor(() => push(3));

      expect(result.current.state).toBe(3);

      await waitFor(() => undo());
      expect(result.current.state).toBe(2);

      await waitFor(() => redo());
      expect(result.current.state).toBe(3);

      await waitFor(() => goToIndex(0));
      expect(result.current.state).toBe(0);
    });

    it('capacity를 설정할 수 있어야 합니다', async () => {
      const { result } = renderHook(() => useStateWithHistory(0, 3));

      const { push, goToIndex } = result.current;

      // history: [0, 1]
      await waitFor(() => push(1));

      // history: [0, 1, 2]
      await waitFor(() => push(2));

      // history: [1, 2, 3]
      await waitFor(() => push(3));

      expect(result.current.state).toBe(3);

      await waitFor(() => goToIndex(0));

      expect(result.current.state).toBe(1);

      await waitFor(() => goToIndex(2));

      expect(result.current.state).toBe(3);
    });
  });

  describe('에러 케이스', () => {
    it('더 이상 실행 취소할 수 없을 때 에러가 발생해야 합니다', async () => {
      const { result } = renderHook(() => useStateWithHistory(0));

      const { push, undo } = result.current;

      // history: [0, 1]
      await waitFor(() => push(1));

      expect(result.current.state).toBe(1);

      await waitFor(() => undo());

      expect(result.current.state).toBe(0);

      expect(() => undo()).toThrow('더 이상 실행 취소할 수 없습니다');
    });

    it('더 이상 다시 실행할 수 없을 때 에러가 발생해야 합니다', async () => {
      const { result } = renderHook(() => useStateWithHistory(0));

      const { push, redo, undo } = result.current;

      // history: [0, 1]
      await waitFor(() => push(1));

      expect(result.current.state).toBe(1);

      await waitFor(() => undo());

      expect(result.current.state).toBe(0);

      await waitFor(() => redo());

      expect(result.current.state).toBe(1);

      expect(() => redo()).toThrow('더 이상 다시 실행할 수 없습니다');
    });

    it('유효하지 않은 인덱스로 이동 시 에러가 발생해야 합니다', () => {
      const { result } = renderHook(() => useStateWithHistory(0));

      // history: [0]
      expect(() => result.current.goToIndex(1)).toThrow();
    });
  });
});
