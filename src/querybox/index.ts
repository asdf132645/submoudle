import { QueryBox } from './QueryBox';
import { getDay } from '../dateBox';
import {
  ITypeOption,
  SelectOptionType,
  SelectStateType,
} from '../types/option';
import { getYearMonth } from '../dateBox/getday';

export interface QueryBoxProps {
  /** 필터 선택 옵션 배열 */
  option?: ITypeOption[];
  /** 필터 선택 옵션 배열 */
  selectOptions?: SelectOptionType;
  /** 검색 버튼 클릭시 동작할 메서드 */
  onClick?: () => void;
  /** 초기화 버튼 클릭시 동작할 메서드 */
  onReset?: () => void;
  defaultYear?: string;
}

export type QueryStateType = {
  /** 현재 필터의 키값 */
  currentKey: string;
  /** 기본, 날짜 선택, 글자 입력 여부 */
  selectState: SelectStateType;
  /** 필터 toggle state */
  toggle: boolean;
  /** 날짜 관련 문자열 state */
  date: string;
  /** 날짜 관련 문자열 state */
  query: string[][];
};

/** 옵션 미등록시 보여줄 기본 카테고리 */
export const defaultOptions: ITypeOption[] = [
  { value: 'total', name: '전체', type: 'input' },
  { value: 'inputAny', name: '입력' },
  { value: 'dateSelect', name: '일 선택', type: 'date' },
  { value: 'dateTermSelect', name: '일 기간 선택', type: 'dateTerm' },
  { value: 'monthSelect', name: '월 선택', type: 'month' },
  { value: 'monthTermSelect', name: '월 기간 선택', type: 'monthTerm' },
  { value: 'term', name: '진료과목', type: 'select' },
];

/** 일자 선택시 dropdown에 표시할 내용 */
export const dateDefOptions: ITypeOption[] = [
  { value: 'today', name: '오늘' },
  { value: 'week', name: '7일' },
  { value: 'month', name: '한달' },
  { value: 'select', name: '기간선택' },
];

/** 월 선택시 dropdown에 표시할 내용 */
export const monthDefOptions: ITypeOption[] = [
  { value: 'today', name: '이번 달' },
  { value: 'oneago', name: '한달 전' },
  { value: 'sixago', name: '6달 전' },
  { value: 'select', name: '기간선택' },
];

/** 옵션 미등록시 보여줄 선택시 dropdown으로 보여주는 기본 내용*/
export const dentDefOptions: SelectOptionType = {
  term: [
    { value: '정형외과', name: '정형외과' },
    { value: '피부과', name: '피부과' },
    { value: '치과', name: '치과' },
  ],
};

/** 날짜 종류와 dropdown 선택 값에 따라 데이터 출력 */
export const dateInfer = (input: string, dateType: SelectStateType) => {
  const now = new Date();
  const sDate = (() => {
    switch (input) {
      case 'week':
        return new Date(now.setDate(now.getDate() - 7));
      case 'month':
        return new Date(now.setMonth(now.getMonth() - 1));
      default:
        return now;
    }
  })();
  switch (dateType) {
    case 'date':
      return getDay(sDate);
    case 'dateTerm':
      return `${getDay(sDate)}-${getDay()}`;
    case 'month':
      return getYearMonth(sDate);
    case 'monthTerm':
      return `${getYearMonth(sDate)}-${getYearMonth()}`;
    default:
      throw new Error('날짜 타입이 지정되지 않았습니다');
  }
};

/** reducer 액션 타입 */
export type QueryActionType =
  | { type: 'KEY'; payload: string }
  | { type: 'SELECT_STATE'; payload?: SelectStateType }
  | { type: 'TOGGLE'; payload?: boolean }
  | { type: 'DATE'; payload?: string }
  | { type: 'QUERY_ADD'; payload: [string, string] }
  | { type: 'QUERY_REMOVE'; payload: string }
  | { type: 'RESET'; payload?: undefined };

/** reducer 초기 상태 */
export const initState: QueryStateType = {
  currentKey: '',
  selectState: 'default',
  toggle: false,
  date: '',
  query: [],
};

/** 필터 변화 상태를 관리하는 reducer */
export const queryReducer = (
  state: QueryStateType,
  { type, payload }: QueryActionType
) => {
  switch (type) {
    case 'KEY':
      return { ...state, currentKey: payload };
    case 'SELECT_STATE':
      return { ...state, selectState: payload ?? 'default' };
    case 'TOGGLE':
      return { ...state, toggle: payload ?? !state.toggle };
    case 'DATE':
      return { ...state, date: payload ?? '' };
    case 'QUERY_ADD':
      return {
        ...initState,
        query: [
          ...state.query.filter(([qkey]) => qkey !== payload[0]),
          [payload[0], payload[1]],
        ],
      };
    case 'QUERY_REMOVE':
      return {
        ...state,
        query: state.query.filter(([qkey]) => qkey !== payload),
      };
    case 'RESET':
      return initState;
    default:
      throw new Error('unsupported action type: ', type);
  }
};

export { QueryBox };
