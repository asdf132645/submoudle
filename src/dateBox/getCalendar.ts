const [{ value: initYear }, , { value: initMonth }] =
  Intl.DateTimeFormat('ko-KR').formatToParts();

export const getCalendar = (
  year: string = initYear,
  month: string = initMonth
) => {
  const prevLastdate = new Date(Number(year), Number(month) - 1, 0);
  const thisLastdate = new Date(Number(year), Number(month), 0);
  const pday = prevLastdate.getDay();
  const pdate = prevLastdate.getDate();
  const cday = thisLastdate.getDay();
  const cdate = thisLastdate.getDate();

  const lastMonth = Array.from({ length: (pday + 1) % 7 }, (_, idx) => ({
    month: Number(month) - 1,
    date: pdate - pday + idx,
    day: idx,
  }));
  const currMonth = Array.from({ length: cdate }, (_, idx) => ({
    month: Number(month),
    date: idx + 1,
    day: (pday + idx + 1) % 7,
  }));
  /**
   * 달력에 표시되는 이전 달 + 이번 달 일수
   */
  const prevDates = lastMonth.length + currMonth.length;

  const nextMonthLength =
    prevDates > 35 ? 6 - cday : prevDates === 28 ? 14 : 13 - cday;

  const nextMonth = Array.from({ length: nextMonthLength }, (_, idx) => ({
    month: Number(month) + 1,
    date: idx + 1,
    day: cday + idx + 1,
  }));

  return [...lastMonth, ...currMonth, ...nextMonth];
};
