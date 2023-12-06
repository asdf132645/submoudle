import { Dispatch, SetStateAction, useState } from 'react';
import styles from './searchwrap.module.css';
import { getDay } from '../dateBox/getday';
import { Button } from '../button/Button';
import { DateBox } from '../dateBox/DateBox';

const termArray: [number, string][] = [
  [0, '한달'],
  [1, '6개월'],
  [2, '1년'],
];

const ctlButtons: [number, string][] = [
  [0, '초기화'],
  [1, '검색'],
];
interface SearchWrapProps {
  date: string;
  dateSetter: Dispatch<SetStateAction<string>>;
}

export const SearchWrap = ({ date, dateSetter }: SearchWrapProps) => {
  const [term, setTerm] = useState(0);

  const selectTerm = (value: number) => {
    const today = getDay();
    const previous = getDay(
      new Date().setMonth(value === 2 ? -12 : value === 1 ? -6 : -1)
    )
      .trim()
      .replace('.', '-');
    dateSetter(`${previous}-${today}`);
    setTerm(value);
  };

  return (
    <div className={styles.searchWrap}>
      <form>
        <table className='tbl-list border-bottom-0'>
          <caption>테이블</caption>
          <colgroup>
            <col width='100' />
            <col width='' />
          </colgroup>
          <thead>
            <tr>
              <th>기간</th>
              <td>
                <div className='d-flex ml-1'>
                  {termArray.map(([key, value]) => (
                    <Button
                      key={key}
                      label={value}
                      types='outline'
                      style={term === key ? 'sep' : 'qua'}
                      size='lg'
                      margin='0 1rem 0 0'
                      onClick={() => selectTerm(key)}
                    />
                  ))}
                  <DateBox
                    types='day'
                    setDate={dateSetter}
                    isTerm={true}
                    width={19}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {ctlButtons.map(([key, value]) => (
                  <Button
                    key={key}
                    label={value}
                    types={key === 1 ? 'solid' : 'outline'}
                    style={key === 1 ? 'ter' : 'qua'}
                    size='lg'
                    margin='0 1rem 0 0'
                  />
                ))}
              </td>
            </tr>
          </thead>
        </table>
      </form>
    </div>
  );
};
