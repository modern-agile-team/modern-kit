import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

interface UseDocumentTitleOption {
  preserveTitleOnUnmount?: boolean;
}

export function useDocumentTitle(
  title: string,
  { preserveTitleOnUnmount = false }: UseDocumentTitleOption = {}
) {
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
