import React, { useCallback, useState } from 'react';

interface UseImageStatusReturnType {
  ref: React.RefCallback<HTMLImageElement>;
  imageStatus: 'pending' | 'loading' | 'complete' | 'error';
}

/**
 * @description 이미지 로드 상태를 추적하는 커스텀 훅입니다.
 *
 * `pending`, `loading`, `complete`, `error` 네 가지 상태를 반환합니다.
 * - pending: 아직 이미지 로드가 시작되지 않은 상태.
 * - loading: 이미지가 로드 중인 상태.
 * - complete: 이미지가 성공적으로 로드된 상태.
 * - error: 이미지 로드 중 에러가 발생한 상태.
 *
 * @returns {UseImageStatusReturnType} 이미지의 현재 상태와 이미지 요소에 대한 ref 콜백을 반환합니다.
 * - `ref`: 이미지 요소에 연결할 ref 콜백
 * - `imageStatus`: 이미지의 현재 로드 상태 ('pending', 'loading', 'complete', 'error')
 *
 * @example
 * const { ref, imageStatus } = useImageStatus();
 *
 * return (
 *   <div>
 *     <img ref={ref} src="https://example.com/image.jpg" alt="Example" />
 *     <p>이미지 상태: {imageStatus}</p>
 *   </div>
 * );
 */
export function useImageStatus(): UseImageStatusReturnType {
  const [imageStatus, setImageStatus] = useState<
    'pending' | 'loading' | 'complete' | 'error'
  >('pending');

  const ref = useCallback((imgElement: HTMLImageElement) => {
    if (!imgElement) {
      return;
    }

    setImageStatus('loading');

    imgElement.onload = () => {
      setImageStatus('complete');
    };

    imgElement.onerror = () => {
      setImageStatus('error');
    };
  }, []);

  return { ref, imageStatus };
}
