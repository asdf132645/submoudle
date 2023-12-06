import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDate } from '../hooks';
import { DateDay } from './DateDay';
import { DateMonth } from './DateMonth';
import { DatePicker } from './DatePicker';
import styles from './datepicker.module.css';

export interface DateBoxProps {
  /**
   * 일/ 월 선택
   */
  types: 'day' | 'month';
  /**
   * 날짜 선택인지 기간 선택인지 결정하는 타입
   */
  isTerm?: boolean;
  /**
   * 날짜 박스의 가로 길이. 단위: px
   */
  width?: number;
  /**
   * 외부에서 주입하는 date
   */
  date?: string;
  /**
   * 날짜 변경 dispatcher
   */
  setDate?: (value: string) => void;
  /**
   * name: formData로 전송시 사용할 key 값
   */
  name?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Calendar UI component
 */
export const DateBox = ({
  types = 'day',
  isTerm = false,
  width,
  name,
  date,
  setDate,
  onClick,
}: DateBoxProps) => {
  /** 내부 date state */
  const [pickerDate, setPickerDate] = useDate({ input: '' });
  const dateBoxRef = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(false);

  /** dom에 그릴 시작/종료 년월(일) */
  const [sYMD, eYMD] = useMemo(() => {
    const dateArr = pickerDate.split('-');
    return types === 'day'
      ? isTerm
        ? [dateArr.slice(0, 3).join('-'), dateArr.slice(3).join('-')]
        : [dateArr.slice(0, 3).join('-'), '']
      : isTerm
      ? [dateArr.slice(0, 2).join('-'), dateArr.slice(2).join('-')]
      : [dateArr.slice(0, 2).join('-'), ''];
  }, [pickerDate]);

  /** datePicker 너비 */
  const pickerWidth = width ?? isTerm ? (types === 'day' ? 20 : 16) : 12;

  const onToggle = () => setHidden((prev) => !prev);
  const onChange = useCallback((e?: ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    setPickerDate(e?.target.value || '');
  }, []);

  /** 적용버튼 클릭시 동작할 메서드 */
  const onApply = () => {
    onClick && onClick();
    onToggle();
  };

  useEffect(() => {
    setDate && setDate(pickerDate);
  }, [pickerDate]);

  useEffect(() => {
    date && setPickerDate(date);
  }, [date]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateBoxRef.current &&
        !dateBoxRef.current.contains(event.target as Node)
      ) {
        setHidden(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dateBoxRef]);

  return (
    <div ref={dateBoxRef} className={styles['dateinputWrap']}>
      <i></i>
      <DatePicker
        date={pickerDate}
        onChange={onChange}
        onClick={onToggle}
        types={types}
        isTerm={isTerm}
      />
      {hidden ? (
        types === 'day' ? (
          <DateDay
            isTerm={isTerm}
            date={pickerDate}
            dateSetter={setPickerDate}
            onClick={onApply}
          />
        ) : (
          <DateMonth
            isTerm={isTerm}
            date={pickerDate}
            dateSetter={setPickerDate}
            onClick={onApply}
          />
        )
      ) : null}
      <div style={{ display: 'none' }}>
        <input value={sYMD} name={name} readOnly />
        <input value={eYMD} name={name} readOnly />
      </div>
    </div>
  );
};
