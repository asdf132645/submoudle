import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { InputBoxPage } from './InputBoxPage';

export default {
  title: 'Components/InputBox',
  component: InputBoxPage,
} as ComponentMeta<typeof InputBoxPage>;

const Template: ComponentStory<typeof InputBoxPage> = (args) => (
  <InputBoxPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const [InputEl] = await canvas.findAllByRole('textbox');
  userEvent.type(InputEl, 'typing');
};

export const LableInput = Template.bind({});
LableInput.args = {
  label: '라벨',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: '',
};

export const ConditionInput = Template.bind({});
ConditionInput.args = {
  considerSucc: true,
  label: '',
};
