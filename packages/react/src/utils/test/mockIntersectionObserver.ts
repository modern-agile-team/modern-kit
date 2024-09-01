import { Nullable } from '@modern-kit/types';
import { noop } from '@modern-kit/utils';

const defaultIntersectionObserver = window.IntersectionObserver;
const handlers = new Map<
  HTMLElement,
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void
>();

export const mockIntersectionObserverSetup = () => {
  window.IntersectionObserver = class IntersectionObserver {
    constructor(
      private handleImageLazyLoading: (
        entries: IntersectionObserverEntry[]
      ) => void
    ) {}

    observe(element: HTMLElement) {
      handlers.set(element, this.handleImageLazyLoading);
    }

    unobserve(element: HTMLElement) {
      handlers.delete(element);
    }

    disconnect() {
      handlers.clear();
    }
  } as any;
};

export const mockIntersectionObserverCleanup = () => {
  window.IntersectionObserver = defaultIntersectionObserver;
  handlers.clear();
};

export const mockIntersecting = ({
  type,
  element,
}: {
  element: HTMLElement;
  type: 'view' | 'hide';
}) => {
  const observer = new window.IntersectionObserver(noop);
  let current: Nullable<HTMLElement> = element;

  while (current != null) {
    const handler = handlers.get(current);

    if (handler != null) {
      handler(
        [
          {
            isIntersecting: type === 'view' ? true : false,
            intersectionRatio: type === 'view' ? 1 : 0,
            boundingClientRect: {} as any,
            intersectionRect: {} as any,
            rootBounds: {} as any,
            target: current!,
            time: 0,
          },
        ],
        observer
      );
    }

    current = current.parentElement;
  }
};
