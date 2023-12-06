import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectBox } from '@/selectbox/SelectBox';

export interface IOption {
  value: string;
  name: string;
}
const OPTION_LIST: IOption[] = [
  { value: '선택 1', name: '선택 1' },
  { value: '선택 2', name: '선택 2' },
  { value: '선택 3', name: '선택 3' },
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SelectBox',
  component: SelectBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SelectBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectBox> = (args) => (
  <SelectBox {...args} />
);

export const Single = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Single.args = {
  label: 'label',
  option: OPTION_LIST,
};

export const Multiple = Template.bind({});
Multiple.args = {
  label: 'label',
  isMultiple: true,
  option: OPTION_LIST,
};
