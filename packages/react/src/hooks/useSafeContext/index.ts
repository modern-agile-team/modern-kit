import { Context, useContext } from 'react';

interface UseSafeContextOptions {
  errorMessage?: string;
  contextDisplayName?: string;
}

/**
 * @description React Context에 안전하게 접근하기 위한 훅입니다.
 *
 * @template T - Context 타입
 *
 * @param {Context<T>} context - React Context
 * @param {UseSafeContextOptions} [options] - 옵션
 * @param {string} [options.errorMessage] - Context가 null 또는 undefined일 때 표시할 에러 메시지
 *
 * @returns {T} Context 값. null 또는 undefined가 될 수 없습니다.
 *
 * @throws {Error} Context가 null 또는 undefined일 때 발생
 *
 * @example
 * ```tsx
 * const ThemeContext = createContext<{ theme: string } | null>(null);
 *
 * function useThemeContext() {
 *   return useSafeContext(ThemeContext, {
 *     errorMessage: 'useTheme는 ThemeProvider 내부에서 사용되어야 합니다'
 *   });
 * }
 *
 * function MyComponent() {
 *   const { theme } = useThemeContext();
 *   return <div>현재 테마: {theme}</div>;
 * }
 * ```
 */
export function useSafeContext<T>(
  context: Context<T>,
  options: UseSafeContextOptions = {}
): T {
  const contextValue = useContext(context);
  const { errorMessage, contextDisplayName } = options;

  if (contextValue == null) {
    const displayName =
      contextDisplayName || context.displayName || 'SafeContext';

    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new Error(`[${displayName}]: Provider 내부에서 사용되어야 합니다.`);
  }

  return contextValue;
}
