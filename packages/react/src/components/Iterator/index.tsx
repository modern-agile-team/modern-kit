import { isPlainObject } from '@modern-kit/utils';
import React, { useCallback } from 'react';

export interface IteratorProps<T> {
  items: T[] | readonly T[] | undefined;
  itemKey?: string;
  renderItem: (item: T, index: number) => JSX.Element;
}

export const Iterator = <T,>({
  items = [],
  itemKey = '',
  renderItem,
}: IteratorProps<T>) => {
  const getKey = useCallback(
    (item: T, index: number) => {
      return isPlainObject(item) ? item?.[itemKey] || index : index;
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
