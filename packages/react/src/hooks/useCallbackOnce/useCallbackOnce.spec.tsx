import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, renderHook, waitFor } from '@testing-library/react';
import { useCallbackOnce } from '.';
import { useState } from 'react';

function TestComponent({ onCallback }: { onCallback: () => void }) {
  const [value, setValue] = useState(0);

  const handleClick = useCallbackOnce(() => {
    onCallback();
  });

  return (
    <div>
      <p>현재 상태: {value}</p>
      <button onClick={handleClick}>CallbackOnce 호출</button>
      <button onClick={() => setValue((v) => v + 1)}>
        상태 변경으로 리렌더링
      </button>
    </div>
  );
}

describe('useCallbackOnce', () => {
  it('콜백이 한 번만 실행되어야 합니다.', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useCallbackOnce(callback));

    await waitFor(() => {
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('콜백은 최초 한 번만 실행되고, 상태 변경 후에도 다시 실행되지 않아야 한다', () => {
    const spy = vi.fn();
    const { getByText } = render(<TestComponent onCallback={spy} />);

    const callOnceButton = getByText('CallbackOnce 호출');
    const rerenderButton = getByText('상태 변경으로 리렌더링');

    // 1회 클릭 - 콜백 실행됨
    fireEvent.click(callOnceButton);
    expect(spy).toHaveBeenCalledTimes(1);

    // 다시 클릭 - 콜백 실행되지 않음
    fireEvent.click(callOnceButton);
    expect(spy).toHaveBeenCalledTimes(1);

    // 상태 변경 - 리렌더링 발생
    fireEvent.click(rerenderButton);
    getByText('현재 상태: 1'); // 텍스트로 상태 변화 확인

    // 다시 클릭 - 콜백 여전히 실행되지 않음
    fireEvent.click(callOnceButton);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
