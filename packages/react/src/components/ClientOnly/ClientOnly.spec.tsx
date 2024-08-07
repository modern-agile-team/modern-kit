import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderSetup } from '../../utils/test/renderSetup';
import { renderToString } from 'react-dom/server';
import { ClientOnly } from '.';
import { ReactNode } from 'react';

const TestComponent = ({ fallback }: { fallback?: ReactNode }) => {
  return (
    <ClientOnly fallback={fallback}>
      <div>children component</div>
    </ClientOnly>
  );
};

describe('ClientOnly', () => {
  it('should render a fallback component before mount', () => {
    const html = renderToString(
      <TestComponent fallback={<div>fallback component</div>} />
    );

    expect(html).toContain('fallback component');
    expect(html).not.toContain('children component');
  });

  it('should render an empty fragment as fallback by default', () => {
    const html = renderToString(<TestComponent />);

    expect(html).toBe('');
    expect(html).not.toContain('children component');
  });

  it('should render a children component after mount', () => {
    renderSetup(<TestComponent />);

    expect(screen.queryByText('fallback component')).not.toBeInTheDocument();
    expect(screen.getByText('children component')).toBeInTheDocument();
  });
});
