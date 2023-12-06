import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectFormPage } from './SelectFormPage';

export default {
  title: 'Components/SelectFormPage',
  component: SelectFormPage,
} as ComponentMeta<typeof SelectFormPage>;

const Template: ComponentStory<typeof SelectFormPage> = (args) => (
  <SelectFormPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = { type: 'primary' };
