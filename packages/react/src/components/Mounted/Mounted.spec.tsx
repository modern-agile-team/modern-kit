import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import { renderSetup } from '../../_internal/test/renderSetup';
import { renderToString } from 'react-dom/server';

import { Mounted } from '.';

const TestComponent = ({ fallback }: { fallback?: JSX.Element }) => {
  return (
    <Mounted fallback={fallback}>
      <div>children component</div>
    </Mounted>
  );
};

describe('Mounted', () => {
  it('마운트 전에는 fallback 컴포넌트가 나타난다.', () => {
    const html = renderToString(
      <TestComponent fallback={<div>fallback component</div>} />
    );

    expect(html).toContain('fallback component');
    expect(html).not.toContain('children component');
  });

  it('마운트 후에는 children 컴포넌트가 나타난다.', () => {
    renderSetup(<TestComponent fallback={<div>fallback component</div>} />);

    expect(screen.queryByText('fallback component')).not.toBeInTheDocument();
    expect(screen.getByText('children component')).toBeInTheDocument();
  });

  it('fallback이 없을 경우 아무것도 렌더링되어서는 안됩니다.', () => {
    const html = renderToString(<TestComponent />);

    expect(html).not.toContain('fallback component');
    expect(html).not.toContain('children component');
  });
});
