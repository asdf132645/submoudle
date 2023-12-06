import { useRef, useState } from 'react';
import { Button } from '@/index';
import { DateBox, DateBoxProps } from '@/dateBox/DateBox';
import { getDay } from '@/dateBox';
import { useDate } from '@/hooks/useDate';

interface DateBoxPageProps extends DateBoxProps {
  isBtn?: boolean;
  isHandler?: boolean;
}

export const DateBoxPage = ({
  types,
  width,
  isTerm,
  isBtn,
  isHandler = true,
}: DateBoxPageProps) => {
  const [date, setDate] = useDate({
    isTerm,
    input: '',
    // input: '2022-03-02-2022-04-23',
  });
  const [, setTerm] = useState(1);
  const dateRef = useRef<HTMLFormElement>(null);

  const selectTerm = (value: number) => {
    const today = getDay();
    const previous = getDay(
      new Date().setMonth(value === 2 ? -12 : value === 1 ? -6 : -1)
    )
      .trim()
      .replace('.', '-');
    isTerm ? setDate(`${previous}-${today}`) : setDate(previous);
    setTerm(value);
  };
  const onClick = () => {
    const form = new FormData(dateRef?.current || undefined);
    const dateform = isTerm ? form.getAll('date-form') : form.get('date-form');
    if (dateform) {
      console.log(dateform);
    }
  };

  return (
    <div
      className='test'
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <form ref={dateRef}>
        {isHandler ? (
          <DateBox
            types={types}
            width={width}
            isTerm={isTerm}
            date={date}
            setDate={setDate}
            name='date-form'
          />
        ) : (
          <DateBox
            types={types}
            width={width}
            isTerm={isTerm}
            name='date-form'
          />
        )}
        {isBtn && types == 'day' ? (
          <>
            <Button label='1달' onClick={() => selectTerm(0)} />
            <Button label='6개월' onClick={() => selectTerm(1)} />
            <Button label='1년' onClick={() => selectTerm(2)} />
          </>
        ) : null}
      </form>
      <input
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <Button style='pri' size='sm' label='getREF' onClick={onClick} />
    </div>
  );
};
