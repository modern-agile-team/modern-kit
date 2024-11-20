import { Slot } from '../Slot';
import {
  useIntersectionObserver,
  UseIntersectionObserverProps,
} from '../../hooks/useIntersectionObserver';

interface InViewProps extends UseIntersectionObserverProps {
  children: JSX.Element;
}

/**
 * @description `InView`는 `@modern-kit/react`의 `useIntersectionObserver`를 선언적으로 활용 할 수 있는 컴포넌트입니다.
 *
 * @param {InViewProps} props - 컴포넌트에 전달되는 속성들입니다.
 * @param {JSX.Element} props.children - 관찰할 자식 요소입니다.
 * @param {(entry: IntersectionObserverEntry) => void} props.onIntersectStart - 타겟 요소가 viewport 내에 들어갈 때 호출되는 콜백 함수입니다.
 * @param {(entry: IntersectionObserverEntry) => void} props.onIntersectEnd - 타겟 요소가 viewport에서 나갈 때 호출되는 콜백 함수입니다.
 * @param {boolean} props.calledOnce - 요소가 교차할 때 콜백을 `한 번`만 호출할지 여부를 나타냅니다.
 * @param {number | number[]} props.threshold - 관찰을 시작할 viewport의 가시성 비율입니다.
 * @param {Element | null} props.root - 교차할 때 기준이 되는 root 요소입니다. 기본값은 `null`이며 이는 viewport를 의미합니다.
 * @param {string} props.rootMargin - 루트 요소에 대한 마진을 지정합니다. 이는 뷰포트 또는 루트 요소의 경계를 확장하거나 축소하는데 사용됩니다.
 * @param {boolean} props.enabled - Observer를 활성화할지 여부를 나타냅니다. `false`일 경우 Observer가 작동하지 않습니다.
 */
export const InView = ({ children, ...props }: InViewProps) => {
  const { ref: intersectionObserverRef } = useIntersectionObserver(props);

  return <Slot ref={intersectionObserverRef}>{children}</Slot>;
};
