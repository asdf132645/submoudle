import {
  LowerMenuProps,
  MenuListProps,
  MiddleMenuProps,
  SubMenuProps,
  UpperMenuProps,
} from '@/types/menu';

// 상단 메뉴
export const upperMenuList: UpperMenuProps[] = [
  {
    idx: 1,
    name: '대시보드',
    urlLink: '/dashboard',
    style: 'btn-lnb-normal',
    subMenu: [],
  },
  {
    idx: 2,
    name: '통계관리',
    urlLink: '',
    style: 'btn-lnb-toggle',
    subMenu: [],
  },
  {
    idx: 3,
    name: '설정관리',
    urlLink: '',
    style: 'btn-lnb-toggle',
    subMenu: [],
  },
  {
    idx: 4,
    name: '공지사항',
    urlLink: '',
    style: 'btn-lnb-toggle',
    subMenu: [],
  },
];

//sale 상세 메뉴 number, 이름, path
const revenueSubMenuList: { name: string; idx: number; urlLink: string }[] = [
  { idx: 12, name: '매출종합현황', urlLink: '/hospital/revenue' },
  { idx: 13, name: '손익계산서관리', urlLink: '/hospital/revenue/income' },
  {
    idx: 14,
    name: '요양급여매출관리',
    urlLink: '/hospital/revenue/care',
  },
  {
    idx: 15,
    name: '자동차보험매출관리',
    urlLink: '/hospital/revenue/auto-insurance',
  },
  {
    idx: 16,
    name: '예방접종매출관리',
    urlLink: '/hospital/revenue/vaccination',
  },
  { idx: 17, name: '건강검진매출관리', urlLink: '/hospital/revenue/exam' },
  { idx: 18, name: '고용산재매출관리', urlLink: '/hospital/revenue/iai' },
  { idx: 19, name: '병원자료차트관리', urlLink: '/hospital/revenue/sales' },
  {
    idx: 20,
    name: '신용카드매출관리',
    urlLink: '/hospital/revenue/credit-card',
  },
  { idx: 21, name: '현금영수증매출관리', urlLink: '/hospital/revenue/cash' },
  {
    idx: 22,
    name: '전자계산서매출관리',
    urlLink: '/hospital/revenue/tax-invoice',
  },
  {
    idx: 23,
    name: '수기세금계산서관리',
    urlLink: '/hospital/revenue/tax-invoice/manual',
  },
];

const expenseSubMenuList: SubMenuProps[] = [
  { idx: 24, name: '매입종합현황', urlLink: '/hospital/expense' },
  {
    idx: 25,
    name: '신용카드매입관리',
    urlLink: '/hospital/expense/credit-card',
  },
  {
    idx: 26,
    name: '현금영수증매입관리',
    urlLink: '/hospital/expense/cash',
  },
  {
    idx: 27,
    name: '전자세금계산서매입관리',
    urlLink: '/hospital/expense/tax-invoice',
  },
  {
    idx: 28,
    name: '전자계산서매입관리',
    urlLink: '/hospital/expense/invoice',
  },
  {
    idx: 29,
    name: '통장매입관리',
    urlLink: '/hospital/expense/bank-account',
  },
];

const middleMenuList: MiddleMenuProps[] = [
  { idx: 5, name: '알림', urlLink: '', subMenu: [] },
];

//하단 메뉴
const lowerMenuList: LowerMenuProps[] = [
  { idx: 5, name: '알림', urlLink: '', subMenu: [] },
  {
    idx: 6,
    name: '병원현황',
    urlLink: '',
    subMenu: [],
  },
  {
    idx: 7,
    name: '매출관리',
    urlLink: '/hospital/revenue',
    subMenu: revenueSubMenuList,
  },
  {
    idx: 8,
    name: '매입관리',
    urlLink: '/hospital/expense',
    subMenu: expenseSubMenuList,
  },
  { idx: 9, name: '결산관리', urlLink: '', subMenu: [] },
  { idx: 10, name: '소명관리', urlLink: '', subMenu: [] },
  { idx: 11, name: '1:1 상담관리', urlLink: '/consulting', subMenu: [] },
];

export const menuList: MenuListProps = {
  upperMenuList,
  middleMenuList,
  lowerMenuList,
  defaultMenuList: [],
};
