import { describe, it, expect } from 'vitest';
import { renderHook, screen } from '@testing-library/react';
import { createSafeContext } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';

interface TestContextValue {
  value: string;
  count: number;
}

const defaultValue: TestContextValue = {
  value: 'default',
  count: 0,
};

describe('createSafeContext', () => {
  describe('기본 값이 있는 경우', () => {
    const [TestWithDefaultValueProvider, useTestWithDefaultValueContext] =
      createSafeContext(defaultValue, 'TestContext');

    const TestComponentWithDefaultValue = () => {
      const context = useTestWithDefaultValueContext();
      return (
        <div>
          <span data-testid="value">{context.value}</span>
          <span data-testid="count">{context.count}</span>
        </div>
      );
    };

    it('Provider 내부에서 context hook을 사용하지 않으면 기본 값을 반환해야 합니다.', () => {
      renderSetup(<TestComponentWithDefaultValue />);

      expect(screen.getByTestId('value')).toHaveTextContent('default');
      expect(screen.getByTestId('count')).toHaveTextContent('0');
    });

    it('Provider 내부에서 context hook을 사용하면 전달된 값을 반환해야 합니다.', () => {
      const contextValue = {
        value: 'test value',
        count: 42,
      };

      renderSetup(
        <TestWithDefaultValueProvider value={contextValue}>
          <TestComponentWithDefaultValue />
        </TestWithDefaultValueProvider>
      );

      expect(screen.getByTestId('value')).toHaveTextContent('test value');
      expect(screen.getByTestId('count')).toHaveTextContent('42');
    });
  });

  describe('기본 값이 없는 경우', () => {
    const [TestWithoutDefaultValueProvider, useTestWithoutDefaultValueContext] =
      createSafeContext<TestContextValue>(null, 'TestContext');

    const TestComponentWithoutDefaultValue = () => {
      const context = useTestWithoutDefaultValueContext();
      return (
        <div>
          <span data-testid="value">{context.value}</span>
          <span data-testid="count">{context.count}</span>
        </div>
      );
    };

    it('Provider 내부에서 context hook을 사용하면 전달된 값을 반환해야 합니다.', () => {
      const contextValue = {
        value: 'test value',
        count: 42,
      };

      renderSetup(
        <TestWithoutDefaultValueProvider value={contextValue}>
          <TestComponentWithoutDefaultValue />
        </TestWithoutDefaultValueProvider>
      );

      expect(screen.getByTestId('value')).toHaveTextContent('test value');
      expect(screen.getByTestId('count')).toHaveTextContent('42');
    });

    it('Provider 외부에서 context hook을 사용하면 에러를 발생시켜야 합니다.', () => {
      expect(() => renderSetup(<TestComponentWithoutDefaultValue />)).toThrow(
        '[TestContext]: Provider 내부에서 사용되어야 합니다.'
      );
    });
  });

  describe('displayName 옵션', () => {
    it('displayName 옵션이 없으면 에러 메시지가 SafeContext로 설정됩니다.', () => {
      const [, useTestContext] = createSafeContext(null);

      expect(() => renderHook(() => useTestContext())).toThrow(
        '[SafeContext]: Provider 내부에서 사용되어야 합니다.'
      );
    });

    it('displayName 옵션이 있으면 에러 메시지가 해당 값으로 설정됩니다.', () => {
      const [, useTestContext] = createSafeContext(null, 'TestContext');

      expect(() => renderHook(() => useTestContext())).toThrow(
        '[TestContext]: Provider 내부에서 사용되어야 합니다.'
      );
    });
  });
});
