import { ComponentStory, ComponentMeta } from '@storybook/react';
import { QueryBoxPage } from './QueryBoxPage';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/QueryBox',
  component: QueryBoxPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof QueryBoxPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof QueryBoxPage> = (args) => (
  <QueryBoxPage {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  // option: OPTION_LIST,
};

export const CustomOptions = Template.bind({});
CustomOptions.args = {
  option: [
    { value: 'total', name: '전체', type: 'input' },
    { value: 'datePeriod', name: '기간', type: 'date' },
    { value: 'term', name: '진료과목', type: 'select' },
  ],
  selectOptions: {
    term: [
      { value: '정형외과', name: '정형외과' },
      { value: '성형외과', name: '성형외과' },
      { value: '피부과', name: '피부과' },
      { value: '치과', name: '치과' },
    ],
  },
};
