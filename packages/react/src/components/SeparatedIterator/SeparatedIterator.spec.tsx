import { describe, it, expect } from 'vitest';
import { renderSetup } from '../../_internal/test/renderSetup';
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
  it('구분자와 함께 올바른 수의 아이템이 렌더링되어야 합니다', () => {
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

  it('지정된 간격으로 올바른 수의 아이템과 구분자가 렌더링되어야 합니다', () => {
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

  it('includeLastSeparator가 true일 때 올바른 수의 구분자가 렌더링되어야 합니다', () => {
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

  it('items prop이 undefined일 때 아무것도 렌더링되지 않아야 합니다', () => {
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
