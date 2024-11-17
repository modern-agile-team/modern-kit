import classNames from 'classnames';
import styles from './AspectRatio.module.css';
import { Slot } from '../Slot';
import {
  CSSProperties,
  Children,
  ComponentProps,
  PropsWithChildren,
  useMemo,
} from 'react';

interface AspectRatioProps extends ComponentProps<'div'> {
  asChild?: boolean;
  ratio: number;
}

/**
 * @description 주어진 aspect-ratio 비율에 맞게 가로/세로 비율을 편리하게 맞춰주는 컴포넌트입니다.
 *
 * 미리 영역을 확보하여 Layout Shift를 방지하는데 효과적입니다.
 *
 * @template T - 사용할 HTML 요소의 타입을 지정합니다. 기본값은 'div'입니다.
 *
 * @param {PropsWithChildren<AspectRatioProps<T>>} aspectRatioProps - 컴포넌트에 전달되는 속성들입니다.
 * @param {boolean} [aspectRatioProps.asChild=false] - `true`로 설정하면 `Slot` 컴포넌트를 사용해 자식 요소에 aspect-ratio 속성을 적용합니다.
 * @param {number} aspectRatioProps.ratio - 자식 요소의 가로 세로 비율을 지정합니다.
 * @param {React.ReactNode} aspectRatioProps.children - 렌더링 할 자식요소 입니다.
 * @param {Object} [aspectRatioProps.props] - 기타 추가할 나머지 속성들입니다.
 *
 * @returns {JSX.Element} 주어진 비율에 맞춰 스타일이 적용된 래퍼 요소를 반환합니다.
 *
 * @example
 * // 기본적으로 div를 생성 후 aspect-ratio 속성을 적용합니다.
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *  <img src={imgUrl} alt="placeholder" />
 * </AspectRatio>
 * ```
 *
 * @example
 * // asChild 속성을 true로 설정하면 자식 요소에 aspect-ratio 속성을 적용합니다.
 * ```tsx
 * <AspectRatio ratio={16 / 9} asChild>
 *  <section>
 *    <img src={imgUrl} alt="placeholder" />
 *  </section>
 * </AspectRatio>
 * ```
 */
export const AspectRatio = ({
  asChild = false,
  ratio,
  children,
  ...props
}: PropsWithChildren<AspectRatioProps>): JSX.Element => {
  const Wrapper = asChild ? Slot : 'div';
  const customStyle: CSSProperties = useMemo(
    () => ({
      paddingTop: `calc(100% * (1 / ${ratio}))`,
      ...props.style,
    }),
    [ratio, props.style]
  );

  return (
    <Wrapper
      className={classNames(styles['wrapper'], props.className)}
      style={customStyle}
      {...props}>
      {Children.only(children)}
    </Wrapper>
  );
};
