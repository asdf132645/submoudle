import { ChangeEvent, MouseEvent } from 'react';
import styles from './datepicker.module.css';

interface DatePickerProps {
  date: string;
  isTerm?: boolean;
  /**
   * 일/ 월 선택
   */
  types: 'day' | 'month';
  /**
   * name: formData로 전송시 사용할 key 값
   */
  name?: string;
  required?: boolean;
  onClick: (e: MouseEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean; // Corrected property name
}

export const DatePicker = ({
  date,
  onChange,
  onClick,
  types = 'day',
  name,
  required,
  isTerm = false,
  isDisabled,
}: DatePickerProps) =>{





  return (
    <input
      required={required}
      type='text'
      name={name}
      value={date}
      className={styles.datepicker}
      onChange={onChange}
      onClick={onClick}
      disabled={isDisabled}
      placeholder={(() => {
        if (types === 'day') {
          return isTerm ? '0000-00-00-0000-00-00' : '0000-00-00';
        } else {
          return isTerm ? '0000-00-0000-00' : '0000-00';
        }
      })()}
    />
  );
};
