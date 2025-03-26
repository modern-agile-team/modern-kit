import { isPlainObject } from '@modern-kit/utils';
import React, { useCallback } from 'react';

export interface IteratorProps<T> {
  items: T[] | readonly T[];
  itemKey?: T extends Record<PropertyKey, any> ? keyof T : string;
  renderItem: (item: T, index: number) => JSX.Element;
}

/**
 * @description 주어진 배열을 반복하면서, 각 아이템을 렌더링하는 컴포넌트입니다.
 *
 * `itemKey`로 문자열을 넘겨주면, 각 요소에서 해당 프로퍼티 key의 값을 각 요소의 `unique key`로 설정합니다.
 *
 * 문자열/숫자 배열의 경우 itemKey를 넘기지 않아도 자동으로 `${item}_${index}`형태로 지정됩니다.
 *
 * @template T - 반복할 아이템의 타입
 * @param {IteratorProps<T>} props - Iterator 컴포넌트 props
 * @param {T[] | readonly T[]} props.items - 반복할 아이템의 배열
 * @param {string} [props.itemKey] - 아이템의 고유 키
 * @param {(item: T, index: number) => JSX.Element} props.renderItem - 각 아이템을 렌더링할 함수
 *
 * @example
 * ```tsx
 * // 문자열 배열 사용 예시
 * <Iterator
 *   items={['가', '나', '다']}
 *   renderItem={(item) => <div>{item}</div>}
 * />
 *
 * @example
 * ```tsx
 * // 객체 배열 사용 예시
 * <Iterator
 *   items={[{ id: 1, name: '홍길동' }, { id: 2, name: '김철수' }]}
 *   itemKey="id"
 *   renderItem={(item) => <div>{item.name}</div>}
 * />
 * ```
 */
export const Iterator = <T,>({
  items,
  itemKey,
  renderItem,
}: IteratorProps<T>) => {
  const getKey = useCallback(
    (item: T, index: number) => {
      return isPlainObject(item)
        ? item?.[itemKey as keyof T] || index
        : `${item}_${index}`;
    },
    [itemKey]
  );
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={getKey(item, index)}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </>
  );
};
