export const getDay = (date?: Date | number) => {
  const [initYear, initM, initD] = new Intl.DateTimeFormat('ko-KR')
    .format(date)
    .split('.');
  const initMonth = Number(initM) < 10 ? `0${initM.trim()}` : initM.trim();
  const initDay = Number(initD) < 10 ? `0${initD.trim()}` : initD.trim();

  return `${initYear}-${initMonth}-${initDay}`;
};

export const getYearMonth = (date?: Date | number) => {
  const [initYear, initM] = new Intl.DateTimeFormat('ko-KR')
    .format(date)
    .split('.');
  const initMonth = Number(initM) < 10 ? `0${initM.trim()}` : initM.trim();

  return `${initYear}-${initMonth}`;
};
