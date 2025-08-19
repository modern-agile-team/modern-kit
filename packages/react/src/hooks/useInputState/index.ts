import { ChangeEvent, useCallback, useState } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';

interface UseInputStateOptions {
  validate?: (value: string) => string | null | undefined;
}

interface UseInputStateReturn {
  value: string;
  error: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetError: () => void;
  resetValue: () => void;
  reset: () => void;
}

/**
 * @description 입력 필드의 상태를 관리하는 커스텀 훅
 *
 * 단일 입력 필드와 다중 입력 필드를 지원합니다.
 * - 다중 입력 필드는 객체 형태로 입력 필드의 `name` 속성을 `key`로 사용합니다.
 *
 * @param {string | undefined} initialValue - 초기값 (선택사항)
 * @param {UseInputStateOptions} options - 옵션
 * @param {UseInputStateOptions['validate']} options.validate - 유효성 검증 함수
 * @returns {UseInputStateReturn} 입력 상태와 관련된 객체
 * - `value`: 현재 입력값
 * - `error`: 값 검증 오류 메시지
 * - `onChange`: 입력값 변경 핸들러
 * - `resetError`: 오류 메시지 초기화 함수
 * - `resetValue`: 입력값 초기화 함수
 * - `reset`: 입력값과 오류 메시지를 모두 초기화하는 함수
 *
 * @example
 * ```tsx
 * const { value, onChange, reset } = useInputState('');
 * <input type="text" onChange={onChange} value={value} />
 * ```
 *
 * @example
 * ```tsx
 * const { value, onChange, reset } = useInputState('', {
 *   validate: (value) => value.length > 10 ? 'error' : undefined
 * });
 * <input type="text" onChange={onChange} value={value} />
 * ```
 */
export function useInputState(
  initialValue: string = '',
  options: UseInputStateOptions = {}
): UseInputStateReturn {
  const { validate } = options;

  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const preservedValidate = usePreservedCallback(validate ?? (() => {}));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      const validationError = preservedValidate(value);
      if (validationError) {
        setError(validationError);
        return;
      }

      setValue(value);
      setError(null);
    },
    [preservedValidate]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const resetValue = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  const reset = useCallback(() => {
    resetValue();
    resetError();
  }, [resetValue, resetError]);

  return { value, error, onChange, resetError, resetValue, reset };
}
