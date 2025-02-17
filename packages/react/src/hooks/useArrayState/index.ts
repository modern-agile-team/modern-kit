import { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface ArrayStateSetters<T> extends Dispatch<SetStateAction<T[]>> {
  push: (...items: T[]) => void;
  unshift: (...items: T[]) => void;
  shift: () => void;
  pop: () => void;
  splice: (start: number, deleteCount: number, ...items: T[]) => void;
  remove: (...indexes: number[]) => void;
  removeAt: (index: number) => void;
  removeBy: (predicate: (item: T, index: number) => boolean) => void;
  updateAt: (index: number, item: T) => void;
  updateBy: (iteratee: (item: T, index: number) => T) => void;
  insertAt: (index: number, item: T) => void;
  clear: () => void;
}

/**
 * @description 불변성을 유지하면서 배열 상태를 편리하게 관리하기 위한 커스텀 훅입니다.
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | (() => T[])} initialValue - 초기 배열 값 또는 초기값을 반환하는 함수
 * @returns {UseArrayStateReturn<T>} 배열 상태와 업데이트 메서드들을 포함한 객체
 * @returns {T[]} array - 현재 배열 상태
 * @returns {ArrayStateSetters<T>} setArray - 배열 상태를 업데이트하는 함수이며, 배열 상태를 업데이트하는 메서드를 함께 제공합니다.
 * @returns {(...items: T[]) => void} setArray.push - 배열의 끝에 항목들을 추가하는 함수
 * @returns {(...items: T[]) => void} setArray.unshift - 배열의 시작에 항목들을 추가하는 함수
 * @returns {() => void} setArray.shift - 배열의 첫 번째 항목을 제거하는 함수
 * @returns {() => void} setArray.pop - 배열의 마지막 항목을 제거하는 함수
 * @returns {(start: number, deleteCount: number, ...items: T[]) => void} setArray.splice - 배열의 특정 위치에서 항목을 제거하고 새 항목을 추가하는 함수
 * @returns {(indexes: number[]) => void} setArray.remove - 주어진 인덱스들의 항목을 제거하는 함수
 * @returns {(index: number) => void} setArray.removeAt - 주어진 인덱스의 항목을 제거하는 함수
 * @returns {(predicate: (item: T, index: number) => boolean) => void} setArray.removeBy - predicate 함수 반환값이 true인 항목들을 제거하는 함수
 * @returns {(index: number, item: T) => void} setArray.updateAt - 주어진 인덱스의 항목을 업데이트하는 함수
 * @returns {(iteratee: (item: T, index: number) => T) => void} setArray.updateBy - iteratee 함수를 통해 배열의 각 항목을 업데이트하는 함수
 * @returns {(index: number, item: T) => void} setArray.insertAt - 주어진 인덱스에 항목을 삽입하는 함수
 * @returns {() => void} setArray.clear - 배열을 비우는 함수
 *
 * @example
 * // setArray 직접 호출을 통해 배열을 직접 설정할 수 있습니다.
 * const { array, setArray } = useArrayState([1, 2, 3]);
 * setArray([1, 4, 2, 3]);
 * console.log(array); // [1, 4, 2, 3]
 *
 * @example
 * // setArray 메서드를 통해 배열을 업데이트할 수 있습니다. 이때, 불변성을 유지합니다.
 * const { array, setArray } = useArrayState([1, 2, 3]);
 * setArray.insertAt(1, 4);
 * console.log(array); // [1, 4, 2, 3]
 */
export const useArrayState = <T>(
  initialValue: T[] | (() => T[])
): [T[], ArrayStateSetters<T>] => {
  const [value, setValue] = useState<T[]>(
    typeof initialValue === 'function' ? initialValue() : initialValue
  );

  const setArray = useMemo(() => {
    const setState: ArrayStateSetters<T> = (v: SetStateAction<T[]>) =>
      setValue(v);

    setState.push = (...items: T[]) => {
      setValue((prev) => [...prev, ...items]);
    };

    setState.unshift = (...items: T[]) => {
      setValue((prev) => [...items, ...prev]);
    };

    setState.shift = () => {
      setValue((prev) => prev.slice(1));
    };

    setState.pop = () => {
      setValue((prev) => prev.slice(0, -1));
    };

    setState.splice = (start: number, deleteCount: number, ...items: T[]) => {
      setValue((prev) => {
        const newArray = [...prev];
        newArray.splice(start, deleteCount, ...items);
        return newArray;
      });
    };

    setState.insertAt = (index: number, item: T) => {
      setValue((prev) => {
        const newArray = [...prev];
        newArray.splice(index, 0, item);
        return newArray;
      });
    };

    setState.remove = (...indexes: number[]) => {
      setValue((prev) => prev.filter((_, i) => !indexes.includes(i)));
    };

    setState.removeAt = (index: number) => {
      setValue((prev) => prev.filter((_, i) => i !== index));
    };

    setState.removeBy = (predicate: (item: T, index: number) => boolean) => {
      setValue((prev) => prev.filter((item, index) => !predicate(item, index)));
    };

    setState.updateAt = (index: number, item: T) => {
      setValue((prev) => {
        const newArray = [...prev];
        newArray[index] = item;
        return newArray;
      });
    };

    setState.updateBy = (iteratee: (item: T, index: number) => T) => {
      setValue((prev) => prev.map((item, index) => iteratee(item, index)));
    };

    setState.clear = () => {
      setValue([]);
    };

    return setState;
  }, []);

  return [value, setArray];
};
