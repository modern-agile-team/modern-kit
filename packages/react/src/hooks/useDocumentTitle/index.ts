import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

interface UseDocumentTitleOption {
  preserveTitleOnUnmount?: boolean;
}

/**
 * @description Client 환경에서 문서의 제목(`document.title`)을 설정하는 커스텀 훅입니다.
 *
 * `useDocumentTitle` 훅은 컴포넌트가 마운트될 때 주어진 제목으로 `document.title`을 설정하고,
 * 컴포넌트가 언마운트될 때 선택적으로 이전 제목으로 복원할 수 있습니다.
 *
 * @param {string} title - 설정할 문서의 제목입니다.
 * @param {{ preserveTitleOnUnmount: boolean }} options - 옵션 객체입니다.
 * - `preserveTitleOnUnmount`: `true`로 설정하면 컴포넌트가 언마운트될 때 제목을 이전 상태로 복원하지 않습니다. 기본값은 `false`입니다.
 *
 * @returns {void}
 *
 * @example
 * useDocumentTitle('새로운 제목', { preserveTitleOnUnmount: true });
 */
export function useDocumentTitle(
  title: string,
  { preserveTitleOnUnmount = false }: UseDocumentTitleOption = {}
): void {
  useIsomorphicLayoutEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      if (!preserveTitleOnUnmount) {
        document.title = prevTitle;
      }
    };
  }, [title, preserveTitleOnUnmount]);
}
