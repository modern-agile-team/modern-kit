import { Context, useContext } from 'react';

interface UseSafeContextOptions {
  errorMessage?: string;
}

/**
 * @description React Context에 안전하게 접근하기 위한 훅입니다.
 *
 * Provider 내부에서 사용되지 않았을 때 에러를 발생시키며, 에러가 발생하지 않으면 안전하게 접근했기 때문에 NonNullable한 Context 값을 반환합니다.
 *
 * @template T - Context 타입
 *
 * @param {Context<T>} context - React Context
 * @param {UseSafeContextOptions} [options] - useSafeContext 옵션
 * @param {string} [options.errorMessage] - Context가 Provider 내부에서 사용되지 않았을 때 표시할 에러 메시지
 *
 * @returns {NonNullable<T>} NonNullable한 Context 값을 반환합니다.
 *
 * @throws {Error} Context가 Provider 내부에서 사용되지 않았을 때 발생
 *
 * @example
 * ```tsx
 * const ThemeContext = createContext<{ theme: string } | null>(null);
 *
 * function useThemeContext() {
 *   return useSafeContext(ThemeContext, {
 *     errorMessage: 'useThemeContext는 ThemeProvider 내부에서 사용되어야 합니다'
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
): NonNullable<T> {
  const contextValue = useContext(context);
  const { errorMessage } = options;

  if (contextValue == null) {
    const displayName = context.displayName || 'SafeContext';

    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new Error(`[${displayName}]: Provider 내부에서 사용되어야 합니다.`);
  }

  return contextValue;
}
