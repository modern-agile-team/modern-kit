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
  it('should re-render component each time returned function is called', () => {
    render(<TestComponent />);

    const button = screen.getByText('Button');

    expect(screen.getByText('force')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('update')).toBeInTheDocument();
  });
});
