import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';
import { useControllableState } from '.';

const TestComponent = ({
  value,
  defaultValue,
}: {
  value?: number;
  defaultValue?: number;
}) => {
  const [controllableValue, setControllableValue] = useControllableState({
    value,
    defaultValue,
  });

  const handleChange = () => {
    const newValue = (controllableValue ?? 0) + 1;
    setControllableValue(newValue);
  };

  return (
    <>
      <h1 role="test-value">{controllableValue ?? 'undefined'}</h1>
      <button onClick={handleChange}>increment</button>
    </>
  );
};

const ControlledTestComponent = () => {
  const [externalValue, setExternalValue] = useState(10);

  return (
    <>
      <TestComponent value={externalValue} />
      <button
        onClick={() => setExternalValue(externalValue + 5)}
        data-testid="external-increment">
        external increment
      </button>
    </>
  );
};

describe('useControllableState', () => {
  describe('비제어 상태(uncontrolled mode) - value undefined', () => {
    it('defaultValue가 있을 때 useControllableState의 value는 defaultValue로 초기화되어야 한다', () => {
      renderSetup(<TestComponent defaultValue={5} />);

      const value = screen.getByRole('test-value');
      expect(value).toHaveTextContent('5');
    });

    it('defaultValue가 undefined일 때 useControllableState의 value는 undefined로 초기화되어야 한다', () => {
      renderSetup(<TestComponent />);

      const value = screen.getByRole('test-value');
      expect(value).toHaveTextContent('undefined');
    });

    it('useControllableState의 setValue로 값을 변경할 수 있어야 한다', async () => {
      const { user } = renderSetup(<TestComponent defaultValue={0} />);

      const value = screen.getByRole('test-value');
      const button = screen.getByRole('button', { name: 'increment' });

      expect(value).toHaveTextContent('0');

      await user.click(button);
      expect(value).toHaveTextContent('1');

      await user.click(button);
      expect(value).toHaveTextContent('2');
    });
  });

  describe('제어 상태(controlled mode) - value가 있을 때', () => {
    it('초기 value가 있을 때 useControllableState의 value는 value로 초기화되어야 한다', () => {
      renderSetup(<TestComponent value={10} defaultValue={5} />);

      const value = screen.getByRole('test-value');
      expect(value).toHaveTextContent('10');
    });

    it('useControllableState의 setValue로 값을 변경할 수 없어야 한다', async () => {
      const { user } = renderSetup(<TestComponent value={10} />);

      const value = screen.getByRole('test-value');
      const button = screen.getByRole('button', { name: 'increment' });

      expect(value).toHaveTextContent('10');

      await user.click(button);
      expect(value).toHaveTextContent('10'); // 변경되지 않음

      await user.click(button);
      expect(value).toHaveTextContent('10'); // 여전히 변경되지 않음
    });

    it('외부 value를 통해 useControllableState의 value를 제어해야 한다', async () => {
      const { user } = renderSetup(<ControlledTestComponent />);

      const value = screen.getByRole('test-value');
      const externalButton = screen.getByTestId('external-increment');

      expect(value).toHaveTextContent('10');

      await user.click(externalButton);
      expect(value).toHaveTextContent('15');

      await user.click(externalButton);
      expect(value).toHaveTextContent('20');
    });
  });
});
