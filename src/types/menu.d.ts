export interface MenuProps {
  idx: number;
  name: string;
  urlLink: string;
  isSearch?: boolean;
  bookmarkId?: number;
  /** 엑셀 다운로드 활성화여부 */
  isExcel?: boolean;
}

export interface UpperMenuProps extends MenuProps {
  style?: string;
  subMenu: any[];
}

export interface MiddleMenuProps extends MenuProps {
  subMenu: any[];
}

export interface LowerMenuProps extends MenuProps {
  subMenu: any[];
}

export interface DefaultMenuProps extends MenuProps {
  subMenu: any[];
}
export interface MenuListProps {
  upperMenuList: UpperMenuProps[];
  middleMenuList: MiddleMenuProps[];
  lowerMenuList: LowerMenuProps[];
  defaultMenuList: DefaultMenuProps[];
}

export interface BookmarkListProps {
  upperMenuList: UpperMenuProps[];
  lowerMenuList: LowerMenuProps[];
}

export type SubMenuProps = MenuProps;
