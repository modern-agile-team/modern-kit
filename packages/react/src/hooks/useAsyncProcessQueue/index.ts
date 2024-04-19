import { useCallback, useState, useRef } from 'react';

type RequestFunction<Data> = (requestData?: any) => Promise<Data>;

interface UseAsyncProcessQueueOptions {
  keepPreviousData?: boolean;
}

export const useAsyncProcessQueue = <Data = unknown, Error = unknown>({
  keepPreviousData = false,
}: UseAsyncProcessQueueOptions = {}) => {
  const requestQueue = useRef<RequestFunction<Data>[]>([]);

  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestQueue = useCallback(async () => {
    if (requestQueue.current.length === 0) {
      return;
    }

    const requestFunc = requestQueue.current[0];

    try {
      setIsLoading(true);
      const res = await requestFunc();

      setData(res);
      setError(undefined);
    } catch (err) {
      setData(undefined);
      setError(err as Error);
    } finally {
      requestQueue.current.shift();
      setIsLoading(false);

      await handleRequestQueue();
    }
  }, []);

  const addToProcessQueue = useCallback(
    async (callbackFunc: RequestFunction<Data>) => {
      requestQueue.current.push(callbackFunc);

      if (requestQueue.current.length === 1) {
        if (!keepPreviousData) {
          setData(undefined);
          setError(undefined);
        }

        await handleRequestQueue();
      }
    },
    [keepPreviousData, handleRequestQueue]
  );

  return { data, error, isLoading, addToProcessQueue };
};
