import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RoleBoxPage } from './RoleBoxPage';

export default {
  title: 'Components/RoleBox',
  component: RoleBoxPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RoleBoxPage>;

const Template: ComponentStory<typeof RoleBoxPage> = (args) => (
  <RoleBoxPage {...args} />
);

export const Checkbox = Template.bind({});
Checkbox.args = { type: 'checkbox' };

export const MultipleBox = Template.bind({});
MultipleBox.args = { type: 'checkbox', multiple: true };

export const Radiobox = Template.bind({});
Radiobox.args = { type: 'radio' };
