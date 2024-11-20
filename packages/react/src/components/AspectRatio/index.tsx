import classNames from 'classnames';
import styles from './AspectRatio.module.css';
import { Slot } from '../Slot';
import { CSSProperties, Children, PropsWithChildren, useMemo } from 'react';

interface AspectRatioProps {
  children: JSX.Element;
  ratio: number;
}

/**
 * @description 주어진 aspect-ratio 비율에 맞게 가로/세로 비율을 편리하게 맞춰주는 컴포넌트입니다.
 *
 * 미리 영역을 확보하여 Layout Shift를 방지하는데 효과적입니다.
 *
 * @template T - 사용할 HTML 요소의 타입을 지정합니다. 기본값은 'div'입니다.
 *
 * @param {PropsWithChildren<AspectRatioProps<T>>} props - 컴포넌트에 전달되는 속성들입니다.
 * @param {number} props.ratio - 자식 요소의 가로 세로 비율을 지정합니다.
 * @param {React.ReactNode} props.children - 렌더링 할 자식요소 입니다.
 *
 * @returns {JSX.Element} 주어진 비율에 맞춰 스타일이 적용된 래퍼 요소를 반환합니다.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *  <img src={imgUrl} alt="placeholder" />
 * </AspectRatio>
 * ```
 */
export const AspectRatio = ({
  ratio,
  children,
}: AspectRatioProps): JSX.Element => {
  const customStyle: CSSProperties = useMemo(
    () => ({
      aspectRatio: ratio,
    }),
    [ratio]
  );

  return (
    <Slot className={classNames(styles['wrapper'])} style={customStyle}>
      {Children.only(children)}
    </Slot>
  );
};
