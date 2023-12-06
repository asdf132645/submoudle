import { useEffect, useState } from 'react';
import { DynamicSelectProps } from '../types/select';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Label } from '../label/label';
import { SelectBox } from './dropdown';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './select.module.css';

export { SelectBox };

/**
 * css가 적용된 콤보박스
 */
export const DynamicSelectDayBox = ({
  label = '',
  isMultiple = false,
  isRadius = false,
  option = [],
  defaultPOS = 0,
  name,
  border,
  onChange,
  width = '10rem',
  size = 'medium',
  defailtDate,
  ...props
}: DynamicSelectProps) => {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [listYear, setListYear] = useState<any[]>([]);
  const [listMonth, setListMonth] = useState<any[]>([]);
  const [toggleYear, setToggleYear] = useState(false);
  const onToggleYear = () => setToggleYear((prev) => !prev);
  const [toggleMonth, setToggleMonth] = useState(false);
  const onToggleMonth = () => setToggleMonth((prev) => !prev);

  // 리스트안에 년도 클릭
  const listOnClickYear = (idx: number) => {
    setListYear((prevListYear) => {
      if (!isMultiple) {
        return prevListYear.map((item, index) => ({
          ...item,
          select: index === idx,
        }));
      }

      return prevListYear.map((prevItem, index) =>
        index === idx ? { ...prevItem, select: !prevItem.select } : prevItem
      );
    });
  };

  // 리스트 안에 달 선택
  const listOnClickMonth = (idx: number) => {
    setListMonth((prevListMonth) => {
      if (!isMultiple) {
        return prevListMonth.map((item, index) => ({
          ...item,
          select: index === idx,
        }));
      }

      return prevListMonth.map((prevItem, index) =>
        index === idx ? { ...prevItem, select: !prevItem.select } : prevItem
      );
    });
  };

  // option이 변경될 때 쓰는 상태감지
  useEffect(() => {
    const selectedOption = option.find((item: any) => item?.select === true);

    if (selectedOption) {
      const [year, month]: any = selectedOption.name.split('.') || [];
      const monthList: any = Array.from({ length: 12 }, (_, idx) => {
        const monthIdx = idx + 1;
        return {
          name: String(monthIdx),
          select: month === String(monthIdx),
          value: String(monthIdx),
        };
      });
      const currentYear = new Date().getFullYear();
      const startYear = 2000; // 시작 년도 설정
      const yearRange = Array.from(
        { length: currentYear - startYear + 1 },
        (_, idx) => {
          const yearValue = currentYear - idx;
          return {
            name: String(yearValue),
            select: year === String(yearValue),
            value: String(yearValue),
          };
        }
      );

      setSelectedYear(year);
      setSelectedMonth(month);
      setListYear(yearRange);
      setListMonth(monthList);
    }
  }, [option]);

  //  최초 년도 월 집어넣기
  useEffect(() => {
    if (defailtDate !== '' && defailtDate) {
      const [year, month]: any = defailtDate.split('.') || [];
      setSelectedYear(year);
      setSelectedMonth(month);
    }
  }, [defailtDate]);

  // 리스트 클릭 시
  const handleListChange = (
    list: boolean[],
    selectedValue: string,
    onChange: ((values: string | string[]) => void) | undefined,
    isMultiple: boolean,
    dateType: string
  ) => {
    const isSelected = list.some(function (item: any) {
      return item?.select === true;
    });
    if (isSelected) {
      if (onChange) {
        onChange(String(`${selectedYear}.${selectedMonth}`));
      }
    }
  };

  useEffect(() => {
    handleListChange(listYear, selectedYear, onChange, isMultiple, 'year');
  }, [selectedYear]);

  useEffect(() => {
    handleListChange(listMonth, selectedMonth, onChange, isMultiple, 'month');
  }, [selectedMonth]);

  return (
    <>
      {label.length > 0 ? <Label label={label} /> : null}
      <div
        className={['select-c', isRadius ? 'border-radius' : '', 'medium'].join(
          ' '
        )}
        style={{ width, border }}
      >
        <div className='select-styled' onClick={onToggleYear}>
          {selectedYear} 년
        </div>
        {listYear.length > 0 ? (
          <select
            multiple={isMultiple}
            className='select_style'
            value={
              isMultiple
                ? option.reduce(
                    (sum: string[], { value }, idx) =>
                      listYear[idx] ? [...sum, value] : sum,
                    []
                  )
                : listYear[listYear.findIndex((e) => e)].value
            }
            style={{ display: 'none' }}
            name={name}
            onChange={() => name}
          >
            {listYear.map(({ value, name }, idx) => (
              <option key={idx} value={name}>
                {value}
              </option>
            ))}
          </select>
        ) : null}
        <ul
          className={isMultiple ? styles['select-options2'] : 'select-options'}
          style={{ display: toggleYear ? 'block' : 'none' }}
        >
          {listYear.length > 0
            ? listYear.map(({ value, name }, idx) => (
                <li
                  key={value}
                  className={`${
                    listYear[idx]?.select ? styles.activeSelect : ''
                  }`}
                  onClick={() => {
                    listOnClickYear(idx);
                    setSelectedYear(name);
                    isMultiple ? idx : onToggleYear();
                  }}
                >
                  {name}
                </li>
              ))
            : null}
        </ul>
      </div>
      {/* 월 선택 */}
      <div
        className={['select-c', isRadius ? 'border-radius' : '', 'medium'].join(
          ' '
        )}
        style={{ width, border }}
      >
        <div className='select-styled' onClick={onToggleMonth}>
          {selectedMonth} 월
        </div>
        {listMonth.length > 0 ? (
          <select
            multiple={isMultiple}
            className='select_style'
            value={
              isMultiple
                ? listMonth.reduce(
                    (sum: string[], { value }, idx) =>
                      listMonth[idx] ? [...sum, value] : sum,
                    []
                  )
                : listMonth[listMonth.findIndex((e) => e)]?.value
            }
            style={{ display: 'none' }}
            name={name}
            onChange={() => name}
          >
            {listMonth.map(({ value, name }) => (
              <option key={name} value={value}>
                {name}
              </option>
            ))}
          </select>
        ) : null}
        <ul
          className={isMultiple ? styles['select-options2'] : 'select-options'}
          style={{ display: toggleMonth ? 'block' : 'none' }}
        >
          {listMonth.length > 0
            ? listMonth.map(({ value, name }, idx) => (
                <li
                  key={value}
                  className={listMonth[idx].select ? styles.activeSelect : ''}
                  onClick={() => {
                    listOnClickMonth(idx);
                    setSelectedMonth(name);
                    isMultiple ? idx : onToggleMonth();
                  }}
                >
                  {name}
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
};
