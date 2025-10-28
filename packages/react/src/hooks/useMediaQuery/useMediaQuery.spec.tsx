import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { useMediaQuery } from '.';
import { renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

const originalMatchMedia = window.matchMedia;

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(min-width: 600px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    }),
  });
});

afterEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: originalMatchMedia,
  });
});

const TestComponent = ({
  initialValue = false,
}: {
  initialValue?: boolean;
}) => {
  const mediaQuery = useMediaQuery('(min-width: 600px)', initialValue);

  return <p role="paragraph">{`${mediaQuery}`}</p>;
};

describe('useMediaQuery', () => {
  it('쿼리가 일치할 때 true를 반환해야 합니다', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current).toBe(true);
  });

  it('쿼리가 일치하지 않을 때 false를 반환해야 합니다', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 599px)'));

    expect(result.current).toBe(false);
  });

  it('defaultValue가 제공되면, 클라이언트 환경이 아닐 때 defaultValue를 반환해야 합니다', () => {
    const html = renderToString(<TestComponent initialValue={true} />);

    expect(html).toContain('true');
  });
});
