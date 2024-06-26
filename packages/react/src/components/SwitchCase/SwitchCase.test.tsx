import { screen } from '@testing-library/react';
import { renderSetup } from '../../utils/test/renderSetup';
import { SwitchCase } from '.';

describe('SwitchCase', () => {
  it('should SwitchCase component receive condition.', () => {
    renderSetup(
      <SwitchCase condition={0} cases={{ 0: <button>case no.1</button> }} />
    );
    const CaseOneComponent = screen.queryByRole('button', {
      name: 'case no.1',
    });

    expect(CaseOneComponent).toBeInTheDocument();
  });

  it('should render defaultCaseComponent when there is no matched condition.', () => {
    renderSetup(
      <SwitchCase
        condition={0 as number}
        cases={{ 1: <button>case no.1</button> }}
        defaultCaseComponent={<button>default component</button>}
      />
    );

    const CaseOneComponent = screen.queryByRole('button', {
      name: 'case no.1',
    });
    const DefaultCaseComponent = screen.queryByRole('button', {
      name: 'default component',
    });

    expect(CaseOneComponent).not.toBeInTheDocument();
    expect(DefaultCaseComponent).toBeInTheDocument();
  });

  it('should render defaultCaseComponent when condition is nullable.', () => {
    renderSetup(
      <SwitchCase
        condition={null}
        cases={{}}
        defaultCaseComponent={<button>default component</button>}
      />
    );

    const DefaultCaseComponent = screen.queryByRole('button', {
      name: 'default component',
    });
    expect(DefaultCaseComponent).toBeInTheDocument();
  });
});
