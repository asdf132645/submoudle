import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToggleBox } from '@/togglebtn/ToggleBtn';

export default {
  title: 'Components/ToggleBtn',
  component: ToggleBox,
} as ComponentMeta<typeof ToggleBox>;

const Template: ComponentStory<typeof ToggleBox> = (args) => (
  <ToggleBox {...args} />
);

export const Togglebtn = Template.bind({});
Togglebtn.args = {};
