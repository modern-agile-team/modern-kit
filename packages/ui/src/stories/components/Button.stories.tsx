import React from 'react';
import { StoryFn } from '@storybook/react';
import { Button } from '../../components/Button';

export default {
  title: 'components/Button',
};

const Template: StoryFn<any> = () => {
  return (
    <div>
      <h2>Large</h2>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="large" onClick={() => console.log('click button type1')}>
          Contained Button
        </Button>
        <Button
          size="large"
          variant="outlined"
          onClick={() => console.log('click button type2')}>
          Outlined Button
        </Button>
        <Button
          size="large"
          variant="text"
          onClick={() => console.log('click button type3')}>
          Text Button
        </Button>
        <Button
          size="large"
          disabled
          onClick={() => console.log('This event should not be called.')}>
          Disabled Contained Button
        </Button>
      </div>

      <h2 style={{ marginTop: '40px' }}>Medium</h2>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          shape="rect"
          size="medium"
          colorTheme="indigo"
          onClick={() => console.log('click button type4')}>
          Contained Button
        </Button>
        <Button
          shape="rect"
          size="medium"
          colorTheme="indigo"
          variant="outlined"
          onClick={() => console.log('click button type6')}>
          OutLined Button
        </Button>
        <Button
          shape="rect"
          size="medium"
          colorTheme="indigo"
          variant="text"
          onClick={() => console.log('click button type7')}>
          Text Button
        </Button>
        <Button
          shape="rect"
          size="medium"
          colorTheme="indigo"
          variant="outlined"
          disabled
          onClick={() => console.log('This event should not be called.')}>
          Disabled Outlined Button
        </Button>
      </div>

      <h2 style={{ marginTop: '40px' }}>Small</h2>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          size="small"
          colorTheme="orange"
          onClick={() => console.log('click button type8')}>
          Default Contained Button
        </Button>
        <Button
          size="small"
          colorTheme="orange"
          variant="outlined"
          onClick={() => console.log('click button type9')}>
          Default OutLined Button
        </Button>
        <Button
          size="small"
          colorTheme="orange"
          variant="text"
          onClick={() => console.log('click button type10')}>
          Default Text Button
        </Button>
        <Button
          size="small"
          colorTheme="orange"
          variant="text"
          disabled
          onClick={() => console.log('This event should not be called.')}>
          Disabled Text Button
        </Button>
      </div>

      <h2 style={{ marginTop: '40px' }}>Full Width</h2>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          fullWidth
          colorTheme="pink"
          onClick={() => console.log('click button type11')}>
          Contained Button
        </Button>
        <Button
          fullWidth
          colorTheme="pink"
          variant="outlined"
          onClick={() => console.log('click button type12')}>
          Outlined Button
        </Button>
      </div>

      <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
        <Button
          shape="rect"
          colorTheme="pink"
          fullWidth
          onClick={() => console.log('click button type13')}>
          Contained Button
        </Button>
      </div>

      <div style={{ marginTop: '8px' }}>
        <Button
          shape="rect"
          colorTheme="pink"
          fullWidth
          disabled
          onClick={() => console.log('This event should not be called.')}>
          Disabled Contained Button
        </Button>
      </div>

      <h2 style={{ marginTop: '40px' }}>Loading Button</h2>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          isLoading
          size="large"
          onClick={() => console.log('This event should not be called.')}>
          Contained Loading Button
        </Button>
        <Button
          isLoading
          variant="outlined"
          size="medium"
          colorTheme="indigo"
          onClick={() => console.log('This event should not be called.')}>
          Outlined Loading Button
        </Button>
        <Button isLoading variant="text" size="small" colorTheme="pink">
          Text Loading Button
        </Button>
        <Button
          disabled
          isLoading
          size="medium"
          onClick={() => console.log('This event should not be called.')}>
          Disabled Contained Loading Button
        </Button>
      </div>
    </div>
  );
};

export const Default = {
  render: Template,
};
