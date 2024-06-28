import { Iterator, IteratorProps } from '../Iterator';

interface SeparatedIteratorProps<T> extends IteratorProps<T> {
  separator: JSX.Element;
  includeLastSeparator?: boolean;
}

export const SeparatedIterator = <T extends unknown>({
  items,
  renderItem,
  separator,
  includeLastSeparator = false,
}: SeparatedIteratorProps<T>) => {
  return (
    <Iterator
      items={items}
      renderItem={(item, index) => (
        <>
          {renderItem(item, index)}
          {(includeLastSeparator || index < items.length - 1) && separator}
        </>
      )}
    />
  );
};
