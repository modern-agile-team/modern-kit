import { delay as delayFn } from '../delay';

interface RetryOptions {
  retry?: number;
  delay?: number;
  signal?: AbortSignal | undefined;
}

const DEFAULT_RETRY = 3;
const DEFAULT_DELAY = 0;

/**
 * @description Promise를 반환하는 함수가 성공할 때까지 다시 시도하는 함수입니다.
 *
 * 재시도 횟수와 재시도 사이 간격을 설정할 수 있습니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @param {number | RetryOptions} options - 재시도 횟수와 재시도 사이 간격을 설정합니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(fetchData, 5);
 * // fetchData 함수가 성공할 때까지 최대 5번 재시도합니다.
 *
 * const data = await retry(fetchData, { retry: 5, delay: 1000 });
 * // fetchData 함수가 실패할 경우 1초 간격으로 최대 5번 재시도합니다.
 *
 * const controller = new AbortController();
 *
 * const data = await retry(fetchData, { retry: 5, controller.signal });
 * // controller.abort()가 호출되면 재시도 작업이 중단됩니다.
 */

export async function retry<T>(
  func: () => Promise<T>,
  options?: number | RetryOptions
): Promise<T> {
  let retry: number;
  let delay: number;
  let signal: AbortSignal | undefined;

  if (typeof options === 'number') {
    retry = options;
    delay = DEFAULT_DELAY;
  } else {
    retry = options?.retry ?? DEFAULT_RETRY;
    delay = options?.delay ?? DEFAULT_DELAY;
    signal = options?.signal;
  }

  let error;

  for (let i = 0; i < retry; i++) {
    if (signal?.aborted) {
      throw new Error('aborted로 인해 재시도 작업이 중단되었습니다.');
    }

    try {
      return await func();
    } catch (err) {
      error = err;
      await delayFn(delay);
    }
  }

  throw error;
}
