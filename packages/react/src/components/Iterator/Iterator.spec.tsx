import { describe, it, expect } from 'vitest';
import { renderSetup } from '../../utils/test/renderSetup';
import { screen } from '@testing-library/react';
import { Iterator } from '.';

interface TestItem {
  id: number;
  name: string;
}

const testItems: TestItem[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

const TestComponent = ({ name }: TestItem) => {
  return <div>{name}</div>;
};

describe('Iterator', () => {
  it('should render the correct number of items as div elements', () => {
    renderSetup(
      <Iterator
        itemKey="id"
        items={testItems}
        renderItem={(item) => <div>{item.name}</div>}
      />
    );

    const renderItems = screen.getAllByText(/Item \d/);

    expect(renderItems).toHaveLength(testItems.length);
  });

  it('should not render any items when items prop is undefined', () => {
    renderSetup(
      <Iterator items={undefined} renderItem={() => <div>Item</div>} />
    );

    const renderItems = screen.queryAllByText(/Item/);
    expect(renderItems).toHaveLength(0);
  });

  it('should render the correct number of items when items prop is an array of strings', () => {
    renderSetup(
      <Iterator
        items={['Item 1', 'Item 2', 'Item 3']}
        renderItem={(item) => <div>{item}</div>}
      />
    );

    const renderItems = screen.getAllByText(/Item \d/);
    expect(renderItems).toHaveLength(3);
  });

  it('should render the correct number of items as TestComponent elements', () => {
    renderSetup(
      <Iterator
        itemKey="id"
        items={testItems}
        renderItem={(item) => <TestComponent {...item} />}
      />
    );

    const renderItems = screen.getAllByText(/Item \d/);

    expect(renderItems).toHaveLength(testItems.length);
  });
});
