import React, { useCallback, useEffect, useRef, useState } from 'react';

interface UseComputedStyleObserverReturnType<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  value: string;
  setValue: (value: string) => void;
}

/**
 * @description 관찰할 타겟 요소의 특정 computed style 값을 실시간으로 관찰하고 관리하는 React 훅
 *
 * MutationObserver를 사용하여 요소의 스타일 속성이 변경될 때 콜백을 호출합니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe
 *
 * @template T - 관찰할 HTML 요소 타입, 기본적으로 `HTMLElement`를 상속합니다.
 * @param {string} key - 관찰할 스타일 속성 키
 * @returns {UseComputedStyleObserverReturnType<T>} 다음을 포함하는 객체:
 * - `ref`: 관찰할 타겟 요소에 전달할 ref
 * - `value`: 현재 계산된 스타일 속성 값
 * - `setValue`: 관찰중인 스타일 속성 Key에 해당하는 속성 값을 업데이트하는 함수
 *
 * @example
 * ```tsx
 * const Example = () => {
 *   const { ref, value, setValue } = useComputedStyleObserver<HTMLDivElement>('color');
 *
 *   return (
 *     <div ref={ref} style={{ color: "black" }}>
 *       현재 글자 색상: {value}
 *       <button onClick={() => setValue('red')}>빨간색으로 변경</button>
 *     </div>
 *   );
 * };
 * ```
 */
export function useComputedStyleObserver<T extends HTMLElement>(
  key: string
): UseComputedStyleObserverReturnType<T> {
  const ref = useRef<T>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const [value, setValue] = useState('');

  const setStyleValue = useCallback(
    (value: string) => {
      if (!ref.current) return;
      const targetElement = ref.current;

      targetElement.style.setProperty(key, value);
      setValue(value);
    },
    [key]
  );

  const updateStyleValue = useCallback(() => {
    if (!ref.current) return;
    const targetElement = ref.current;

    const computedStyle = window.getComputedStyle(targetElement);
    const value = computedStyle.getPropertyValue(key).trim();

    setValue(value);
  }, [key]);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    updateStyleValue();
    observerRef.current = new MutationObserver(updateStyleValue);

    observerRef.current.observe(element, {
      attributeFilter: ['style', 'class'], // style, class 속성 변경을 관찰
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [updateStyleValue]);

  return { ref, value, setValue: setStyleValue };
}
