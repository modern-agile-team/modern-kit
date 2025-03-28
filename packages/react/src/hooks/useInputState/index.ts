import { ChangeEvent, useCallback, useState } from 'react';
import { isString } from '@modern-kit/utils';

/**
 * @description 입력 필드의 상태를 관리하는 커스텀 훅(초기값 존재)
 *
 * @template T - 입력값의 타입
 * @param {T} initialValue - 초기값
 * @returns {{
 *  value: T;
 *  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
 *  reset: () => void;
 * }} 입력 상태와 관련된 객체
 * - `value`: 현재 입력값
 * - `onChange`: 입력값 변경 핸들러
 * - `reset`: 입력값을 초기값으로 재설정하는 함수
 *
 * @example
 * ```tsx
 * const { value, onChange, reset } = useInputState('');
 * // const value: string
 *
 * <input type="text" name="test" onChange={onChange} value={value} />
 * ```
 *
 * @example
 * ```tsx
 * const { value, onChange, reset } = useInputState({ test: '' });
 * // const value: { test: string }
 *
 * <input type="text" name="test" onChange={onChange} value={value.test} />
 * ```
 */
export function useInputState<T>(initialValue: T): {
  value: T;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

/**
 * @description 입력 필드의 상태를 관리하는 커스텀 훅(초기값 없음)
 *
 * @template T - 입력값의 타입
 * @returns {{
 *  value: T | undefined;
 *  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
 *  reset: () => void;
 * }} 입력 상태와 관련된 객체
 * - `value`: 현재 입력값
 * - `onChange`: 입력값 변경 핸들러
 * - `reset`: 입력값을 초기값으로 재설정하는 함수
 *
 * @example
 * ```tsx
 * const { value, onChange, reset } = useInputState<string>();
 * // const value: string | undefined
 *
 * <input type="text" name="test" onChange={onChange} value={value} />
 * ```
 *
 * @example
 * ```tsx
 * const { value, onChange, reset } = useInputState<{ test: string }>();
 * // const value: { test: string } | undefined
 *
 * <input type="text" name="test" onChange={onChange} value={value?.test || ''} />
 * ```
 */
export function useInputState<T>(): {
  value: T | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

/**
 * @description 입력 필드의 상태를 관리하는 커스텀 훅
 *
 * @template T - 입력값의 타입
 * @param {T | undefined} initialValue - 초기값
 * @returns {{
 *  value: T | undefined;
 *  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
 *  reset: () => void;
 * }} 입력 상태와 관련된 객체
 * - `value`: 현재 입력값
 * - `onChange`: 입력값 변경 핸들러
 * - `reset`: 입력값을 초기값으로 재설정하는 함수
 *
 * @example
 * ```tsx
 * // 문자열 초기값 없음
 * const { value, onChange, reset } = useInputState<string>();
 * // const value: string | undefined
 *
 * <input type="text" name="test" onChange={onChange} value={value} />
 *
 * // 문자열 초기값 존재
 * const { value, onChange, reset } = useInputState<string>('');
 * // const value: string
 *
 * <input type="text" name="test" onChange={onChange} value={value} />
 * ```
 *
 * @example
 * ```tsx
 * // 객체 초기값 없음
 * const { value, onChange, reset } = useInputState<{ test: string }>();
 * // const value: { test: string } | undefined
 *
 * <input type="text" name="test" onChange={onChange} value={value?.test || ''} />
 *
 * // 객체 초기값 존재
 * const { value, onChange, reset } = useInputState<{ test: string }>({ test: '' });
 * // const value: { test: string }
 *
 * <input type="text" name="test" onChange={onChange} value={value.test} />
 * ```
 */
export function useInputState<T>(initialValue?: T): {
  value: T | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
} {
  const [value, setValue] = useState<T | undefined>(initialValue);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) {
      throw new Error('이벤트 타겟 요소가 정의되지 않았습니다');
    }

    const { name, value } = e.target;

    setValue((prev: T | undefined) => {
      if (isString(prev)) {
        return value as T;
      }

      if (!name) return prev;

      return {
        ...prev,
        [name]: value,
      } as T;
    });
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, onChange, reset };
}
