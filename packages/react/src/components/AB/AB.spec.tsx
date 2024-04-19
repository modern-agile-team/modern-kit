import { AB } from '.';
import { renderSetup } from '../../utils/test/renderSetup';

const { CaseA, CaseB } = AB;

const NormalTestComponent = () => {
  return (
    <AB>
      <CaseA>
        <div>A</div>
      </CaseA>
      <CaseB>
        <div>B</div>
      </CaseB>
    </AB>
  );
};

const FailTestComponent1 = () => {
  return (
    <AB>
      <CaseA>
        <div>A</div>
      </CaseA>
      <CaseA>
        <div>A</div>
      </CaseA>
    </AB>
  );
};

const FailTestComponent2 = () => {
  return (
    <AB>
      <CaseA>
        <div>A</div>
      </CaseA>
      <div>Other</div>
    </AB>
  );
};

const FailTestComponent3 = () => {
  return (
    <AB>
      <CaseA>
        <div>A</div>
      </CaseA>
    </AB>
  );
};

describe('AB Component', () => {
  it('should render CaseA or CaseB in the normal case', () => {
    const { container } = renderSetup(<NormalTestComponent />);
    expect(container.childElementCount).toBe(1);
  });

  it('should not render anything if rendering a duplicate component type', () => {
    const { container } = renderSetup(<FailTestComponent1 />);
    expect(container.childElementCount).toBe(0);
  });

  it('should not render anything if rendering an invalid component type', () => {
    const { container } = renderSetup(<FailTestComponent2 />);
    expect(container.childElementCount).toBe(0);
  });

  it('should not render anything if the children length is 1', () => {
    const { container } = renderSetup(<FailTestComponent3 />);
    expect(container.childElementCount).toBe(0);
  });
});
