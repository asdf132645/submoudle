import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextArea } from '@/index';

export default {
  title: 'Components/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Primary = Template.bind({});
Primary.args = { rows: 7 };
