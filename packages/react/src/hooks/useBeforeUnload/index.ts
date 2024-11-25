import { isFunction } from '@modern-kit/utils';
import { useEffect } from 'react';

/**
 * @description beforeunload를 이벤트를 리액트에서 쉽게 다룰 수 있는 훅입니다.
 *
 * beforeunload 이벤트는 사용자가 페이지를 떠날 때 발생하는 이벤트입니다.
 *
 * beforeunload 이벤트의 주요 사례는 웹 페이지에서 사용자에게 실제로 페이지를 떠날 것인지 묻는 확인 대화 상자를 표시해 확인하는 것입니다.
 * 사용자가 확인 버튼을 누를 경우 브라우저는 새 페이지로 이동하고 그렇지 않으면 탐색을 취소하고 현재 페이지에 머무릅니다.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
 *
 * @param {boolean | (() => boolean)} [enabled=true] - 훅의 활성화 여부를 결정합니다. false일 경우 이벤트 리스너가 등록되지 않습니다.
 * @returns {void}
 *
 * @example
 * // 기본 사용법
 * useBeforeUnload();
 *
 * @example
 * // enabled가 false일 때 beforeunload 이벤트 리스너가 추가되지 않습니다.
 * useBeforeUnload(false);
 */
export function useBeforeUnload(
  enabled: boolean | (() => boolean) = true
): void {
  const enabledToUse = isFunction(enabled) ? enabled() : enabled;

  useEffect(() => {
    if (!enabledToUse) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = '');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabledToUse]);
}
