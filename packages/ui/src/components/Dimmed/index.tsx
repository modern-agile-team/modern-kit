import { forwardRef, useEffect, useRef } from 'react';
import * as S from './Dimmed.styled';
import { DimmedProps } from './Dimmed.types';
import { CSSTransition } from 'react-transition-group';
import { useMergeRefs } from '@devgrace/react';

export const Dimmed = forwardRef<HTMLDivElement, DimmedProps>(
  (
    {
      children,
      className,
      isShow = false,
      isTransition = true,
      timeout = 200, // ms unit
      alpha = 0.6, // rgba
      zIndex = 1000,
      ...props
    },
    ref
  ) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={isShow}
        timeout={isTransition ? timeout : 0}
        unmountOnExit
        classNames="devgrace-dimmed">
        <S.DimmedWrapper
          ref={useMergeRefs(nodeRef, ref)}
          alpha={alpha}
          zIndex={zIndex}
          timeout={timeout}
          {...props}>
          {children}
        </S.DimmedWrapper>
      </CSSTransition>
    );
  }
);
