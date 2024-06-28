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
});
