import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import { renderSetup } from '../../utils/test/renderSetup';
import { renderToString } from 'react-dom/server';

import { ClientGate } from '.';

const TestComponent = () => {
  return (
    <ClientGate fallback={<div>fallback component</div>}>
      <div>children component</div>
    </ClientGate>
  );
};

describe('ClientGate', () => {
  it('서버사이드 렌더링시에는 fallback 컴포넌트가 나타난다.', () => {
    const html = renderToString(<TestComponent />);

    expect(html).toContain('fallback component');
    expect(html).not.toContain('children component');
  });

  it('클라이언트사이드 렌더링시에는 children 컴포넌트가 나타난다.', () => {
    renderSetup(<TestComponent />);

    expect(screen.queryByText('fallback component')).not.toBeInTheDocument();
    expect(screen.getByText('children component')).toBeInTheDocument();
  });
});
