import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import { renderSetup } from '../../utils/test/renderSetup';
import { renderToString } from 'react-dom/server';

import { ClientGate } from '.';

const TestComponent = ({ fallback }: { fallback?: JSX.Element }) => {
  return (
    <ClientGate fallback={fallback}>
      <div>children component</div>
    </ClientGate>
  );
};

describe('ClientGate', () => {
  it('서버사이드 렌더링시에는 fallback 컴포넌트가 렌더링되어야 합니다.', () => {
    const html = renderToString(
      <TestComponent fallback={<div>fallback component</div>} />
    );

    expect(html).toContain('fallback component');
    expect(html).not.toContain('children component');
  });

  it('클라이언트사이드 렌더링시에는 children 컴포넌트가 렌더링되어야 합니다.', () => {
    renderSetup(<TestComponent fallback={<div>fallback component</div>} />);

    expect(screen.queryByText('fallback component')).not.toBeInTheDocument();
    expect(screen.getByText('children component')).toBeInTheDocument();
  });

  it('서버 사이드 렌더링 시 fallback이 없을 경우 아무것도 렌더링되어서는 안됩니다.', () => {
    const html = renderToString(<TestComponent />);

    expect(html).not.toContain('fallback component');
    expect(html).not.toContain('children component');
  });
});
