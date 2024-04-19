import React, { useEffect, useRef, useState } from 'react';
import { StoryFn } from '@storybook/react';
import { Dimmed } from '../../components/Dimmed';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { useOnClickOutside } from '@devgrace/react';
import { DimmedProps } from '../../components/Dimmed/Dimmed.types';

export default {
  title: 'components/Dimmed',
  argTypes: {
    isTransition: {
      control: { type: 'boolean' },
    },
    alpha: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
    },
  },
};

const Template: StoryFn<DimmedProps> = ({ alpha, isTransition, timeout }) => {
  const [isShow, setIsShow] = useState(false);
  const { ref } = useOnClickOutside<HTMLDivElement>(() => setIsShow(false));

  return (
    <div>
      <Button onClick={() => setIsShow(true)}>Open Dimmed</Button>
      <Dimmed
        alpha={alpha}
        timeout={timeout}
        isShow={isShow}
        isTransition={isTransition}>
        <div
          ref={ref}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '300px',
            height: '300px',
            backgroundColor: '#fff',
          }}>
          INNER BOX
        </div>
        <Loader color="#fff" />
      </Dimmed>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    isTransition: true,
    timeout: 200,
    alpha: 0.6,
  },
};
