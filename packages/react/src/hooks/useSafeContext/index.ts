import { invariant } from '@modern-kit/utils';
import { Context, useContext } from 'react';

/**
 * @description React Context에 안전하게 접근하기 위한 훅입니다.
 *
 * Context에 기본값이 없다면(null/undefined) Provider 내부에서 사용되지 않았을 때 에러를 발생시킵니다.
 * Context에 기본값이 있다면 Provider 내부에서 사용되지 않았을 때 에러가 발생하지 않고 기본값을 반환합니다.
 *
 * 에러가 발생하지 않으면 안전하게 접근했기 때문에 NonNullable한 Context 값을 반환합니다.
 *
 * @template T - Context 타입
 *
 * @param {Context<T>} context - React Context
 * @returns {NonNullable<T>} NonNullable한 Context 값을 반환합니다.
 *
 * @throws Context의 기본값이 없는 상태에서 Provider 내부에서 사용되지 않았을 때 발생합니다.
 *
 * @example
 * ```tsx
 * const ThemeContext = createContext<{ theme: string } | null>(null);
 *
 * function MyComponent() {
 *   const context = useSafeContext(ThemeContext);
 *   // 안전하게 접근했기 때문에 context는 NonNullable 타입을 보장합니다.
 *
 *   return <div>현재 테마: {context.theme}</div>;
 * }
 *
 * <ThemeContext.Provider value={{ theme: 'dark' }}>
 *   <MyComponent />
 * </ThemeContext.Provider>
 * ```
 */
export function useSafeContext<T>(context: Context<T>): NonNullable<T> {
  const contextValue = useContext(context);
  const displayName = context.displayName ?? 'SafeContext';

  invariant(
    contextValue,
    `[${displayName}]: Provider 내부에서 사용되어야 합니다.`
  );

  return contextValue as NonNullable<T>;
}
