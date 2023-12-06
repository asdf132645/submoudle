export interface SidebarProps {
  toggle: boolean;
  SideBarContents?: JSX.Element;
  btnRoutes: string[];
  alarmCheck?: boolean;
  alarmNoti?: () => void;
}
