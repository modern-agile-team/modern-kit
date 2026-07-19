import { isNumber } from '../../validator/isNumber';
import { isFunction } from '../../validator/isFunction';
import { delay as delayFn } from '../delay';

interface RetryOptionsBase {
  count: number;
  signal?: AbortSignal;
  shouldRetry?: ((error: unknown) => boolean) | boolean;
}

interface RetryOptionsWithDelay extends RetryOptionsBase {
  delay: number;
}

interface RetryOptionsWithBackoff extends RetryOptionsBase {
  backoff: number;
}

type RetryOptions = Partial<RetryOptionsWithDelay> &
  Partial<RetryOptionsWithBackoff>;

const DEFAULT_RETRY = 0;
const DEFAULT_DELAY = 0;

const formatRetryOptions = (options?: number | RetryOptions) => {
  if (isNumber(options)) {
    return {
      count: options,
      delay: undefined,
      backoff: undefined,
      signal: undefined,
      shouldRetry: undefined,
    };
  }

  return {
    count: options?.count ?? DEFAULT_RETRY,
    delay: options?.delay,
    backoff: options?.backoff,
    signal: options?.signal,
    shouldRetry: options?.shouldRetry,
  };
};

/**
 * @description 재시도 사이의 대기 시간(밀리초)을 계산합니다.
 *
 * `delay`가 주어지면 해당 값으로 고정된 간격을 사용하고, `backoff`가 주어지면 `backoff * 2 ** count` 형태의
 * 지수 백오프를 사용합니다. 둘 다 주어지지 않으면 지연 없이(0ms) 즉시 재시도합니다.
 *
 * @param {number | undefined} delay - 고정 대기 시간입니다.
 * @param {number | undefined} backoff - 지수 백오프의 시작 대기 시간(밀리초)입니다.
 * @param {number} count - 재시도 횟수입니다.
 * @returns {number} - 대기 시간(밀리초)입니다.
 */
const getDelayTime = (
  delay: number | undefined,
  backoff: number | undefined,
  count: number
): number => {
  if (isNumber(delay)) {
    return delay;
  }

  if (isNumber(backoff)) {
    return backoff * 2 ** count;
  }

  return DEFAULT_DELAY;
};

/**
 * @description Promise를 반환하는 함수가 실패 시 성공할 때까지 재시도합니다.
 *
 * 별도의 옵션을 전달하지 않으면 지연 없이(0ms) 최대 3회 재시도합니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(asyncFn);
 * // asyncFn 함수가 실패할 경우 지연 없이 최대 3회 재시도합니다.
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
 * @description Promise를 반환하는 함수가 실패 시 성공할 때까지 **고정된 간격**으로 재시도합니다.
 *
 * 재시도 사이의 간격은 `delay`(밀리초)로 동일하게 유지됩니다.
 * `signal`을 전달하면 재시도 작업을 중단할 수 있습니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @param {RetryOptionsWithDelay} options - 고정 간격 재시도 옵션 객체입니다.
 * @param {number} options.delay - 재시도 사이의 고정 간격(밀리초)입니다.
 * @param {number} [options.count=3] - 재시도 횟수를 설정합니다.
 * @param {((error: unknown) => boolean) | boolean} [options.shouldRetry=true] - 재시도 여부를 결정합니다. 함수를 전달하면 발생한 에러를 인자로 받아 `boolean`을 반환하며, `false`(또는 `false` 반환) 시 재시도하지 않고 즉시 에러를 던집니다.
 * @param {AbortSignal} [options.signal] - 재시도 작업을 중단할 수 있는 AbortSignal을 설정합니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(asyncFn, { count: 5, delay: 1000 });
 * // asyncFn 함수가 실패할 경우 1초(1000ms) 간격으로 최대 5회 재시도합니다.
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
  options: RetryOptionsWithDelay
): Promise<T>;

/**
 * @description Promise를 반환하는 함수가 실패 시 성공할 때까지 **지수 백오프 간격**으로 재시도합니다.
 *
 * 재시도 사이의 간격은 `backoff`(밀리초)에서 시작해 매 시도마다 2배씩 증가합니다.
 * `signal`을 전달하면 재시도 작업을 중단할 수 있습니다.
 *
 * @template T - Promise가 반환하는 값의 타입입니다.
 * @param {() => Promise<T>} func - Promise를 반환하는 함수입니다.
 * @param {RetryOptionsWithBackoff} options - 지수 백오프 재시도 옵션 객체입니다.
 * @param {number} options.backoff - 지수 백오프의 시작 간격(밀리초)입니다. 매 시도마다 2배씩 증가합니다.
 * @param {number} [options.count=3] - 재시도 횟수를 설정합니다.
 * @param {((error: unknown) => boolean) | boolean} [options.shouldRetry=true] - 재시도 여부를 결정합니다. 함수를 전달하면 발생한 에러를 인자로 받아 `boolean`을 반환하며, `false`(또는 `false` 반환) 시 재시도하지 않고 즉시 에러를 던집니다.
 * @param {AbortSignal} [options.signal] - 재시도 작업을 중단할 수 있는 AbortSignal을 설정합니다.
 * @returns {Promise<T>} - Promise를 반환하는 함수의 결과를 반환합니다.
 *
 * @example
 * const data = await retry(asyncFn, { count: 5, backoff: 300 });
 * // 300ms, 600ms, 1200ms... 지수 백오프 간격으로 최대 5회 재시도합니다.
 *
 * @example
 * const data = await retry(asyncFn, { backoff: 300, shouldRetry: isRetryable });
 * // isRetryable가 false를 반환하는 에러는 재시도하지 않고 즉시 던집니다.
 *
 * @example
 * const controller = new AbortController();
 *
 * const data = await retry(asyncFn, { backoff: 300, signal: controller.signal });
 * // controller.abort()가 호출되면 재시도 작업이 중단됩니다.
 */
export async function retry<T>(
  func: () => Promise<T>,
  options: RetryOptionsWithBackoff
): Promise<T>;

export async function retry<T>(
  func: () => Promise<T>,
  options?: number | RetryOptions
): Promise<T> {
  const { count, delay, backoff, signal, shouldRetry } =
    formatRetryOptions(options);

  let error;

  for (let i = 0; i <= count; i++) {
    if (signal?.aborted) {
      throw new Error('aborted로 인해 재시도 작업이 중단되었습니다.');
    }

    try {
      return await func();
    } catch (err) {
      error = err;

      const _shouldRetry = isFunction(shouldRetry)
        ? shouldRetry(err)
        : (shouldRetry ?? true);

      if (!_shouldRetry) {
        throw err;
      }

      if (i < count) {
        await delayFn(getDelayTime(delay, backoff, i));
      }
    }
  }

  throw error;
}
