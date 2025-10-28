import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { useComputedStyleObserver } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';

const TestComponent = () => {
  const { ref, value, setValue } =
    useComputedStyleObserver<HTMLDivElement>('width');

  return (
    <div ref={ref} style={{ width: '100px' }}>
      <p role="paragraph">{`${value}`}</p>
      <button onClick={() => setValue('200px')}>setValue 변경</button>
      <button onClick={() => ref.current?.style.setProperty('width', '200px')}>
        setProperty 변경
      </button>
    </div>
  );
};

describe('useComputedStyleObserver', () => {
  it('value는 초기 상태가 100px이어야 합니다.', () => {
    renderSetup(<TestComponent />);

    expect(screen.getByRole('paragraph')).toHaveTextContent('100px');
  });

  it('setValue 함수를 호출하면 이를 실시간으로 반영해야 합니다.', async () => {
    const { user } = renderSetup(<TestComponent />);

    await user.click(screen.getByRole('button', { name: 'setValue 변경' }));

    expect(screen.getByRole('paragraph')).toHaveTextContent('200px');
  });

  it('setProperty로 직접 스타일을 변경하더라도 이를 실시간으로 반영해야 합니다.', async () => {
    const { user } = renderSetup(<TestComponent />);

    await user.click(screen.getByRole('button', { name: 'setProperty 변경' }));

    expect(screen.getByRole('paragraph')).toHaveTextContent('200px');
  });
});
