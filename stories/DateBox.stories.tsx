import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateBoxPage } from './DateBoxTest';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DateBoxPage',
  component: DateBoxPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DateBoxPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DateBoxPage> = (args) => (
  <DateBoxPage {...args} />
);

export const DaySelect = Template.bind({});
DaySelect.args = {
  types: 'day',
  isTerm: false,
};
export const TermSelect = Template.bind({});
TermSelect.args = {
  types: 'day',
  isTerm: true,
  isHandler: true,
};
export const MonthSelect = Template.bind({});
MonthSelect.args = {
  types: 'month',
  isTerm: false,
};
export const MonthTermSelect = Template.bind({});
MonthTermSelect.args = {
  types: 'month',
  isTerm: true,
  isHandler: true,
};
