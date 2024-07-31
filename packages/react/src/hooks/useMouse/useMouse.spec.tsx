import { describe, it, expect, vi } from 'vitest';
import { renderSetup } from '../../utils/test/renderSetup';
import { fireEvent, screen } from '@testing-library/react';

import { useMouse } from '.';

describe('useMouse with connected ref', () => {
  const RefConnectedComponent = () => {
    const { ref, position } = useMouse<HTMLDivElement>();

    return (
      <>
        <div ref={ref} role="box" />
        <p>clientX: {position.clientX ?? 'undefined'}</p>
        <p>clientY: {position.clientY ?? 'undefined'}</p>
        <p>screenX: {position.screenX ?? 'undefined'}</p>
        <p>screenY: {position.screenY ?? 'undefined'}</p>
        <p>pageX: {position.pageX ?? 'undefined'}</p>
        <p>pageY: {position.pageY ?? 'undefined'}</p>
        <p>elementRelativeX: {position.elementRelativeX ?? 'undefined'}</p>
        <p>elementRelativeY: {position.elementRelativeY ?? 'undefined'}</p>
        <p>elementPositionX: {position.elementPositionX ?? 'undefined'}</p>
        <p>elementPositionY: {position.elementPositionY ?? 'undefined'}</p>
      </>
    );
  };

  it('should return undefined position when first render', async () => {
    renderSetup(<RefConnectedComponent />);

    expect(screen.getByText('clientX: undefined')).toBeInTheDocument();
    expect(screen.getByText('clientY: undefined')).toBeInTheDocument();
    expect(screen.getByText('screenX: undefined')).toBeInTheDocument();
    expect(screen.getByText('screenY: undefined')).toBeInTheDocument();
    expect(screen.getByText('pageX: undefined')).toBeInTheDocument();
    expect(screen.getByText('pageY: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementRelativeX: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementRelativeY: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementPositionX: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementPositionY: undefined')).toBeInTheDocument();
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
        <p>clientX: {position.clientX ?? 'undefined'}</p>
        <p>clientY: {position.clientY ?? 'undefined'}</p>
        <p>screenX: {position.screenX ?? 'undefined'}</p>
        <p>screenY: {position.screenY ?? 'undefined'}</p>
        <p>pageX: {position.pageX ?? 'undefined'}</p>
        <p>pageY: {position.pageY ?? 'undefined'}</p>
        <p>elementRelativeX: {position.elementRelativeX ?? 'undefined'}</p>
        <p>elementRelativeY: {position.elementRelativeY ?? 'undefined'}</p>
        <p>elementPositionX: {position.elementPositionX ?? 'undefined'}</p>
        <p>elementPositionY: {position.elementPositionY ?? 'undefined'}</p>
      </>
    );
  };

  it('should return undefined position when first render', async () => {
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
    expect(screen.getByText('elementRelativeX: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementRelativeY: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementPositionX: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementPositionY: undefined')).toBeInTheDocument();
  });

  it('should return undefined for mouse position, relative mouse position, and element position when the mouse moves', async () => {
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
    expect(screen.getByText('elementRelativeX: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementRelativeY: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementPositionX: undefined')).toBeInTheDocument();
    expect(screen.getByText('elementPositionY: undefined')).toBeInTheDocument();
  });
});
