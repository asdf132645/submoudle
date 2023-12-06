import { ChangeEvent, InputHTMLAttributes, useId } from 'react';
import styles from '../component.module.css';

interface CheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'crossOrigin'> {
  /**
   * Checkbox type
   */
  type?: 'CHECK' | 'RADIO' | 'GRAY';
  /**
   * Checkbox label
   */
  label?: string;
  /**
   * radiobox를 그룹핑할 이름
   */
  name?: string;
  /**
   * Optional click handler
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * CheckBox UI Component
 */
export const CheckBox = ({
  type = 'CHECK',
  label,
  name,
  onChange,
  ...props
}: CheckBoxProps) => {
  const chkKey = useId();
  return (
    <div className={styles[`${type === 'RADIO' ? 'chk-radio' : 'chk'}`]}>
      <input
        type={type === 'RADIO' ? 'radio' : 'checkbox'}
        id={`c${chkKey}`}
        name={name}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
        {...props}
      />
      <label htmlFor={`c${chkKey}`}>
        <span className={type === 'GRAY' ? styles['check-gray'] : ''}></span>
        {label ?? null}
      </label>
    </div>
  );
};
