import { renderSetup } from '../../utils/test/renderSetup';
import { screen } from '@testing-library/react';
import { Iterate } from '.';

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

describe('Iterate', () => {
  it('should render the correct number of items as div elements', () => {
    renderSetup(
      <Iterate
        items={testItems}
        renderItem={(item) => <div>{item.name}</div>}
      />
    );

    const renderItems = screen.getAllByText(/Item \d/);

    expect(renderItems).toHaveLength(testItems.length);
  });

  it('should render the correct number of items as TestComponent elements', () => {
    renderSetup(
      <Iterate
        items={testItems}
        renderItem={(item) => <TestComponent {...item} />}
      />
    );

    const renderItems = screen.getAllByText(/Item \d/);

    expect(renderItems).toHaveLength(testItems.length);
  });
});
