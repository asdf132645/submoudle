import { Dispatch, SetStateAction, useState } from 'react';
import { getDay } from '../dateBox/getday';

type useDateOption = {
  /**
   * datepicker 초기값. 미설정시 isTerm에 따라 기본값 지정
   */
  input?: string;
  /**
   * true일 경우 년-월-일-년-월-일, false인 경우 년-월-일
   */
  isTerm?: boolean;
};

/** 달력의 사용하는 초기값이 세팅된 useState  */
export const useDate = (
  option?: useDateOption
): [string, Dispatch<SetStateAction<string>>] => {
  const [date, setDate] = useState(
    typeof option?.input === 'string'
      ? option.input
      : option?.isTerm
      ? `${getDay()}-${getDay()}`
      : getDay()
  );

  return [date, setDate];
};
