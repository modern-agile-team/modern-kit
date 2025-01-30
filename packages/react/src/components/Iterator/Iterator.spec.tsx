import { describe, it, expect } from 'vitest';
import { renderSetup } from '../../_internal/test/renderSetup';
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
  it('div 요소로 올바른 수의 아이템이 렌더링되어야 합니다', () => {
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

  it('items prop이 undefined일 때 아무것도 렌더링되지 않아야 합니다', () => {
    renderSetup(
      <Iterator items={undefined} renderItem={() => <div>Item</div>} />
    );

    const renderItems = screen.queryAllByText(/Item/);
    expect(renderItems).toHaveLength(0);
  });

  it('items prop이 문자열 배열일 때 올바른 수의 아이템이 렌더링되어야 합니다', () => {
    renderSetup(
      <Iterator
        items={['Item 1', 'Item 2', 'Item 3']}
        renderItem={(item) => <div>{item}</div>}
      />
    );

    const renderItems = screen.getAllByText(/Item \d/);
    expect(renderItems).toHaveLength(3);
  });

  it('TestComponent 요소로 올바른 수의 아이템이 렌더링되어야 합니다', () => {
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
