import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Button } from '@/index';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Outline = Template.bind({});
Outline.args = {
  types: 'outline',
  label: 'Button',
  size: 'md',
  onClick: () => alert('버튼 테스트'),
};
Outline.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const outlineBtn = canvas.getByRole('button', { name: /Button/i });
  expect(outlineBtn.innerText).toBe('Button');
};

export const Solid = Template.bind({});
Solid.args = {
  types: 'solid',
  label: 'Button',
  size: 'md',
  onClick: () => alert('버튼 테스트'),
};

export const Excel = Template.bind({});
Excel.args = {
  types: 'excel',
};

export const Delete = Template.bind({});
Delete.args = {
  types: 'delete',
};

export const Upload = Template.bind({});
Upload.args = {
  types: 'upload',
  onClick: () => alert('업로드 테스트'),
};
