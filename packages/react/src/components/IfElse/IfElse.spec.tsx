import { render, screen } from '@testing-library/react';
import { IfElse } from '.';

describe('IfElse Component', () => {
  const TrueComponent = () => {
    return <p role="document">true</p>;
  };

  const FalseComponent = () => {
    return <p role="paragraph">false</p>;
  };

  describe('When condition prop type is boolean', () => {
    it('should render the trueComponent when the condition prop is true', () => {
      const condition = true;
      render(
        <IfElse
          condition={condition}
          trueComponent={<TrueComponent />}
          falseComponent={<FalseComponent />}
        />
      );
      const trueHeader = screen.queryByText('true');
      const falseHeader = screen.queryByText('false');
      expect(trueHeader).toBeInTheDocument();
      expect(falseHeader).not.toBeInTheDocument();
    });

    it('should render the falseComponent when the condition prop is false', () => {
      const condition = false;
      render(
        <IfElse
          condition={condition}
          trueComponent={<TrueComponent />}
          falseComponent={<FalseComponent />}
        />
      );
      const trueHeader = screen.queryByText('true');
      const falseHeader = screen.queryByText('false');
      expect(trueHeader).not.toBeInTheDocument();
      expect(falseHeader).toBeInTheDocument();
    });
  });

  describe('When condition prop type is function', () => {
    it('should render the trueComponent when the condition prop function returns true', () => {
      const condition = () => true;
      render(
        <IfElse
          condition={condition}
          trueComponent={<TrueComponent />}
          falseComponent={<FalseComponent />}
        />
      );

      const trueHeader = screen.queryByText('true');
      const falseHeader = screen.queryByText('false');
      expect(trueHeader).toBeInTheDocument();
      expect(falseHeader).not.toBeInTheDocument();
    });

    it('should render the falseComponent when the condition prop function returns false', () => {
      const condition = () => false;
      render(
        <IfElse
          condition={condition}
          trueComponent={<TrueComponent />}
          falseComponent={<FalseComponent />}
        />
      );
      const trueHeader = screen.queryByText('true');
      const falseHeader = screen.queryByText('false');
      expect(trueHeader).not.toBeInTheDocument();
      expect(falseHeader).toBeInTheDocument();
    });
  });
});
