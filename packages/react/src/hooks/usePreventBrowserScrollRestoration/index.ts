import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/**
 * @description 브라우저의 기본 스크롤 복원 기능을 방지하는 훅입니다.
 *
 * 컴포넌트가 마운트될 때 `window.history.scrollRestoration`을 `'manual'`로 설정하여
 * 브라우저의 자동 스크롤 복원 기능을 비활성화합니다. 컴포넌트가 언마운트될 때는 원래 값으로 복원합니다.
 *
 * 이 훅은 커스텀 스크롤 복원 로직을 구현할 때 브라우저의 기본 동작과 충돌을 방지하기 위해 사용됩니다.
 *
 * @example
 * const MyComponent = () => {
 *   usePreventBrowserScrollRestoration();
 *
 *   return <div>컨텐츠</div>;
 * };
 */
export function usePreventBrowserScrollRestoration() {
  useIsomorphicLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      const original = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = original;
      };
    }
  }, []);
}
