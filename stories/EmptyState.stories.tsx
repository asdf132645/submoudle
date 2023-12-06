import { SidebarContents } from '@/sidebarcontent';
import { HeaderContent } from '@/headercontent';
import { NoHospital, NotFoundPage, NoData } from '@/noPage';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LayoutPage } from './LayoutPage';

export default {
  title: 'Components/EmptyState',
  component: LayoutPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    HeaderContents: HeaderContent,
    SideBarContents: SidebarContents,
    isSearch: true,
    isLogin: true,
  },
  parameters: {
    nextRouter: {
      path: '/',
    },
  },
} as ComponentMeta<typeof LayoutPage>;

const Template: ComponentStory<typeof LayoutPage> = (args) => (
  <LayoutPage {...args} />
);

export const NotFoundPageExample = Template.bind({});
NotFoundPageExample.args = {
  EmptyStateComponent: <NotFoundPage />,
};

export const NotHospitalExample = Template.bind({});
NotHospitalExample.args = {
  EmptyStateComponent: <NoHospital />,
};

export const NoDataExample = Template.bind({});
NoDataExample.args = {
  EmptyStateComponent: <NoData />,
};
