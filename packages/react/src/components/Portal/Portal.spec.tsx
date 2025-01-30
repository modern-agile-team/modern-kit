import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useRef, useState } from 'react';
import { Portal } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';

const DefaultTestComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [number, setNumber] = useState(0);

  return (
    <div id="parent">
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <button onClick={() => setNumber(number + 1)}>+</button>

      <Portal>
        {isOpen && (
          <div className="child">
            <p>{`${number}`}</p>
          </div>
        )}
      </Portal>
    </div>
  );
};

const ContainerTestComponent = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div id="parent">
      <Portal containerRef={ref}>
        <p className="child">Child</p>
      </Portal>

      <div id="outer" ref={ref}></div>
    </div>
  );
};

const NestedTestComponent = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div id="parent">
      <Portal>
        <p className="child">Child</p>
        <Portal>
          <p className="nested-child-1">Nested Child1</p>
          <Portal containerRef={ref}>
            <p className="nested-child-2">Nested Child2</p>
          </Portal>
        </Portal>
      </Portal>

      <div id="outer" ref={ref}></div>
    </div>
  );
};

describe('Default Portal Component', () => {
  it('기본적으로 portalElement가 document.body에 렌더링되어야 합니다', () => {
    const { container } = renderSetup(<DefaultTestComponent />);

    const parentElement = container.querySelector('#parent');
    const parentPortal = parentElement?.querySelector('.portal');

    expect(parentPortal).toBeNull();

    const documentPortal = document.querySelector('.portal');
    const documentPortalChild = documentPortal?.querySelector('.child');

    expect(documentPortalChild).toBeInTheDocument();
  });

  it('Portal 컴포넌트의 자식 요소가 여러 상태에 따라 렌더링되어야 합니다', async () => {
    const { user } = renderSetup(<DefaultTestComponent />);

    const documentPortal = document.querySelector('.portal');
    const toggleButton = screen.getByRole('button', { name: 'Toggle' });
    const plusButton = screen.getByRole('button', { name: '+' });

    const getChildElement = () => documentPortal?.querySelector('.child');

    await waitFor(() => {
      user.click(plusButton);

      expect(getChildElement()).toBeInTheDocument();
      expect(getChildElement()).toHaveTextContent('1');
    });

    await waitFor(() => {
      user.click(toggleButton);
      user.click(plusButton);

      expect(getChildElement()).not.toBeInTheDocument();
    });

    await waitFor(() => {
      user.click(toggleButton);
      user.click(plusButton);

      expect(getChildElement()).toBeInTheDocument();
      expect(getChildElement()).toHaveTextContent('3');
    });

    await waitFor(() => {
      user.click(toggleButton);

      expect(getChildElement()).not.toBeInTheDocument();
    });
  });

  it('언마운트 시 portalElement가 제거되어야 합니다', () => {
    const { unmount } = renderSetup(<DefaultTestComponent />);

    const documentPortal = document.querySelector('.portal');

    unmount();

    expect(documentPortal).not.toBeInTheDocument();
  });
});

describe('Container Portal Component', () => {
  it('containerRef prop을 전달하여 document.body 대신 다른 DOM 요소에 렌더링되어야 합니다', () => {
    const { container } = renderSetup(<ContainerTestComponent />);

    const outerElement = container.querySelector('#outer');
    const outerInnerPortal = outerElement?.querySelector('.portal');
    const outerInnerChild = outerInnerPortal?.querySelector('.child');

    expect(outerInnerChild).toBeInTheDocument();
  });

  it('언마운트 시 portalElement가 제거되어야 합니다', () => {
    const { container, unmount } = renderSetup(<ContainerTestComponent />);

    const outerElement = container.querySelector('#outer');
    const outerInnerPortal = outerElement?.querySelector('.portal');

    unmount();

    expect(outerInnerPortal).not.toBeInTheDocument();
  });
});

describe('Nested Portal Component', () => {
  it('여러 Portal 컴포넌트를 중첩할 때 중첩된 Portal DOM 계층 구조가 생성되어야 합니다', () => {
    renderSetup(<NestedTestComponent />);

    const documentPortal = document.querySelector('.portal');
    const documentPortalChild = documentPortal?.querySelector('.child');

    expect(documentPortalChild).toBeInTheDocument();

    const nestedPortal1 = documentPortal?.querySelector('.portal');
    const nestedChild1 = nestedPortal1?.querySelector('.nested-child-1');

    expect(nestedChild1).toBeInTheDocument();

    const nestedPortal2 = nestedPortal1?.querySelector('.portal');
    const nestedChild2 = nestedPortal2?.querySelector('.nested-child-2');

    expect(nestedChild2).toBeInTheDocument();
  });

  it('중첩된 Portal 컴포넌트에 containerRef prop이 있는 경우 부모 portalElement에 렌더링되어야 합니다', () => {
    const { container } = renderSetup(<NestedTestComponent />);

    const outerElement = container.querySelector('#outer');
    const outerPortal = outerElement?.querySelector('.portal');

    expect(outerPortal).toBeNull();
  });
});
