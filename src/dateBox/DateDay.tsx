import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getDay } from './getday';
import { useCalendar } from './useCalendar';
import styles from './dateday.module.css';
import { DynamicSelectDayBox } from '../selectbox/daySelectBox';

interface DateDayProps {
  isTerm?: boolean;
  date?: string;
  dateSetter: Dispatch<SetStateAction<string>>;
  /**
   * 달력 적용 버튼 클릭시 trigger 되는 메소드
   */
  onClick?: () => void;
}

/** 날짜/ 기간 선택 달력 컴포넌트 */
export const DateDay = ({
  isTerm = false,
  date,
  dateSetter,
  onClick,
}: DateDayProps) => {
  const [sdate, setSdate] = useState(
    date ? (isTerm ? date.split('-').slice(0, 3).join('-') : date) : getDay()
  );
  const [edate, setEdate] = useState(
    date && isTerm ? date.split('-').slice(3).join('-') : ''
  );

  const [previousDate, setPreviousDate] = useState<any>('');

  // console.log(date);
  const {
    calendar,
    deferredYear: currYear,
    deferredMonth: currMonth,
    monthChange,
    yearChange,
  } = useCalendar();
  const [oddEven, setOddEven] = useState(true);

  const [monthOption, setMonthOption] = useState<any>([]);

  useEffect(() => {
    console.log(currYear);
    const newMonthOption = Array.from({ length: 12 }, (_, idx) => {
      const tempYear = currYear;
      const tempMonth = idx + 1; // 1-based index
      const tempMonthStr = tempMonth < 10 ? `${tempMonth}` : `${tempMonth}`;
      const temp = `${tempYear}.${tempMonthStr}`;

      // Determine if this month should be selected
      const isSelected =
        Number(tempYear) === Number(currYear) &&
        tempMonth === Number(currMonth);

      return { value: temp, name: temp, select: isSelected };
    });

    setMonthOption(newMonthOption);
  }, [currYear, currMonth]);

  const [defDtae, setDefDtae] = useState<string>('');
  //
  useEffect(() => {
    // 디폴트 값으로 넣어줘야 셀렉트 박스에 값이 매칭되어서 들어감
    if (date && date !== '') {
      const dateArray: any = date?.match(/\d+/g);
      const year = dateArray[0];
      const month = dateArray[1];
      setDefDtae(`${year}.${month}`);
    }
  }, []);

  /**
   * isTerm에 따라 다르게 작동하는 함수,
   * if true, 홀수 클릭이 시작일sDate, 짝수 클릭이 종료일 eDate
   * else if, 무조건 시작일만 변경
   */
  const onDayClick = (day: number) => {
    const tMonth =
      Number(currMonth) < 10 ? `0${currMonth.trim()}` : currMonth.trim();
    const tDay = day < 10 ? `0${day}` : String(day);
    if (isTerm) {
      if (oddEven) {
        setSdate(`${currYear}-${tMonth}-${tDay}`);
      } else {
        setEdate(`${currYear}-${tMonth}-${tDay}`);
      }
      dateSetter((prev) => {
        const temp = prev.split('-');
        return oddEven
          ? `${currYear}-${tMonth}-${tDay}-${temp.slice(3).join('-')}`
          : `${temp.slice(0, 3).join('-')}-${currYear}-${tMonth}-${tDay}`;
      });
    } else {
      setSdate(`${currYear}-${tMonth}-${tDay}`);
      dateSetter(`${currYear}-${tMonth}-${tDay}`);
    }
    setOddEven((prev) => !prev);
  };
  /** 날짜 선택인 경우 sdate만, 기간 선택인 경우 sdate, edate 변경 */
  useEffect(() => {
    if (isTerm) {
      const temp = date?.split('-');
      if (temp && temp?.length > 5) {
        setSdate(temp.slice(0, 3).join('-'));
        setEdate(temp.slice(3).join('-'));
      }
    } else {
      setSdate(date || '');
    }
  }, [date]);

  const changeMonthGoPrev = () => {
    const prevMonth = String(Number(currMonth) - 1);
    if (prevMonth === '0') {
      yearChange(String(Number(currYear) - 1));
      monthChange('12', 'PATCH');
    } else {
      monthChange(prevMonth, 'PATCH');
    }
  };

  const changeMonthGoNext = () => {
    const nextMonth = String(Number(currMonth) + 1);
    const nextYear = currYear;
    if (nextMonth === '13') {
      yearChange(String(Number(nextYear) + 1));
      monthChange('1', 'PATCH');
    } else {
      monthChange(nextMonth, 'PATCH');
    }
  };

  return (
    <div
      className={[styles['modal-datepicker'], 'modal-datepickerBottom'].join(
        ' '
      )}
    >
      <div className={styles['header']}>
        <button
          type='button'
          className={styles['btn-date-left']}
          title='이전 달'
          onClick={() => changeMonthGoPrev()}
        ></button>
        <div className={styles['month']}>
          <DynamicSelectDayBox
            option={monthOption}
            border='none'
            defaultPOS={monthOption.findIndex((option: any) => option.select)}
            onChange={(input) => {
              if (typeof input === 'string') {
                const [selectedYear, selectedMonth] = input.split('.');
                monthChange(selectedMonth, 'PATCH');
                yearChange(selectedYear);
              }
            }}
            defailtDate={defDtae}
          />
        </div>
        <button
          type='button'
          className={styles['btn-date-right']}
          title='다음 달'
          onClick={() => changeMonthGoNext()}
        ></button>
      </div>
      <div className={styles['body']}>
        <table>
          <thead>
            <tr>
              <th className={styles['red']}>S</th>
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>T</th>
              <th>F</th>
              <th>S</th>
            </tr>
          </thead>
          <tbody>
            {calendar &&
              calendar
                .filter(({ month }) => month === Number(currMonth))
                .reduce(
                  (rows: any, { date, day, month }) => {
                    if (day === 0) {
                      rows.push([]);
                    }

                    const isRed = day % 7 === 0;
                    const isDisabled = month !== Number(currMonth);
                    const dayNumber = Number(date);

                    const isInTerm =
                      isTerm &&
                      month === Number(currMonth) &&
                      dayNumber >= Number(sdate.split('-')[2]) &&
                      dayNumber <= Number(edate.split('-')[2]);

                    const isActive =
                      month === Number(currMonth) &&
                      (dayNumber === Number(sdate.split('-')[2]) ||
                        dayNumber === Number(edate.split('-')[2]));

                    const cellClasses = [
                      isRed ? 'red' : '',
                      isDisabled ? 'disabled' : '',
                      isInTerm ? 'bg' : '',
                      isActive ? 'bg-active' : '',
                    ]
                      .filter((cls) => cls !== '')
                      .join(' ');

                    rows[rows.length - 1].push(
                      <td
                        key={`${month}-${date}-${day}`}
                        className={styles[cellClasses]}
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            onDayClick(dayNumber);
                          }}
                        >
                          {date}
                        </button>
                      </td>
                    );

                    return rows;
                  },
                  [[]]
                ) // Initialize rows with an empty array
                .map((row: any, index: any) => <tr key={index}>{row}</tr>)}
          </tbody>
        </table>
      </div>
      <div className={styles['footer']}>
        <input
          className={styles['frm-input noline datetime']}
          placeholder='날짜를 선택해주세요.'
          value={isTerm ? (oddEven ? edate : sdate) : sdate}
          readOnly={true}
        />
        <button
          type='button'
          className={`${styles['btn-date-apply']} ${styles['bg-active']}`}
          title='적용'
          disabled={(isTerm ? (oddEven ? edate : sdate) : sdate) === ''}
          onClick={() => onClick && onClick()}
        >
          적용
        </button>
      </div>
    </div>
  );
};
