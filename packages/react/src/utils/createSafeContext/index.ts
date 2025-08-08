import { createContext } from 'react';
import { useSafeContext as useInternalSafeContext } from '../../hooks/useSafeContext';

/**
 * @description Context를 안전하게 생성하고, 사용할 수 있도록 도와주는 유틸리티 함수입니다.
 *
 * 기본값이 없다면 Provider 외부에서 useSafeContext를 사용할 때 에러를 발생시킵니다.
 * 기본값이 있다면 Provider 외부에서 useSafeContext를 사용하더라도 에러가 발생하지 않고 기본값을 반환합니다.
 *
 * Provider의 value prop은 필수이며, 기본값이 없더라도 null/undefined는 허용하지 않습니다.
 *
 * @template T 컨텍스트 값의 타입
 *
 * @param {T | null} [defaultValue=null] Context의 기본 값
 * @param {string} [displayName='SafeContext'] 컨텍스트 이름
 * @returns {[React.Provider<T>, () => NonNullable<T>]} Provider와 useSafeContext 함수를 반환합니다.
 *
 * @throws 기본값이 없는 상태에서 Provider 외부에서 useSafeContext를 사용할 때 에러를 발생시킵니다.
 *
 * @example
 * ```tsx
 * const [TestProvider, useTestContext] =
 *   createSafeContext<{ value: string }>(null, 'TestContext');
 *
 * function TestComponent() {
 *   const context = useTestContext();
 *   // 안전하게 접근했기 때문에 context는 NonNullable 타입을 보장합니다.
 *
 *   return <div>{context.value}</div>;
 * }
 *
 * <TestProvider value={{ value: 'test' }}>
 *   <TestComponent />
 * </TestProvider>
 * ```
 */
export function createSafeContext<T>(
  defaultValue: T | null = null,
  displayName: string = 'SafeContext'
): [React.Provider<T>, () => NonNullable<T>] {
  const Context = createContext<T | null>(defaultValue);
  Context.displayName = displayName;

  function useSafeContext(): NonNullable<T> {
    return useInternalSafeContext(Context);
  }

  return [Context.Provider as React.Provider<T>, useSafeContext];
}
