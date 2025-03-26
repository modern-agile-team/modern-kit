import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { useIsClient } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';
import { renderToString } from 'react-dom/server';

const TestComponent = () => {
  const isClient = useIsClient();

  return <p role="paragraph">{isClient ? 'client' : 'server'}</p>;
};

describe('useIsClient', () => {
  it('현재 렌더링 환경이 클라이언트인 경우 client 텍스트가 렌더링되어야 합니다.', () => {
    renderSetup(<TestComponent />);

    const paragraph = screen.getByRole('paragraph');
    expect(paragraph).toHaveTextContent('client');
  });

  it('현재 렌더링 환경이 서버인 경우 server 텍스트가 렌더링되어야 합니다.', () => {
    // renderToString은 서버사이드에서 실행됩니다.
    const html = renderToString(<TestComponent />);

    expect(html).toContain('server');
  });
});
