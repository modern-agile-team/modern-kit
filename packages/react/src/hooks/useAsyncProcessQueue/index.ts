import { useCallback, useState, useRef } from 'react';

type RequestFunction<T> = (...args: any[]) => Promise<T>;

interface UseAsyncProcessQueueOptions {
  keepPreviousData?: boolean;
}

/**
 * @experimental 실험적인 훅으로 추후 변경될 수 있습니다.
 */
export function useAsyncProcessQueue<T = unknown, E = unknown>({
  keepPreviousData = false,
}: UseAsyncProcessQueueOptions = {}) {
  const requestQueue = useRef<RequestFunction<T>[]>([]);

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestQueue = useCallback(async () => {
    while (requestQueue.current.length > 0) {
      const requestFunc = requestQueue.current[0];
      setIsLoading(true);

      try {
        const res = await requestFunc();

        setData(res as T);
        setError(null);
      } catch (err) {
        setData(null);
        setError(err as E);
      } finally {
        requestQueue.current.shift();
        setIsLoading(false);
      }
    }
  }, []);

  const addToProcessQueue = useCallback(
    async (callbackFunc: RequestFunction<T>) => {
      requestQueue.current.push(callbackFunc);

      if (requestQueue.current.length === 1) {
        if (!keepPreviousData) {
          setData(null);
          setError(null);
        }

        await handleRequestQueue();
      }
    },
    [keepPreviousData, handleRequestQueue]
  );

  return { data, error, isLoading, addToProcessQueue };
}
