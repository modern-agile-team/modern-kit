import { useEventListener } from '../useEventListener';
import { RefObject, useRef, useState } from 'react';

/**
 * @description `드래그 앤 드롭 이벤트`를 처리하여 `파일`을 수신할 수 있는 영역을 생성하는 커스텀 훅입니다.
 *
 * @template T - HTML 엘리먼트 타입을 지정합니다.
 * @param {(files: File[]) => void} onDrop - 파일이 드롭되었을 때 호출되는 콜백 함수입니다.
 * 드롭된 파일들의 배열을 인자로 받습니다.
 *
 * @returns {{
 *   ref: RefObject<T>;
 *   isDragOver: boolean;
 * }} `ref`와 `isDragOver`를 포함한 객체를 반환합니다.
 * - `ref`: 드롭 영역으로 사용할 대상 요소의 참조입니다.
 * - `isDragOver`: 드래그한 파일이 드롭 영역 위에 있는지 여부를 나타내는 불리언 값입니다.
 *
 * @example
 * ```tsx
 * const { ref, isDragOver } = useDropZone<HTMLDivElement>((files) => {
 *   console.log('Dropped files:', files);
 * });
 *
 * <div ref={ref}>
 *   DropZone
 * </div>
 * ```
 */
export const useDropZone = <T extends HTMLElement>(
  onDrop: (files: File[]) => void
): {
  ref: RefObject<T>;
  isDragOver: boolean;
} => {
  const ref = useRef<T>(null);
  const counter = useRef(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();

    counter.current += 1;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();

    counter.current -= 1;
    if (counter.current === 0) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer?.files;
    onDrop(Array.from(files || []));
  };

  useEventListener(ref, 'dragover', handleDragOver);
  useEventListener(ref, 'dragenter', handleDragEnter);
  useEventListener(ref, 'dragleave', handleDragLeave);
  useEventListener(ref, 'drop', handleDrop);

  return { ref, isDragOver };
};
