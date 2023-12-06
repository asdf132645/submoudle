import { useState } from 'react';
import { MenuListProps } from '../types/menu';
import { SideBarBtn } from './SidebarBtn';
import styles from './mysidebar.module.css';

interface MySidebarProps {
  menuList: MenuListProps;
}

export const MySideBar = ({
  menuList: { upperMenuList, middleMenuList, lowerMenuList },
}: MySidebarProps) => {
  const [isActive, setActive] = useState(-10);
  const onClick = (idx: number) =>
    setActive((prev) => (prev === idx ? -10 : idx));

  return (
    <>
      <ul className={styles['lnb-depth']}>
        {upperMenuList &&
          upperMenuList.map(({ idx, urlLink, style, name, subMenu }) => (
            <SideBarBtn
              key={idx}
              style={style ?? ''}
              label={name}
              linkUrl={urlLink}
              subMenuList={subMenu}
              isActive={isActive === idx}
              onClick={() => onClick(idx)}
            />
          ))}
      </ul>
      <ul className={`${styles['lnb-depth']} mt-1`}>
        {middleMenuList &&
          middleMenuList.map(({ idx, urlLink, name, subMenu }) => (
            <SideBarBtn
              key={idx}
              style={'btn-lnb-toggle'}
              label={name}
              linkUrl={urlLink}
              subMenuList={subMenu}
              isActive={isActive === idx}
              onClick={() => onClick(idx)}
            />
          ))}
      </ul>
      <ul className={`${styles['lnb-depth']} mt-1`}>
        {lowerMenuList &&
          lowerMenuList.map(({ idx, urlLink, name, subMenu }) => (
            <SideBarBtn
              key={idx}
              style={'btn-lnb-toggle'}
              label={name}
              linkUrl={urlLink}
              subMenuList={subMenu}
              isActive={isActive === idx}
              onClick={() => onClick(idx)}
            />
          ))}
      </ul>
    </>
  );
};
