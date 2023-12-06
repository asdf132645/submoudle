import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchBox } from '@/searchBox/SearchBox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SearchBox',
  component: SearchBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SearchBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchBox> = (args) => (
  <SearchBox {...args} />
);

export const SearchAll = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SearchAll.args = {
  isSelect: false,
};

export const SearchOne = Template.bind({});
SearchOne.args = {
  isSelect: true,
};
