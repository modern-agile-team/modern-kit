import { CSSProperties } from 'react';
import { polymorphicForwardRef } from '../../utils/polymorphicForwardRef';
import { Slot } from '../../components/Slot';
import styles from './AspectRatio.modules.css';
import classNames from 'classnames';

interface AspectRatioProps {
  children: JSX.Element;
  ratio: number;
  asChild?: boolean;
  style?: CSSProperties;
  className?: string;
}

/**
 * @description 주어진 aspect-ratio 비율을 맞춰주기 위해 선언적으로 사용하는 유틸 컴포넌트입니다.
 *
 * 미리 영역을 확보하여 `Layout Shift`를 방지하는데 효과적입니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
 *
 * 다형성을 지원하기 때문에 `as`, `asChild` 속성을 지원합니다.
 *
 * - 기본적으로 `div` 태그로 자식 요소를 감싸서 렌더링하며, `as` 속성을 통해 감싸는 요소를 특정 요소로 변경해 렌더링할 수 있습니다. 이때, 해당 요소에 `aspect-ratio` 속성을 적용해 영역을 확보합니다.
 * - `asChild` 속성이 `true`라면 `Slot`을 통해 자식 요소를 그대로 렌더링하고, 자식 요소에 `aspect-ratio` 속성을 적용해 영역을 확보합니다.
 * - `asChild` 속성을 사용 할 경우 아래 링크를 참고하세요.
 *
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/components/Slot
 *
 * @param {AspectRatioProps} props - 컴포넌트에 전달되는 속성들입니다.
 * @param {number} props.ratio - 자식 요소의 가로 세로 비율을 지정합니다.
 * @param {JSX.Element} props.children - 렌더링 할 자식요소 입니다.
 * @param {CSSProperties} props.style - 추가적인 스타일을 지정합니다.
 * @param {string} props.className - 추가적인 클래스를 지정합니다.
 * @param {string} props.as - 감싸는 요소를 지정합니다. 기본 값은 `div`입니다. 해당 요소에 `aspect-ratio` 속성을 적용해 영역을 확보합니다.
 * @param {boolean} props.asChild - `true`일 경우 `Slot`을 통해 자식 요소를 그대로 렌더링하고, 자식 요소에 `aspect-ratio` 속성을 적용해 영역을 확보합니다.
 * @returns {JSX.Element} 주어진 aspect-ratio 비율에 맞춰 스타일이 적용된 자식 요소를 반환합니다.
 *
 * @example
 * ```tsx
 * // Default
 * <AspectRatio ratio={16 / 9}>
 *  <img src={imgUrl} alt="image" />
 * </AspectRatio>
 * ```
 *
 * @example
 * ```tsx
 * // as article
 * <AspectRatio ratio={16 / 9} as="article">
 *  <img src={imgUrl} alt="image" />
 * </AspectRatio>
 * ```
 *
 * @example
 * ```tsx
 * // asChild
 * <AspectRatio ratio={16 / 9} asChild>
 *  <img src={imgUrl} alt="image" />
 * </AspectRatio>
 * ```
 */
export const AspectRatio = polymorphicForwardRef<'div', AspectRatioProps>(
  ({ ratio, style, as = 'div', asChild = false, ...props }, ref) => {
    const AspectRatioWrapper = asChild ? Slot : as;

    const slotStyle: CSSProperties = {
      aspectRatio: ratio,
      ...style,
    };

    const className = asChild
      ? props.className
      : classNames(styles.aspectRatioWrapper, props.className);

    return (
      <AspectRatioWrapper
        ref={ref}
        style={slotStyle}
        className={className}
        {...props}
      />
    );
  }
);
