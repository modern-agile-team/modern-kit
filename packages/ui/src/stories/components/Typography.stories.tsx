import React from 'react';
import { StoryFn } from '@storybook/react';
import { Typography } from '../../components/Typography';

export default {
  title: 'components/Typography',
};

const Template: StoryFn<any> = () => {
  return (
    <div>
      <Typography.Title level={1}>Typography h1 Tag</Typography.Title>
      <Typography.Title level={2}>Typography h2 Tag</Typography.Title>
      <Typography.Title level={3}>Typography h3 Tag</Typography.Title>
      <Typography.Title level={4}>Typography h4 Tag</Typography.Title>
      <Typography.Title level={5}>Typography h5 Tag</Typography.Title>
      <Typography.Paragraph>Typography p Tag</Typography.Paragraph>
      <Typography.Text>Typography Span Tag</Typography.Text>
    </div>
  );
};

export const Default = {
  render: Template,
};
