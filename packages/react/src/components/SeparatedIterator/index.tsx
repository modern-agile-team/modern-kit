import { useCallback } from 'react';
import { Iterator, IteratorProps } from '../Iterator';

interface SeparatedIteratorProps<T> extends IteratorProps<T> {
  separator: JSX.Element;
  separatorInterval?: number;
  includeLastSeparator?: boolean;
}

export const SeparatedIterator = <T,>({
  itemKey,
  items = [],
  separator,
  renderItem,
  separatorInterval = 1,
  includeLastSeparator = false,
}: SeparatedIteratorProps<T>) => {
  const isRenderSeparator = useCallback(
    (index: number) => {
      if (index === items.length - 1) {
        return includeLastSeparator;
      }
      return (index + 1) % separatorInterval === 0;
    },
    [includeLastSeparator, separatorInterval, items.length]
  );

  return (
    <Iterator
      items={items}
      itemKey={itemKey}
      renderItem={(item, index) => (
        <>
          {renderItem(item, index)}
          {isRenderSeparator(index) && separator}
        </>
      )}
    />
  );
};
