import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, vi, expect, Mock } from 'vitest';

import * as ModernUtilKit from '@modern-kit/utils';

import { useClientEffect } from '.';

// isServer 함수를 모킹하여 반환 값을 설정합니다.
vi.mock('@modern-kit/utils', () => ({
  isServer: vi.fn(),
}));

interface TestComponentProps {
  callback: React.EffectCallback;
  depsTest?: string;
}

const WithDependency = ({ callback, depsTest }: TestComponentProps) => {
  useClientEffect(callback, [depsTest]);
  return <div>Test Component</div>;
};

const WithoutDependency = ({ callback }: TestComponentProps) => {
  useClientEffect(callback);
  return <div>Test Component</div>;
};

describe('useClientEffect', () => {
  const isServer = ModernUtilKit.isServer as Mock;

  it('should not call the callback on the server', () => {
    isServer.mockReturnValue(true); // 서버 환경을 시뮬레이트합니다.
    const callback = vi.fn();

    render(<WithDependency callback={callback} />);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call the callback on the client', () => {
    isServer.mockReturnValue(false); // 클라이언트 환경을 시뮬레이트합니다.
    const callback = vi.fn();

    render(<WithDependency callback={callback} />);

    expect(callback).toHaveBeenCalled();
  });

  it('should call the callback with dependencies', () => {
    isServer.mockReturnValue(false); // 클라이언트 환경을 시뮬레이트합니다.
    const callback = vi.fn();

    const { rerender } = render(<WithDependency callback={callback} />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<WithDependency callback={callback} />);
    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<WithDependency callback={callback} depsTest="newValue" />);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should use an empty dependency array when none is provided', () => {
    isServer.mockReturnValue(false); // 클라이언트 환경을 시뮬레이트합니다.
    const callback = vi.fn();

    render(<WithoutDependency callback={callback} />);

    expect(callback).toHaveBeenCalled();
  });
});
