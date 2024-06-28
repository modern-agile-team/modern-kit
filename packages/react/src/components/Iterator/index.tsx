import { getUniqId } from '@modern-kit/utils';
import React from 'react';

export interface IteratorProps<T> {
  items: T[] | readonly T[];
  renderItem: (item: T, index: number) => JSX.Element;
}

export const Iterator = <T extends unknown>({
  items,
  renderItem,
}: IteratorProps<T>) => {
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={getUniqId()}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </>
  );
};
