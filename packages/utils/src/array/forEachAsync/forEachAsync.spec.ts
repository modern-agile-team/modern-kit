import { describe, it, expect } from 'vitest';
import { forEachAsync } from '.';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('forEachAsync', () => {
  describe('순차 실행', () => {
    it('이전 요소의 콜백이 완료된 뒤에 다음 요소의 콜백을 호출해야 합니다', async () => {
      const executionOrder: number[] = [];

      await forEachAsync([30, 20, 10], async (ms) => {
        await delay(ms);
        executionOrder.push(ms);
      });

      expect(executionOrder).toEqual([30, 20, 10]);
    });

    it('이전 콜백이 끝나기 전에 다음 콜백을 호출하지 않아야 합니다', async () => {
      let running = false;
      let overlapped = false;

      await forEachAsync([1, 2, 3], async () => {
        if (running) {
          overlapped = true;
        }

        running = true;
        await delay(10);
        running = false;
      });

      expect(overlapped).toBe(false);
    });

    it('모든 요소의 비동기 작업이 끝난 뒤에 resolve 되어야 합니다', async () => {
      const completed: number[] = [];

      await forEachAsync([1, 2, 3], async (value) => {
        await delay(10);
        completed.push(value);
      });

      expect(completed).toEqual([1, 2, 3]);
    });

    it('동기 callback도 처리할 수 있어야 합니다', async () => {
      const result: number[] = [];

      await forEachAsync([1, 2, 3], (value) => {
        result.push(value * 2);
      });

      expect(result).toEqual([2, 4, 6]);
    });

    it('callback에서 에러가 발생하면 남은 요소를 처리하지 않고 reject 되어야 합니다', async () => {
      const visited: number[] = [];

      await expect(
        forEachAsync([1, 2, 3], async (value) => {
          visited.push(value);

          if (value === 2) {
            throw new Error('실패');
          }
        })
      ).rejects.toThrow('실패');

      expect(visited).toEqual([1, 2]);
    });
  });

  describe('병렬 실행', () => {
    it('각 요소의 콜백을 병렬로 실행해야 합니다', async () => {
      const executionOrder: number[] = [];

      await forEachAsync(
        [15, 30, 20, 10],
        async (ms) => {
          await delay(ms);
          executionOrder.push(ms);
        },
        { parallel: true }
      );

      expect(executionOrder).toEqual([10, 15, 20, 30]);
    });
  });
});
