import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckBoxPage } from './CheckBoxPage';

export default {
  title: 'Components/MultipleCheckBox',
  component: CheckBoxPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CheckBoxPage>;

const Template: ComponentStory<typeof CheckBoxPage> = (args) => (
  <CheckBoxPage {...args} />
);

export const Checkbox = Template.bind({});
Checkbox.args = { type: 'CHECK' };

export const Radiobox = Template.bind({});
Radiobox.args = { type: 'RADIO', name: 'radio' };

export const GrayBox = Template.bind({});
GrayBox.args = { type: 'GRAY', name: 'radio' };
