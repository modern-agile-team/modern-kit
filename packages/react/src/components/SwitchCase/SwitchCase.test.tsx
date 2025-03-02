import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';
import { SwitchCase } from '.';

const TestComponent = ({ value }: { value: string | null | undefined }) => {
  return (
    <SwitchCase
      value={value}
      caseBy={{ a: <div>A</div>, b: <div>B</div> }}
      defaultComponent={<div>Default</div>}
    />
  );
};

describe('SwitchCase', () => {
  it(`value가 'a'일 때 'A'가 렌더링되어야 합니다.`, () => {
    renderSetup(<TestComponent value="a" />);

    expect(screen.getByText('A')).toBeInTheDocument();

    expect(screen.queryByText('B')).not.toBeInTheDocument();
    expect(screen.queryByText('Default')).not.toBeInTheDocument();
  });

  it(`value가 'b'일 때 'B'가 렌더링되어야 합니다.`, () => {
    renderSetup(<TestComponent value="b" />);

    expect(screen.getByText('B')).toBeInTheDocument();

    expect(screen.queryByText('A')).not.toBeInTheDocument();
    expect(screen.queryByText('Default')).not.toBeInTheDocument();
  });

  it(`일치하는 value가 없을 때 'Default'가 렌더링되어야 합니다.`, () => {
    renderSetup(<TestComponent value="cc" />);

    expect(screen.getByText('Default')).toBeInTheDocument();

    expect(screen.queryByText('A')).not.toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
  });

  it(`value가 null일 때 'Default'가 렌더링되어야 합니다.`, () => {
    renderSetup(<TestComponent value={null} />);

    expect(screen.getByText('Default')).toBeInTheDocument();
  });
});
