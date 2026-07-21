import { isNumber } from '../../validator/isNumber';
import { isFunction } from '../../validator/isFunction';
import { delay as delayFn } from '../delay';

type RetryDelay = number | ((attempt: number, error: unknown) => number);

interface RetryOptions {
  count?: number;
  delay?: RetryDelay;
  signal?: AbortSignal;
  shouldRetry?: ((error: unknown, attempt: number) => boolean) | boolean;
}

const DEFAULT_RETRY = 0;
const DEFAULT_DELAY = 0;

const formatRetryOptions = (options?: number | RetryOptions) => {
  if (isNumber(options)) {
    return {
      count: options,
      delay: undefined,
      signal: undefined,
      shouldRetry: undefined,
    };
  }

  return {
    count: options?.count ?? DEFAULT_RETRY,
    delay: options?.delay,
    signal: options?.signal,
    shouldRetry: options?.shouldRetry,
  };
};

/**
 * @description 재시도 사이의 대기 시간(밀리초)을 계산합니다.
 *
 * `delay`가 숫자면 해당 값으로 고정된 간격을 사용하고, 함수면 `attempt`(0부터 시작)와 발생한 에러를 인자로 받아
 * 반환하는 값을 대기 시간으로 사용합니다. `delay`가 주어지지 않으면 지연 없이(0ms) 즉시 재시도합니다.
 *
 * @param {RetryDelay | undefined} delay - 대기 시간(ms) 또는 대기 시간을 계산하는 함수입니다.
 * @param {number} attempt - 0부터 시작하는 시도 인덱스입니다.
 * @param {unknown} error - 이번 시도에서 발생한 에러입니다.
 * @returns {number} - 대기 시간(밀리초)입니다.
 */
const getDelayTime = (
  delay: RetryDelay | undefined,
  attempt: number,
  error: unknown
): number => {
  if (isNumber(delay)) {
    return delay;
  }

  if (isFunction(delay)) {
    return delay(attempt, error);
  }

  return DEFAULT_DELAY;
};

/**
 * @description Promise를 반환하는 함수가 실패 시 성공할 때까지 재시도합니다.
 *
 * 별도의 옵션을 전달하지 않으면 지연 없이(0ms) 1회만 시도합니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(asyncFn);
 * // asyncFn 함수가 실패해도 재시도하지 않고 즉시 에러를 던집니다.
 */
export async function retry<T>(func: () => Promise<T>): Promise<T>;

/**
 * @description Promise를 반환하는 함수가 실패 시 성공할 때까지 주어진 횟수만큼 재시도합니다.
 *
 * 재시도 사이에는 지연 없이(0ms) 즉시 다시 시도합니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @param {number} count - 재시도 횟수입니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(asyncFn, 5);
 * // asyncFn 함수가 실패할 경우 지연 없이 최대 5회 재시도합니다.
 */
export async function retry<T>(
  func: () => Promise<T>,
  count: number
): Promise<T>;

/**
 * @description Promise를 반환하는 함수가 실패 시 성공할 때까지 주어진 옵션에 따라 재시도합니다.
 *
 * `delay`는 숫자 또는 함수로 지정할 수 있습니다.
 * - 숫자: 해당 값(ms)만큼 **고정된 간격**으로 대기합니다.
 * - 함수: `(attempt, error) => number` 형태로, 시도 인덱스(0부터 시작)와 발생한 에러를 받아 대기 시간(ms)을 반환합니다.
 *   지수 백오프처럼 매 시도마다 다른 대기 시간이 필요할 때 사용합니다.
 *
 * `signal`을 전달하면 재시도 작업을 중단할 수 있습니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @param {RetryOptions} options - 재시도 옵션 객체입니다.
 * @param {number | ((attempt: number, error: unknown) => number)} [options.delay=0] - 재시도 사이의 대기 시간(ms)이거나, 대기 시간을 계산하는 함수입니다.
 * @param {number} [options.count=0] - 재시도 횟수를 설정합니다.
 * @param {((error: unknown, attempt: number) => boolean) | boolean} [options.shouldRetry=true] - 재시도 여부를 결정합니다. 함수를 전달하면 발생한 에러와 현재 시도 인덱스(`attempt`, 0부터 시작)를 인자로 받아 `boolean`을 반환하며, `false`(또는 `false` 반환) 시 재시도하지 않고 즉시 에러를 던집니다.
 * @param {AbortSignal} [options.signal] - 재시도 작업을 중단할 수 있는 AbortSignal을 설정합니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(asyncFn, { count: 5, delay: 1000 });
 * // asyncFn 함수가 실패할 경우 1초(1000ms) 간격으로 최대 5회 재시도합니다.
 *
 * @example
 * const data = await retry(asyncFn, {
 *   count: 5,
 *   delay: (attempt) => 300 * 2 ** attempt,
 * });
 * // 300ms, 600ms, 1200ms... 지수 백오프 간격으로 최대 5회 재시도합니다.
 *
 * @example
 * const data = await retry(asyncFn, { delay: 1000, shouldRetry: isRetryable });
 * // isRetryable가 false를 반환하는 에러는 재시도하지 않고 즉시 던집니다.
 *
 * @example
 * const controller = new AbortController();
 *
 * const data = await retry(asyncFn, { delay: 1000, signal: controller.signal });
 * // controller.abort()가 호출되면 재시도 작업이 중단됩니다.
 */
export async function retry<T>(
  func: () => Promise<T>,
  options: RetryOptions
): Promise<T>;

export async function retry<T>(
  func: () => Promise<T>,
  options?: number | RetryOptions
): Promise<T> {
  const { count, delay, signal, shouldRetry } = formatRetryOptions(options);

  let error;

  for (let attempt = 0; attempt <= count; attempt++) {
    if (signal?.aborted) {
      throw new Error('aborted로 인해 재시도 작업이 중단되었습니다.');
    }

    try {
      return await func();
    } catch (err) {
      error = err;

      const _shouldRetry = isFunction(shouldRetry)
        ? shouldRetry(err, attempt)
        : (shouldRetry ?? true);

      if (!_shouldRetry) {
        throw err;
      }

      if (attempt < count) {
        await delayFn(getDelayTime(delay, attempt, err));
      }
    }
  }

  throw error;
}
