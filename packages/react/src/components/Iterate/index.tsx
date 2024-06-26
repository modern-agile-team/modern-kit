import { getUniqId } from '@modern-kit/utils';
import React from 'react';

export interface IterateProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
}

export const Iterate = <T extends unknown>({
  items,
  renderItem,
}: IterateProps<T>) => {
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={`${index}-${getUniqId()}`}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </>
  );
};
