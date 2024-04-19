import React from 'react';
import { StoryFn } from '@storybook/react';
import { Ripple } from '../../components/Ripple';
import styled from '@emotion/styled';
import { colors } from '../../config/theme';

export default {
  title: 'components/Ripple',
};

const Template: StoryFn<any> = () => {
  return (
    <div>
      <h2>Large</h2>
      <Ripple>
        <Box borderRadius={0} onClick={() => console.log('test1')}>
          Ripple Box
        </Box>
      </Ripple>
      <br />
      <Ripple borderRadius={8}>
        <Box borderRadius={8} onClick={() => console.log('test2')}>
          Ripple Box
        </Box>
      </Ripple>
      <br />
      <Ripple rippleColor={colors.red[300]}>
        <Box borderRadius={0} onClick={() => console.log('test3')}>
          Ripple Box
        </Box>
      </Ripple>
      <br />
      <Ripple
        borderRadius={8}
        rippleColor={colors.yellow[700]}
        bgColor={colors.yellow[500]}>
        <Box borderRadius={8} onClick={() => console.log('test4')}>
          Ripple Box
        </Box>
      </Ripple>
    </div>
  );
};

const Box = styled.div<{ borderRadius: number }>`
  position: relative; // (*)
  z-index: 10; // (*)
  padding: 10px 15px;
  border: 1px solid #111;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`;

export const Default = {
  render: Template,
};
