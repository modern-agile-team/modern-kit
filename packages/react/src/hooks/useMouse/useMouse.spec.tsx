import { describe } from 'vitest';

import { renderSetup } from '../../utils/test/renderSetup';
import { fireEvent, screen } from '@testing-library/react';

import { useMouse } from '.';
import { useMemo } from 'react';

describe('useMouse with connected ref', () => {
  const RefConnectedComponent = () => {
    const { ref, position } = useMouse<HTMLDivElement>();

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
        <div ref={ref} style={style} role="box" />
        <p>clientX: {position.clientX ?? 'undefined'}</p>
        <p>clientY: {position.clientY ?? 'undefined'}</p>
        <p>screenX: {position.screenX ?? 'undefined'}</p>
        <p>screenY: {position.screenY ?? 'undefined'}</p>
        <p>pageX: {position.pageX ?? 'undefined'}</p>
        <p>pageY: {position.pageY ?? 'undefined'}</p>
        <p>relativeX: {position.relativeX ?? 'undefined'}</p>
        <p>relativeY: {position.relativeY ?? 'undefined'}</p>
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
    expect(screen.getByText('relativeX: undefined')).toBeInTheDocument();
    expect(screen.getByText('relativeY: undefined')).toBeInTheDocument();
  });

  it('should return correct position and correct relative position when mouse move', async () => {
    renderSetup(<RefConnectedComponent />);

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
        <p>relativeX: {position.relativeX ?? 'undefined'}</p>
        <p>relativeY: {position.relativeY ?? 'undefined'}</p>
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
    expect(screen.getByText('relativeX: undefined')).toBeInTheDocument();
    expect(screen.getByText('relativeY: undefined')).toBeInTheDocument();
  });

  it('should return correct position and undefined relative position when mouse move', async () => {
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
    expect(screen.getByText('relativeX: undefined')).toBeInTheDocument();
    expect(screen.getByText('relativeY: undefined')).toBeInTheDocument();
  });
});
