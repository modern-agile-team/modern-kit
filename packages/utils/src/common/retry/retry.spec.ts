import { describe, expect, it, vi } from 'vitest';
import { retry } from '.';

describe('retry', () => {
  it('지정된 retry만큼 다시 시도하고 결국 해결해야 합니다.', async () => {
    const mockFn = vi
      .fn()
      .mockRejectedValueOnce(new Error('failure'))
      .mockRejectedValueOnce(new Error('failure'))
      .mockResolvedValue('success');

    const result = await retry(mockFn, 3);

    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('지정된 retry만큼 다시 시도후 결국 실패한다면 error를 throw 해야합니다.', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('failure'));

    await expect(retry(mockFn, 3)).rejects.toThrow('failure');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('지정된 delay만큼 시간을 지연하고 다시 시도해야 합니다.', async () => {
    const mockFn = vi
      .fn()
      .mockRejectedValueOnce(new Error('failure'))
      .mockRejectedValueOnce(new Error('failure'))
      .mockResolvedValue('success');

    const start = Date.now();
    const result = await retry(mockFn, { retry: 3, delay: 100 });
    const end = Date.now();

    expect(result).toBe('success');
    expect(end - start).toBeGreaterThanOrEqual(200);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('지정된 signal로 중단되어야 합니다.', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('failure'));
    const controller = new AbortController();

    controller.abort();

    await expect(
      retry(mockFn, { retry: 3, signal: controller.signal })
    ).rejects.toThrow('aborted로 인해 재시도 작업이 중단되었습니다.');
    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
