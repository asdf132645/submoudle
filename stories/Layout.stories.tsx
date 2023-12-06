import { SidebarContents } from '@/sidebarcontent';
import { HeaderContent } from '@/headercontent';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LayoutPage } from './LayoutPage';

export default {
  title: 'Components/Layout',
  component: LayoutPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LayoutPage>;

const Template: ComponentStory<typeof LayoutPage> = (args) => (
  <LayoutPage {...args} />
);

export const NoneState = Template.bind({});
NoneState.args = {};
NoneState.parameters = {
  nextRouter: {
    path: '/',
  },
};

export const SideBar = Template.bind({});
SideBar.args = {
  SideBarContents: SidebarContents,
};
SideBar.parameters = {
  nextRouter: {
    path: '/',
  },
};

export const LoginState = Template.bind({});
LoginState.args = {
  HeaderContents: HeaderContent,
  SideBarContents: SidebarContents,
  isSearch: true,
  isLogin: true,
};
LoginState.parameters = {
  nextRouter: {
    path: '/',
  },
};

export const LoginNotSearchBox = Template.bind({});
LoginNotSearchBox.args = {
  HeaderContents: HeaderContent,
  SideBarContents: SidebarContents,
  isLogin: true,
};
LoginNotSearchBox.parameters = {
  nextRouter: {
    path: '/',
  },
};
