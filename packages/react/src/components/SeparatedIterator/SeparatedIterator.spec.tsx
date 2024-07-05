import { renderSetup } from '../../utils/test/renderSetup';
import { screen } from '@testing-library/react';
import { SeparatedIterator } from '.';

interface TestItem {
  id: number;
  name: string;
}

const testItems: TestItem[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

describe('SeparatedIterator', () => {
  it('should render the correct number of items with separators', () => {
    renderSetup(
      <SeparatedIterator
        items={testItems}
        renderItem={(item) => <div>{item.name}</div>}
        separator={<div>separator</div>}
      />
    );

    const renderItems = screen.getAllByText(/Item \d/);
    const separators = screen.getAllByText(/separator/);

    expect(renderItems).toHaveLength(testItems.length);
    expect(separators).toHaveLength(testItems.length - 1);
  });

  it('should render the correct number of items and separators at the specified interval', () => {
    renderSetup(
      <SeparatedIterator
        items={testItems}
        renderItem={(item) => <div>{item.name}</div>}
        separatorInterval={2}
        separator={<div>separator</div>}
      />
    );

    const renderItems = screen.getAllByText(/Item \d/);
    const separators = screen.getAllByText(/separator/);

    expect(renderItems).toHaveLength(testItems.length);
    expect(separators).toHaveLength(1);
  });

  it('should render the correct number of separators when includeLastSeparator is true', () => {
    renderSetup(
      <SeparatedIterator
        items={testItems}
        renderItem={(item) => <div>{item.name}</div>}
        separator={<div>separator</div>}
        includeLastSeparator
      />
    );

    const renderItems = screen.getAllByText(/Item \d/);
    const separators = screen.getAllByText(/separator/);

    expect(renderItems).toHaveLength(testItems.length);
    expect(separators).toHaveLength(testItems.length);
  });

  it('should not render any items when items prop is undefined', () => {
    renderSetup(
      <SeparatedIterator
        items={undefined}
        renderItem={() => <div>Item</div>}
        separator={<div>separator</div>}
        includeLastSeparator
      />
    );

    const renderItems = screen.queryAllByText(/Item \d/);
    const separators = screen.queryAllByText(/separator/);

    expect(renderItems).toHaveLength(0);
    expect(separators).toHaveLength(0);
  });
});
