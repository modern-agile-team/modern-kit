import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IfElse } from '.';

describe('IfElse', () => {
  const TruthyComponent = () => {
    return <p role="document">true</p>;
  };

  const FalsyComponent = () => {
    return <p role="paragraph">false</p>;
  };

  describe('condition prop이 boolean 타입일 때', () => {
    it('condition prop이 true일 때 trueComponent를 렌더링해야 한다', () => {
      const condition = true;
      render(
        <IfElse
          condition={condition}
          truthyComponent={<TruthyComponent />}
          falsyComponent={<FalsyComponent />}
        />
      );
      const trueHeader = screen.queryByText('true');
      const falseHeader = screen.queryByText('false');
      expect(trueHeader).toBeInTheDocument();
      expect(falseHeader).not.toBeInTheDocument();
    });

    it('condition prop이 false일 때 falseComponent를 렌더링해야 한다', () => {
      const condition = false;
      render(
        <IfElse
          condition={condition}
          truthyComponent={<TruthyComponent />}
          falsyComponent={<FalsyComponent />}
        />
      );
      const trueHeader = screen.queryByText('true');
      const falseHeader = screen.queryByText('false');
      expect(trueHeader).not.toBeInTheDocument();
      expect(falseHeader).toBeInTheDocument();
    });
  });

  describe('condition prop이 함수 타입일 때', () => {
    it('condition prop 함수가 true를 반환할 때 trueComponent를 렌더링해야 한다', () => {
      const condition = () => true;
      render(
        <IfElse
          condition={condition}
          truthyComponent={<TruthyComponent />}
          falsyComponent={<FalsyComponent />}
        />
      );

      const trueHeader = screen.queryByText('true');
      const falseHeader = screen.queryByText('false');
      expect(trueHeader).toBeInTheDocument();
      expect(falseHeader).not.toBeInTheDocument();
    });

    it('condition prop 함수가 false를 반환할 때 falseComponent를 렌더링해야 한다', () => {
      const condition = () => false;
      render(
        <IfElse
          condition={condition}
          truthyComponent={<TruthyComponent />}
          falsyComponent={<FalsyComponent />}
        />
      );
      const trueHeader = screen.queryByText('true');
      const falseHeader = screen.queryByText('false');
      expect(trueHeader).not.toBeInTheDocument();
      expect(falseHeader).toBeInTheDocument();
    });
  });
});
