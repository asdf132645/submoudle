import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { InputBox } from '../index';
import { SelectBox } from '../selectbox';
import { getDay } from './getday';
import styles from './dateday.module.css';

const MONTH_LIST = Array.from({ length: 12 }, (_, idx) => idx + 1);

type MonthReducerState = {
  /** 시작 년월 */
  sYearMonth: string;
  /** 종료 년월 */
  eYearMonth: string;
};
type MonthReducerType = {
  type: 'START' | 'END';
  payload: string;
};
const initState: MonthReducerState = {
  sYearMonth: '',
  eYearMonth: '',
};
const reducer = (
  state: MonthReducerState,
  { type, payload }: MonthReducerType
) => {
  switch (type) {
    case 'START':
      return { ...state, sYearMonth: payload };
    case 'END':
      return { ...state, eYearMonth: payload };
    default:
      throw new Error('unsupported action type: ', type);
  }
};

interface DateMonthProps {
  /** 기간 월 선택 여부 */
  isTerm?: boolean;
  date?: string;
  dateSetter: Dispatch<SetStateAction<string>>;
  /**
   * 달력 적용 버튼 클릭시 trigger 되는 메소드
   */
  onClick?: () => void;
}

/** 월 선택 달력 컴포넌트 */
export const DateMonth = ({
  isTerm,
  date,
  dateSetter,
  onClick,
}: DateMonthProps) => {
  const [currYear, setYear] = useState(date ? date.split('-')[0] : '');
  const [oddEven, setOddEven] = useState(false);
  const [{ sYearMonth, eYearMonth }, dispatch] = useReducer(reducer, initState);
  const inputValue = isTerm
    ? sYearMonth === '' && eYearMonth === ''
      ? ''
      : sYearMonth < eYearMonth || eYearMonth === ''
      ? `${sYearMonth}-${eYearMonth || ''}`
      : `${eYearMonth}-${sYearMonth || ''}`
    : sYearMonth;
  const yearOption = useMemo(
    () =>
      Array.from({ length: 3 }, (_, idx) => {
        const temp = String(
          Number(currYear || getDay().split('-')[0]) + idx - 1
        );
        return { value: temp, name: temp };
      }),
    [currYear]
  );

  const yearCtl = (input: string) => setYear(input);

  const monthCtl = (input: string) => {
    const payload = `${currYear}-${input}`;
    const type = isTerm && oddEven ? 'END' : 'START';
    dispatch({ type, payload });
    isTerm && setOddEven((prev) => !prev);
  };

  useEffect(() => {
    if (date) {
      const [tSYear, tSMonth, tEYear, tEMonth] = date.split('-');
      dispatch({ type: 'START', payload: `${tSYear}-${tSMonth}` });
      isTerm &&
        dispatch({
          type: 'END',
          payload: tEYear && tEMonth ? `${tEYear}-${tEMonth}` : '',
        });
    }
  }, [date]);
  useEffect(() => dateSetter(inputValue), [sYearMonth, eYearMonth]);

  return (
    <div className={styles['modal-datepicker']}>
      <div className={[styles.header, styles.year].join(' ')}>
        <p>년도와 월을 선택하세요.</p>
        <div className={styles.month}>
          <SelectBox
            option={yearOption}
            defaultPOS={1}
            onChange={(input) => yearCtl(input)}
          />
        </div>
      </div>
      <div className={[styles.body, styles.month].join(' ')}>
        <ul>
          {MONTH_LIST.map((val) => (
            <li key={val}>
              <button
                type='button'
                className={(() => {
                  const CalYM = `${currYear}-${
                    val < 10 ? `0${val}` : String(val)
                  }`;
                  return CalYM === sYearMonth || CalYM === eYearMonth
                    ? styles.active
                    : '';
                })()}
                onClick={() => monthCtl(val < 10 ? `0${val}` : String(val))}
                value={val}
              >
                {val}월
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.footer}>
        <InputBox
          isLine={false}
          placeholder='날짜를 선택해주세요.'
          value={inputValue}
          readOnly={true}
        />
        <button
          type='button'
          className={[
            styles['btn-date-apply'],
            inputValue === '' ? '' : styles.active,
          ].join(' ')}
          title='적용'
          disabled={inputValue === ''}
          onClick={() => onClick && onClick()}
        >
          적용
        </button>
      </div>
    </div>
  );
};
