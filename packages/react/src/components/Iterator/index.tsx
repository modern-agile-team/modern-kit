import { isPlainObject } from '@modern-kit/utils';
import React, { useCallback } from 'react';

export interface IteratorProps<T> {
  items: T[] | readonly T[] | undefined;
  itemKey?: T extends Record<PropertyKey, any> ? keyof T : string;
  renderItem: (item: T, index: number) => JSX.Element;
}

export const Iterator = <T,>({
  items = [],
  itemKey,
  renderItem,
}: IteratorProps<T>) => {
  const getKey = useCallback(
    (item: T, index: number) => {
      return isPlainObject(item)
        ? item?.[itemKey as keyof T] || index
        : `${index}_${item}`;
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
