import React, { useState } from 'react';
import { MySideBar } from './MySidebar';
import { MenuListProps } from '../types/menu';
import styles from './content.module.css';

interface SidebarContentsProps {
  //즐겨찾기 한 메뉴
  bookmarkList?: MenuListProps;
  menuList?: MenuListProps;
}

export const SidebarContents = ({
  bookmarkList = {
    defaultMenuList: [],
    upperMenuList: [],
    middleMenuList: [],
    lowerMenuList: [],
  },
  menuList = {
    defaultMenuList: [],
    upperMenuList: [],
    middleMenuList: [],
    lowerMenuList: [],
  },
}: SidebarContentsProps) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className={styles.lnb}>
      <ul className={styles.lnbTabs}>
        <li
          className={`${styles['btn-my']} ${menu ? styles.active : ''}`}
          onClick={() => setMenu(true)}
        >
          <span></span>My
        </li>
        <li
          className={`${styles['btn-all']} ${menu ? '' : styles.active}`}
          onClick={() => setMenu(false)}
        >
          <span></span>All
        </li>
      </ul>
      <div className={`${styles['lnb-tab-content']} overflow-y`}>
        <MySideBar menuList={menu ? bookmarkList : menuList} />
      </div>
    </div>
  );
};
