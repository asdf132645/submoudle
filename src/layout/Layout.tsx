import { useToggle } from '../hooks';
import { Header } from '../header';
import { SideBar } from '../sidebar';
import { MenuTab } from '../menutab';
import { LayoutProps } from '../types/layout';
import { SidebarContents } from '../sidebarcontent';
import styles from './layout.module.css';

export const Layout = ({
  HeaderContents,
  SideBarContents,
  btnRoutes = ['/', '/', '/'],
  menuList = {
    defaultMenuList: [],
    upperMenuList: [],
    middleMenuList: [],
    lowerMenuList: [],
  },
  isBookmark,
  bookmarkList,
  insertBookmark,
  deleteBookMark,
  isExcelBtnVisible,
  excelDownload,
  children,
  alarmCheck,
  alarmNoti,
}: LayoutProps) => {
  const [toggle, onToggle] = useToggle();

  return (
    <>
      <div className={styles.container} id='wrapper'>
        <Header
          toggle={toggle}
          onToggle={onToggle}
          HeaderContents={HeaderContents}
        />
        <main
          className={[
            styles.container,
            styles.contentsWrap,
            styles['d-flex'],
          ].join(' ')}
        >
          <SideBar
            toggle={!toggle}
            SideBarContents={
              SideBarContents ?? (
                <SidebarContents
                  bookmarkList={bookmarkList}
                  menuList={menuList}
                />
              )
            }
            btnRoutes={btnRoutes}
            alarmCheck={alarmCheck}
            alarmNoti={alarmNoti}
          />
          <div className={`${styles.bodyWrap} ${toggle ? '' : styles.active}`}>
            <MenuTab
              toggle={toggle}
              menuList={menuList}
              isBookmark={isBookmark}
              insertBookmark={insertBookmark}
              deleteBookMark={deleteBookMark}
              isExcelBtnVisible={isExcelBtnVisible}
              excelDownload={excelDownload}
            />
            {children}
          </div>
        </main>
      </div>
    </>
  );
};
