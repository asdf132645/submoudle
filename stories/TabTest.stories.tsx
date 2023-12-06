import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ExTable } from './TableTest';

export default {
  title: 'Components/TableTest',
  component: ExTable,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ExTable>;

const Template: ComponentStory<typeof ExTable> = (args) => (
  <ExTable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
