import { describe } from 'vitest';

import { renderSetup } from '../../utils/test/renderSetup';
import { fireEvent, screen } from '@testing-library/react';

import { useMouse } from '.';
import { useMemo } from 'react';

describe('useMouse', () => {
  const TestComponent = () => {
    const { targetRef, position } = useMouse<HTMLDivElement>();

    const style = useMemo(() => {
      return {
        width: '200px',
        height: '200px',
        margin: '30px',
        backgroundColor: 'red',
      };
    }, []);

    return (
      <>
        <div ref={targetRef} role="box" style={style} />
        <p>clientX: {position.clientX}</p>
        <p>clientY: {position.clientY}</p>
        <p>screenX: {position.screenX}</p>
        <p>screenY: {position.screenY}</p>
        <p>pageX: {position.pageX}</p>
        <p>pageY: {position.pageY}</p>
        <p>relativeX: {position.relativeX}</p>
        <p>relativeY: {position.relativeY}</p>
      </>
    );
  };

  it('should return initial position when first render', async () => {
    renderSetup(<TestComponent />);

    expect(screen.getByText('clientX: NaN')).toBeInTheDocument();
    expect(screen.getByText('clientY: NaN')).toBeInTheDocument();
    expect(screen.getByText('screenX: NaN')).toBeInTheDocument();
    expect(screen.getByText('screenY: NaN')).toBeInTheDocument();
    expect(screen.getByText('pageX: NaN')).toBeInTheDocument();
    expect(screen.getByText('pageY: NaN')).toBeInTheDocument();
    expect(screen.getByText('relativeX: NaN')).toBeInTheDocument();
    expect(screen.getByText('relativeY: NaN')).toBeInTheDocument();
  });

  it('should return correct position when mouse move', async () => {
    renderSetup(<TestComponent />);

    const box = screen.getByRole('box');

    fireEvent.mouseMove(box, {
      clientX: 150,
      clientY: 150,
      screenX: 150,
      screenY: 150,
    });

    expect(screen.getByText('clientX: 150')).toBeInTheDocument();
    expect(screen.getByText('clientY: 150')).toBeInTheDocument();
    expect(screen.getByText('screenX: 150')).toBeInTheDocument();
    expect(screen.getByText('screenY: 150')).toBeInTheDocument();
    expect(screen.getByText('pageX: 150')).toBeInTheDocument();
    expect(screen.getByText('pageY: 150')).toBeInTheDocument();
  });

  it('should return correct relative position when mouse move', async () => {
    renderSetup(<TestComponent />);

    const box = screen.getByRole('box');

    vi.spyOn(box, 'getBoundingClientRect').mockReturnValue({
      x: 30,
      y: 30,
      width: 200,
      height: 200,
      top: 30,
      left: 30,
      right: 230,
      bottom: 230,
      toJSON: () => {}, // 타입에러를 해결하기 위해 추가합니다.
    });

    fireEvent.mouseMove(box, {
      clientX: 150,
      clientY: 150,
      screenX: 150,
      screenY: 150,
    });

    expect(screen.getByText('clientX: 150')).toBeInTheDocument();
    expect(screen.getByText('clientY: 150')).toBeInTheDocument();
    expect(screen.getByText('screenX: 150')).toBeInTheDocument();
    expect(screen.getByText('screenY: 150')).toBeInTheDocument();
    expect(screen.getByText('pageX: 150')).toBeInTheDocument();
    expect(screen.getByText('pageY: 150')).toBeInTheDocument();
    expect(screen.getByText('relativeX: 120')).toBeInTheDocument();
    expect(screen.getByText('relativeY: 120')).toBeInTheDocument();
  });
});
