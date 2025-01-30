import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useForceUpdate } from '.';
import { useCallback, useRef } from 'react';

const TestComponent = () => {
  const forceUpdate = useForceUpdate();

  const testRef = useRef('force');

  const handleClick = useCallback(() => {
    testRef.current = 'update';
    forceUpdate();
  }, [forceUpdate]);

  return (
    <div>
      <p>{testRef.current}</p>
      <button onClick={handleClick}>Button</button>;
    </div>
  );
};

describe('useForceUpdate', () => {
  it('반환된 함수가 호출될 때마다 컴포넌트가 리렌더링되어야 합니다', () => {
    render(<TestComponent />);

    const button = screen.getByText('Button');

    expect(screen.getByText('force')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('update')).toBeInTheDocument();
  });
});
