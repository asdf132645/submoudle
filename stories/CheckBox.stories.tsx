import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckBox } from '@/checkBox/CheckBox';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
);

export const Checkbox = Template.bind({});
Checkbox.args = { type: 'CHECK', onChange: (e) => console.log(e.target) };

export const Radiobox = Template.bind({});
Radiobox.args = { type: 'RADIO' };
