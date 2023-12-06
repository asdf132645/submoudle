import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { getCalendar } from './getCalendar';

const [{ value: initYear }, , { value: initMonth }] =
  Intl.DateTimeFormat('ko-KR').formatToParts();

/**
 * month: 달 /
 * date: 일 /
 * day: 요일(일요일이 0, 토요일이 6)
 */
export interface ICalendar {
  month: number;
  date: number;
  day: number;
}

export const useCalendar = (year?: string, month?: string) => {
  const [curYear, setCurYear] = useState(year || initYear);
  const [curMonth, setCurMonth] = useState(month || initMonth);

  const deferredYear = curYear;
  const deferredMonth = curMonth;

  const yearChange = useCallback(
    (year: string, action?: 'PATCH') => setCurYear(year),
    []
  );

  const monthChange = useCallback(
    (month: string, action?: 'PATCH') => setCurMonth(month),
    []
  );

  const calendar: ICalendar[] = useMemo(
    () => getCalendar(deferredYear, deferredMonth),
    [deferredYear, deferredMonth]
  );
  return {
    calendar,
    deferredYear,
    deferredMonth,
    yearChange,
    monthChange,
  };
};
