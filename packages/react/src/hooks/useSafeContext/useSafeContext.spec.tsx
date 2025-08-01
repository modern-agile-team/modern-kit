import { describe, it, expect } from 'vitest';
import { createContext } from 'react';
import { useSafeContext } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';

interface ThemeContextValue {
  theme: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

const TestComponent = ({ errorMessage }: { errorMessage?: string }) => {
  const context = useSafeContext(ThemeContext, {
    errorMessage,
  });
  return <div>Theme: {context?.theme}</div>;
};

describe('useSafeContext', () => {
  it('Context가 Provider 내부에서 사용되지 않았을 때 커스텀 에러 메시지와 함께 에러를 발생시켜야 합니다.', () => {
    expect(() => renderSetup(<TestComponent />)).toThrow(
      '[SafeContext]: Provider 내부에서 사용되어야 합니다.'
    );
  });
});
