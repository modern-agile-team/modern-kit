import { isNumber } from '../../validator/isNumber';
import { delay as delayFn } from '../delay';

interface RetryOptions {
  count?: number;
  delay?: number;
  signal?: AbortSignal;
}

const DEFAULT_RETRY = 3;
const DEFAULT_DELAY = 0;

const getRetryOptions = (options?: number | RetryOptions) => {
  if (isNumber(options)) {
    return { count: options, delay: DEFAULT_DELAY, signal: undefined };
  }

  return {
    count: options?.count ?? DEFAULT_RETRY,
    delay: options?.delay ?? DEFAULT_DELAY,
    signal: options?.signal,
  };
};

/**
 * @description Promise를 반환하는 함수가 실패 시 성공 할 때까지 최대 3회 재시도합니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(fetchData);
 * // fetchData 함수가 실패할 경우 최대 3회 재시도합니다.
 */
export async function retry<T>(func: () => Promise<T>): Promise<T>;

/**
 * @description Promise를 반환하는 함수가 실패 시 성공 할 때까지 주어진 횟수만큼 재시도합니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @param {number} count - 재시도 횟수입니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(fetchData, 5);
 * // fetchData 함수가 실패할 경우 최대 5회 재시도합니다.
 */
export async function retry<T>(
  func: () => Promise<T>,
  count: number
): Promise<T>;

/**
 * @description Promise를 반환하는 함수가 실패 시 성공 할 때까지 주어진 횟수만큼 재시도합니다.
 *
 * 재시도 횟수와 재시도 사이 간격을 설정할 수 있습니다. AbortSignal을 전달하여 재시도 작업을 중단할 수 있습니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @param {RetryOptions} options - 재시도 횟수와 재시도 사이 간격을 설정하는 옵션 객체입니다.
 * @param {number} [options.delay=0] - 재시도 사이 간격을 설정합니다.
 * @param {number} [options.count=3] - 재시도 횟수를 설정합니다.
 * @param {AbortSignal} [options.signal] - 재시도 작업을 중단할 수 있는 AbortSignal을 설정합니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(fetchData, { count: 5, delay: 1000 });
 * // fetchData 함수가 실패할 경우 1초 간격으로 최대 5회 재시도합니다.
 *
 * @example
 * const controller = new AbortController();
 *
 * const data = await retry(fetchData, { count: 5, controller.signal });
 * // controller.abort()가 호출되면 재시도 작업이 중단됩니다.
 */
export async function retry<T>(
  func: () => Promise<T>,
  options: RetryOptions
): Promise<T>;

/**
 * @description Promise를 반환하는 함수가 실패 시 성공 할 때까지 주어진 횟수만큼 재시도합니다.
 *
 * 재시도 횟수와 재시도 사이 간격을 설정할 수 있습니다. AbortSignal을 전달하여 재시도 작업을 중단할 수 있습니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @param {number | RetryOptions} options - 재시도 횟수와 재시도 사이 간격을 설정하는 옵션 객체입니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(fetchData);
 * // fetchData 함수가 실패할 경우 최대 3회 재시도합니다.
 *
 * @example
 * const data = await retry(fetchData, 5);
 * // fetchData 함수가 실패할 경우 최대 5회 재시도합니다.
 *
 * @example
 * const data = await retry(fetchData, { count: 5, delay: 1000 });
 * // fetchData 함수가 실패할 경우 1초 간격으로 최대 5회 재시도합니다.
 *
 * @example
 * const data = await retry(fetchData, { count: 5, controller.signal });
 * // controller.abort()가 호출되면 재시도 작업이 중단됩니다.
 */
export async function retry<T>(
  func: () => Promise<T>,
  options?: number | RetryOptions
): Promise<T> {
  const { count, delay, signal } = getRetryOptions(options);

  let error;

  for (let i = 0; i < count; i++) {
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
