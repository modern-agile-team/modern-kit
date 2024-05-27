import { useHover } from '.';
import { renderSetup } from '../../utils/test/renderSetup';
import { screen } from '@testing-library/react';
import { Mock } from 'vitest';

describe('useHover', () => {
  const TestComponent = ({
    enterMockFn,
    leaveMockFn,
  }: {
    enterMockFn?: Mock<any, any>;
    leaveMockFn?: Mock<any, any>;
  }) => {
    const { ref, isHovered } = useHover<HTMLDivElement>({
      onEnter: enterMockFn,
      onLeave: leaveMockFn,
    });

    return (
      <div>
        <div ref={ref} role="hover-target">
          Hover me
        </div>
        {isHovered && <div role="conditional-render-text">hovered</div>}
      </div>
    );
  };

  it('should trigger callback at target hover and leave', async () => {
    const enterMockFn = vi.fn();
    const leaveMockFn = vi.fn();

    const { user } = renderSetup(
      <TestComponent enterMockFn={enterMockFn} leaveMockFn={leaveMockFn} />,
    );

    const hoverTarget = screen.getByRole('hover-target');

    await user.hover(hoverTarget);

    expect(enterMockFn).toBeCalled();

    await user.unhover(hoverTarget);

    expect(leaveMockFn).toBeCalled();
  });

  it('should return the value of isHover based on whether the element is hovered.', async () => {
    const { user } = renderSetup(<TestComponent />);

    const hoverTarget = screen.getByRole('hover-target');

    expect(
      screen.queryByRole('conditional-render-text'),
    ).not.toBeInTheDocument();

    await user.hover(hoverTarget);

    expect(screen.queryByRole('conditional-render-text')).toBeInTheDocument();

    await user.unhover(hoverTarget);

    expect(
      screen.queryByRole('conditional-render-text'),
    ).not.toBeInTheDocument();
  });
});
