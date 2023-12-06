import { MenuListProps } from './menu';

export interface LayoutProps {
  /** 헤더 부분 컨텐츠 */
  HeaderContents?: JSX.Element;
  /** 사이드바 컨텐츠(공통으로 이동하여 deprecated) */
  SideBarContents?: JSX.Element;
  /** 버튼 라우터 설정 데이터 */
  btnRoutes?: string[];
  /** 실행 중인 탭 리스트 관리 */
  menuList?: MenuListProps;
  bookmarkList?: MenuListProps;
  // isbookmark 즐겨찾기 페이지 여부
  isBookmark?: boolean;
  // bookmark 수정 삭제 메소드
  insertBookmark?: () => void;
  deleteBookMark?: () => void;
  /** excel 다운로드 버튼 표시 여부 */
  isExcelBtnVisible?: boolean;
  /** excel 버튼에 보낼 download method */
  excelDownload?: () => void;
  /** 입력할 본문 내용 */
  children?: React.ReactNode;
  alarmCheck?: boolean;
  alarmNoti?: () => void;
}
