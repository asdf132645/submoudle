import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Imperative } from './Imperative';

export default {
  title: 'Components/Imperative',
  component: Imperative,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Imperative>;

const Template: ComponentStory<typeof Imperative> = (args) => (
  <Imperative {...args} />
);

export const Outline = Template.bind({});
Outline.args = {};
