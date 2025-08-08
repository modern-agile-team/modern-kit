import { describe, it, expect } from 'vitest';
import { createContext } from 'react';
import { screen } from '@testing-library/react';
import { useSafeContext } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';

interface ThemeContextValue {
  theme: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
ThemeContext.displayName = 'ThemeContext';

const TestComponent = () => {
  const context = useSafeContext(ThemeContext);
  return <div>Theme: {context.theme}</div>;
};

describe('useSafeContext', () => {
  it('Context가 Provider 내부에서 사용되면 정상적으로 값을 노출해야 합니다.', () => {
    renderSetup(
      <ThemeContext.Provider value={{ theme: 'dark' }}>
        <TestComponent />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Theme: dark')).toBeInTheDocument();
  });

  it('Context가 Provider 내부에서 사용되지 않았을 때 에러를 발생시켜야 합니다.', () => {
    expect(() => renderSetup(<TestComponent />)).toThrow(
      '[ThemeContext]: Provider 내부에서 사용되어야 합니다.'
    );
  });
});
