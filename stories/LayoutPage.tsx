import { Layout } from '@/layout';
import { menuList } from '../data/menu';

interface LayoutPageProps {
  /**
   * header comp
   */
  HeaderContents?: (props: any) => JSX.Element;
  /**
   * sideBar comp
   */
  SideBarContents?: (props: any) => JSX.Element;
  /**
   * emptyState JSX.Elements;
   */
  EmptyStateComponent?: JSX.Element;
  /**
   * 검색 상자 표시 여부
   */
  isSearch?: boolean;
  /**
   * 검색 상자 표시 여부
   */
  isLogin?: boolean;
}

export const LayoutPage = ({
  HeaderContents,
  SideBarContents,
  isSearch,
  isLogin,
  EmptyStateComponent,
}: LayoutPageProps) => {
  return (
    <Layout
      btnRoutes={['/', '/alert', '/user']}
      HeaderContents={
        HeaderContents && (
          <HeaderContents isSearch={isSearch} isLogin={isLogin} />
        )
      }
      SideBarContents={
        SideBarContents && <SideBarContents menuList={menuList} />
      }
    >
      <div
        className='contents d-flex justify-content-center align-items-center'
        style={{ height: '50dvh' }}
      >
        {EmptyStateComponent}
      </div>
    </Layout>
  );
};
