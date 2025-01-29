import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';
import { Delay } from '.';

const DELAY_TIME = 500;

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

const TestComponent = ({ delay }: { delay: number }) => {
  return (
    <Delay delay={delay} fallback={<div>fallback</div>}>
      <div>children</div>
    </Delay>
  );
};

describe('Delay', () => {
  it('delay가 지정된 시간 이후에 자식 컴포넌트가 렌더링되어야 합니다.', async () => {
    renderSetup(<TestComponent delay={DELAY_TIME} />);

    expect(screen.getByText('fallback')).toBeInTheDocument();

    vi.advanceTimersByTime(DELAY_TIME);

    await waitFor(() => {
      expect(screen.getByText('children')).toBeInTheDocument();
    });
  });

  it('delay가 0이면 자식 컴포넌트가 바로 렌더링되어야 합니다.', () => {
    renderSetup(<TestComponent delay={0} />);

    expect(screen.getByText('children')).toBeInTheDocument();
    expect(screen.queryByText('fallback')).not.toBeInTheDocument();
  });

  it('delay가 음수면 자식 컴포넌트가 바로 렌더링되어야 합니다.', () => {
    renderSetup(<TestComponent delay={-10} />);

    expect(screen.getByText('children')).toBeInTheDocument();
    expect(screen.queryByText('fallback')).not.toBeInTheDocument();
  });
});
