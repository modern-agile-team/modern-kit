import { useCallback, useRef, useState } from 'react';

interface UseBlockMultipleAsyncCallsReturnType {
  isError: boolean;
  isLoading: boolean;
  blockMultipleAsyncCalls: <T>(
    callback: () => Promise<T>
  ) => Promise<T | undefined>;
}

/**
 * @description `useBlockMultipleAsyncCalls` 훅은 진행 중인 비동기 호출이 있을 때 중복 호출을 방지하기 위한 커스텀 훅입니다.
 *
 * `debounce`는 함수의 중복 호출을 방지하는 데 대부분의 경우에 효과적입니다.
 * 하지만, debounce는 비동기 작업의 완료를 보장하지 않기 때문에 다음과 같은 한계가 있습니다:
 *
 * 1. `debounce` 시간이 API 응답 시간보다 짧을 경우: 비동기 작업이 완료되지 않은 상태에서 `다시 호출`될 수 있습니다.
 * 2. `debounce` 시간이 API 응답 시간보다 길 경우: 비동기 작업이 완료되었지만 `버튼`과 같은 요소가 여전히 `비활성화`되어 있을 수 있습니다.
 * 3. `즉각적인 반응`을 원하는 경우: `debounce`는 호출을 지연시키기 때문에 사용자에게 `즉각적인 반응`을 보여주기에 제한적입니다.
 *
 * 대부분의 경우에 `debounce`만으로 충분하지만, 위와 같은 한계점을 대응하고자 한다면 `useBlockMultipleAsyncCalls`를 사용할 수 있습니다.
 *
 * @returns {UseBlockMultipleAsyncCallsReturnType} 다음을 포함하는 객체:
 * - `isError`: 비동기 작업 중 에러가 발생했는지 나타내는 불리언 값
 * - `isLoading`: 현재 비동기 작업이 진행 중인지 나타내는 불리언 값
 * - `blockMultipleAsyncCalls`: 비동기 작업을 래핑하여 중복 호출을 방지하는 함수
 *
 * @example
 * ```tsx
 * const Example = () => {
 *   const { isError, isLoading, blockMultipleAsyncCalls } = useBlockMultipleAsyncCalls();
 *
 *   const fetchApi = async () => {
 *     const data = await fetchData();
 *     // 데이터 처리
 *   };
 *
 *   const handleClick = () => {
 *     blockMultipleAsyncCalls(fetchApi);
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleClick} disabled={isLoading}>데이터 불러오기</button>
 *       {isError && <p>에러 발생</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useBlockMultipleAsyncCalls(): UseBlockMultipleAsyncCallsReturnType {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const isCalled = useRef(false);

  const blockMultipleAsyncCalls = useCallback(
    async <T>(callback: () => Promise<T>) => {
      if (isCalled.current) {
        return;
      }

      isCalled.current = true;
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await callback();
        return result;
      } catch (error) {
        setIsError(true);
        throw error;
      } finally {
        isCalled.current = false;
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isError,
    isLoading,
    blockMultipleAsyncCalls,
  };
}
