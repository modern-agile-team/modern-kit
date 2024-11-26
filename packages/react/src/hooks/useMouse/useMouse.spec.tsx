import { describe, it, expect, vi } from 'vitest';
import { renderSetup } from '../../_internal/test/renderSetup';
import { fireEvent, screen } from '@testing-library/react';

import { useMouse } from '.';

describe('useMouse with connected ref', () => {
  const RefConnectedComponent = () => {
    const { ref, position } = useMouse<HTMLDivElement>();

    return (
      <>
        <div ref={ref} role="box" />
        <p>clientX: {position.clientX ?? 'null'}</p>
        <p>clientY: {position.clientY ?? 'null'}</p>
        <p>screenX: {position.screenX ?? 'null'}</p>
        <p>screenY: {position.screenY ?? 'null'}</p>
        <p>pageX: {position.pageX ?? 'null'}</p>
        <p>pageY: {position.pageY ?? 'null'}</p>
        <p>elementRelativeX: {position.elementRelativeX ?? 'null'}</p>
        <p>elementRelativeY: {position.elementRelativeY ?? 'null'}</p>
        <p>elementPositionX: {position.elementPositionX ?? 'null'}</p>
        <p>elementPositionY: {position.elementPositionY ?? 'null'}</p>
      </>
    );
  };

  it('should return null position when first render', async () => {
    renderSetup(<RefConnectedComponent />);

    expect(screen.getByText('clientX: null')).toBeInTheDocument();
    expect(screen.getByText('clientY: null')).toBeInTheDocument();
    expect(screen.getByText('screenX: null')).toBeInTheDocument();
    expect(screen.getByText('screenY: null')).toBeInTheDocument();
    expect(screen.getByText('pageX: null')).toBeInTheDocument();
    expect(screen.getByText('pageY: null')).toBeInTheDocument();
    expect(screen.getByText('elementRelativeX: null')).toBeInTheDocument();
    expect(screen.getByText('elementRelativeY: null')).toBeInTheDocument();
    expect(screen.getByText('elementPositionX: null')).toBeInTheDocument();
    expect(screen.getByText('elementPositionY: null')).toBeInTheDocument();
  });

  it('should correctly return mouse position, relative mouse position, and element position when the mouse moves', async () => {
    renderSetup(<RefConnectedComponent />);

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
    expect(screen.getByText('elementRelativeX: 120')).toBeInTheDocument();
    expect(screen.getByText('elementRelativeY: 120')).toBeInTheDocument();
    expect(screen.getByText('elementPositionX: 30')).toBeInTheDocument();
    expect(screen.getByText('elementPositionY: 30')).toBeInTheDocument();
  });
});

describe('useMouse without connected ref', () => {
  const RefNonConnectedComponent = () => {
    const { position } = useMouse<HTMLDivElement>();

    return (
      <>
        <p>clientX: {position.clientX ?? 'null'}</p>
        <p>clientY: {position.clientY ?? 'null'}</p>
        <p>screenX: {position.screenX ?? 'null'}</p>
        <p>screenY: {position.screenY ?? 'null'}</p>
        <p>pageX: {position.pageX ?? 'null'}</p>
        <p>pageY: {position.pageY ?? 'null'}</p>
        <p>elementRelativeX: {position.elementRelativeX ?? 'null'}</p>
        <p>elementRelativeY: {position.elementRelativeY ?? 'null'}</p>
        <p>elementPositionX: {position.elementPositionX ?? 'null'}</p>
        <p>elementPositionY: {position.elementPositionY ?? 'null'}</p>
      </>
    );
  };

  it('should return null position when first render', async () => {
    renderSetup(<RefNonConnectedComponent />);

    fireEvent.mouseMove(document, {
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
    expect(screen.getByText('elementRelativeX: null')).toBeInTheDocument();
    expect(screen.getByText('elementRelativeY: null')).toBeInTheDocument();
    expect(screen.getByText('elementPositionX: null')).toBeInTheDocument();
    expect(screen.getByText('elementPositionY: null')).toBeInTheDocument();
  });

  it('should return null for mouse position, relative mouse position, and element position when the mouse moves', async () => {
    renderSetup(<RefNonConnectedComponent />);

    fireEvent.mouseMove(document, {
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
    expect(screen.getByText('elementRelativeX: null')).toBeInTheDocument();
    expect(screen.getByText('elementRelativeY: null')).toBeInTheDocument();
    expect(screen.getByText('elementPositionX: null')).toBeInTheDocument();
    expect(screen.getByText('elementPositionY: null')).toBeInTheDocument();
  });
});
