import { afterEach, describe, expect, it, vi } from 'vitest';
import { delay } from '../delay';
import { retry } from '.';

// delay를 모킹하여 실제 지연 없이 호출 인자(대기 시간)만 검증합니다.
vi.mock('../delay', () => ({
  delay: vi.fn(() => Promise.resolve()),
}));

const mockedDelay = vi.mocked(delay);

afterEach(() => {
  vi.clearAllMocks();
});

describe('retry', () => {
  describe('기본 동작', () => {
    it('첫 시도에 성공하면 결과를 반환하고 재시도하지 않아야 합니다.', async () => {
      const func = vi.fn().mockResolvedValue('성공');

      await expect(retry(func)).resolves.toBe('성공');
      expect(func).toHaveBeenCalledTimes(1);
      expect(mockedDelay).not.toHaveBeenCalled();
    });

    it('실패 후 성공하면 성공한 결과를 반환해야 합니다.', async () => {
      const func = vi
        .fn()
        .mockRejectedValueOnce(new Error('첫 번째 실패'))
        .mockResolvedValue('성공');

      await expect(retry(func, 3)).resolves.toBe('성공');

      expect(func).toHaveBeenCalledTimes(2);
    });

    it('모두 실패하면 마지막 에러를 던져야 합니다.', async () => {
      const lastError = new Error('마지막 실패');
      const func = vi
        .fn()
        .mockRejectedValueOnce(new Error('첫 번째 실패'))
        .mockRejectedValueOnce(new Error('두 번째 실패'))
        .mockRejectedValue(lastError);

      await expect(retry(func, 3)).rejects.toBe(lastError);
    });
  });

  describe('count 옵션', () => {
    it('옵션을 전달하지 않으면 기본 1회 시도해야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(retry(func)).rejects.toThrow('실패');

      expect(func).toHaveBeenCalledTimes(1);
    });

    it('숫자 인자로 시도 횟수를 지정할 수 있어야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(retry(func, 5)).rejects.toThrow('실패');
      expect(func).toHaveBeenCalledTimes(6);
    });

    it('options.count로 시도 횟수를 지정할 수 있어야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(retry(func, { count: 2, delay: 0 })).rejects.toThrow('실패');
      expect(func).toHaveBeenCalledTimes(3);
    });
  });

  describe('delay 옵션 (고정 간격)', () => {
    it('실패할 때마다 동일한 간격으로 대기하되, 마지막 시도 후에는 대기하지 않아야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(retry(func, { count: 3, delay: 1000 })).rejects.toThrow(
        '실패'
      );

      const delayTimes = mockedDelay.mock.calls.map(([time]) => time);
      expect(delayTimes).toEqual([1000, 1000, 1000]);
    });
  });

  describe('backoff 옵션 (지수 백오프)', () => {
    it('시작값에서 매 시도마다 2배씩 증가하는 간격으로 대기하되, 마지막 시도 후에는 대기하지 않아야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(retry(func, { count: 4, backoff: 300 })).rejects.toThrow(
        '실패'
      );

      const delayTimes = mockedDelay.mock.calls.map(([time]) => time);
      expect(delayTimes).toEqual([300, 600, 1200, 2400]);
    });
  });

  describe('마지막 시도', () => {
    it('모두 실패하면 마지막 시도 후 대기 없이 즉시 에러를 던져야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(retry(func, { count: 3, delay: 1000 })).rejects.toThrow(
        '실패'
      );

      expect(func).toHaveBeenCalledTimes(4);
      expect(mockedDelay).toHaveBeenCalledTimes(3);
    });

    it('count가 1이면 재시도 없이 대기하지 않고 에러를 던져야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(retry(func, { count: 1, delay: 1000 })).rejects.toThrow(
        '실패'
      );

      expect(func).toHaveBeenCalledTimes(2);
      expect(mockedDelay).toHaveBeenCalledTimes(1);
    });
  });

  describe('shouldRetry 옵션', () => {
    it('shouldRetry에 전달하는 함수가 false를 반환하면 재시도하지 않고 즉시 에러를 던져야 합니다.', async () => {
      const error = new Error('재시도 불가');
      const func = vi.fn().mockRejectedValue(error);
      const shouldRetry = vi.fn().mockReturnValue(false);

      await expect(
        retry(func, { count: 3, delay: 0, shouldRetry })
      ).rejects.toBe(error);

      expect(func).toHaveBeenCalledTimes(1);
      expect(mockedDelay).not.toHaveBeenCalled();
    });

    it('shouldRetry에 전달하는 함수가 true를 반환하면 계속 재시도해야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));
      const shouldRetry = vi.fn().mockReturnValue(true);

      await expect(
        retry(func, { count: 3, delay: 0, shouldRetry })
      ).rejects.toThrow('실패');

      expect(func).toHaveBeenCalledTimes(4);
    });

    it('shouldRetry에 boolean false를 전달하면 재시도하지 않아야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(
        retry(func, { count: 3, delay: 0, shouldRetry: false })
      ).rejects.toThrow('실패');

      expect(func).toHaveBeenCalledTimes(1);
    });

    it('shouldRetry에 boolean true를 전달하면 계속 재시도해야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(
        retry(func, { count: 3, delay: 0, shouldRetry: true })
      ).rejects.toThrow('실패');

      expect(func).toHaveBeenCalledTimes(4);
    });

    it('shouldRetry에 전달하는 함수는 발생한 에러와 옵션을 인자로 받아야 합니다.', async () => {
      const error = new Error('실패');
      const func = vi.fn().mockRejectedValue(error);
      const shouldRetry = vi.fn().mockReturnValue(false);

      await expect(
        retry(func, { count: 3, delay: 0, shouldRetry })
      ).rejects.toBe(error);

      expect(shouldRetry).toHaveBeenCalledWith(error);
    });

    it('shouldRetry를 지정하지 않으면 기본적으로 모두 재시도해야 합니다.', async () => {
      const func = vi.fn().mockRejectedValue(new Error('실패'));

      await expect(retry(func, { count: 3, delay: 0 })).rejects.toThrow('실패');

      expect(func).toHaveBeenCalledTimes(4);
    });
  });

  describe('signal 옵션', () => {
    it('이미 중단된 signal이면 함수를 호출하지 않고 중단해야 합니다.', async () => {
      const controller = new AbortController();
      controller.abort();

      const func = vi.fn().mockResolvedValue('성공');

      await expect(
        retry(func, { count: 3, delay: 0, signal: controller.signal })
      ).rejects.toThrow('aborted로 인해 재시도 작업이 중단되었습니다.');

      expect(func).not.toHaveBeenCalled();
    });

    it('재시도 도중 signal이 중단되면 재시도를 멈춰야 합니다.', async () => {
      const controller = new AbortController();
      const func = vi.fn().mockImplementation(() => {
        controller.abort();

        return Promise.reject(new Error('실패'));
      });

      await expect(
        retry(func, { count: 3, delay: 0, signal: controller.signal })
      ).rejects.toThrow('aborted로 인해 재시도 작업이 중단되었습니다.');

      expect(func).toHaveBeenCalledTimes(1);
    });
  });
});
