import classNames from 'classnames';
import styles from './AspectRatio.module.css';
import { Slot } from '../Slot';
import { CSSProperties, Children, useMemo } from 'react';

interface AspectRatioProps {
  children: JSX.Element;
  ratio: number;
}

/**
 * @description 주어진 aspect-ratio 비율을 맞춰주기 위해 선언적으로 사용하는 유틸 컴포넌트입니다.
 *
 * 미리 영역을 확보하여 `Layout Shift`를 방지하는데 효과적입니다.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
 *
 * @param {AspectRatioProps} props - 컴포넌트에 전달되는 속성들입니다.
 * @param {number} props.ratio - 자식 요소의 가로 세로 비율을 지정합니다.
 * @param {JSX.Element} props.children - 렌더링 할 자식요소 입니다.
 *
 * @returns {JSX.Element} 주어진 aspect-ratio 비율에 맞춰 스타일이 적용된 자식 요소를 반환합니다.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *  <img src={imgUrl} alt="image" />
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
