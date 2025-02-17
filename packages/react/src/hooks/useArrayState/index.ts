import { useCallback, useState } from 'react';

interface UseArrayStateReturn<T> {
  data: T[];
  push: (item: T) => void;
  unshift: (item: T) => void;
  shift: () => void;
  pop: () => void;
  remove: (index: number) => void;
  multiRemove: (indexes: number[]) => void;
  clear: () => void;
  update: (index: number, item: T) => void;
  multiUpdate: (items: { index: number; item: T }[]) => void;
  insert: (index: number, item: T) => void;
}
/**
 * @description 불변성을 유지하면서 배열 상태를 편리하게 관리하기 위한 커스텀 훅입니다.
 *
 * @template T - 배열 요소의 타입
 * @param {T[]} initialValue - 초기 배열 값
 * @returns {T[]} data - 현재 배열 상태
 * @returns {(item: T) => void} push - 배열의 끝에 항목을 추가하는 함수
 * @returns {(item: T) => void} unshift - 배열의 시작에 항목을 추가하는 함수
 * @returns {() => void} shift - 배열의 첫 번째 항목을 제거하는 함수
 * @returns {() => void} pop - 배열의 마지막 항목을 제거하는 함수
 * @returns {(index: number) => void} remove - 주어진 인덱스의 항목을 제거하는 함수
 * @returns {(indexes: number[]) => void} multiRemove - 여러 인덱스의 항목을 제거하는 함수
 * @returns {() => void} clear - 배열을 비우는 함수
 * @returns {(index: number, item: T) => void} update - 주어진 인덱스의 항목을 업데이트하는 함수
 * @returns {(items: { index: number; item: T }[]) => void} multiUpdate - 여러 항목을 업데이트하는 함수
 * @returns {(index: number, item: T) => void} insert - 주어진 인덱스에 항목을 삽입하는 함수
 */
export const useArrayState = <T>(initialValue: T[]): UseArrayStateReturn<T> => {
  const [data, setData] = useState<T[]>(initialValue);
  const dataLength = data.length;

  const push = useCallback((item: T) => {
    setData((prev) => [...prev, item]);
  }, []);

  const unshift = useCallback((item: T) => {
    setData((prev) => [item, ...prev]);
  }, []);

  const shift = useCallback(() => {
    setData((prev) => prev.slice(1));
  }, []);

  const pop = useCallback(() => {
    setData((prev) => prev.slice(0, -1));
  }, []);

  const remove = useCallback(
    (index: number) => {
      if (index < 0 || index > dataLength) {
        throw new Error('인덱스가 범위를 벗어났습니다');
      }

      setData((prev) => prev.filter((_, i) => i !== index));
    },
    [dataLength]
  );

  const multiRemove = useCallback(
    (indexes: number[]) => {
      if (indexes.some((index) => index < 0 || index > dataLength)) {
        throw new Error('인덱스가 범위를 벗어났습니다');
      }

      setData((prev) => prev.filter((_, i) => !indexes.includes(i)));
    },
    [dataLength]
  );

  const clear = useCallback(() => {
    setData([]);
  }, []);

  const update = useCallback(
    (index: number, item: T) => {
      if (index < 0 || index > dataLength) {
        throw new Error('인덱스가 범위를 벗어났습니다');
      }

      setData((prev) => {
        const newData = [...prev];
        newData[index] = item;
        return newData;
      });
    },
    [dataLength]
  );

  const multiUpdate = useCallback(
    (items: { index: number; item: T }[]) => {
      if (items.some(({ index }) => index < 0 || index > dataLength)) {
        throw new Error('인덱스가 범위를 벗어났습니다');
      }

      setData((prev) => {
        const newData = [...prev];
        items.forEach(({ index, item }) => {
          newData[index] = item;
        });
        return newData;
      });
    },
    [dataLength]
  );

  const insert = useCallback(
    (index: number, item: T) => {
      if (index < 0 || index > dataLength) {
        throw new Error('인덱스가 범위를 벗어났습니다');
      }

      setData((prev) => {
        const newData = [...prev];
        newData.splice(index, 0, item);
        return newData;
      });
    },
    [dataLength]
  );

  return {
    data,
    push,
    unshift,
    shift,
    pop,
    remove,
    multiRemove,
    clear,
    update,
    multiUpdate,
    insert,
  };
};
